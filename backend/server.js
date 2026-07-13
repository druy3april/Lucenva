require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');
const { sequelize } = require('./models');
const logger = require('./utils/logger');
const { runBackup } = require('./utils/backup');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const { router: paymentRoutes } = require('./routes/payment');
const setupAdmin = require('./adminSetup');

const app = express();
const PORT = process.env.PORT || 3000;

// === CORS Whitelist (chỉ cho phép domain cụ thể) ===
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
  : ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === 'null' || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// === Rate Limit toàn cục ===
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 200, // Tối đa 200 request / 15 phút / IP
  message: { error: 'Quá nhiều yêu cầu, vui lòng thử lại sau.' },
  standardHeaders: true,
  legacyHeaders: false,
});

setupAdmin().then(({ adminJs, adminRouter }) => {
  // Middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));
  app.use(cors(corsOptions));
  app.use(globalLimiter);
  app.use(express.json({ limit: '1mb' })); // Giới hạn body size
  // Admin Panel
  app.use(adminJs.options.rootPath, adminRouter);

  // Routes
  app.use('/api', apiRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/payment', paymentRoutes);

  // Database Sync — KHÔNG dùng { alter: true } trên production
  const syncOptions = process.env.NODE_ENV === 'development' ? { alter: true } : {};
  sequelize.sync(syncOptions)
    .then(() => {
      logger.info(`[${process.env.NODE_ENV || 'development'}] Database synced successfully`);
      
      // Hẹn giờ chạy Backup DB mỗi ngày vào lúc 02:00 sáng
      cron.schedule('0 2 * * *', () => {
        runBackup();
      });

      app.listen(PORT, () => {
        logger.info(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch(err => {
      logger.error('Failed to sync database:', err);
    });
}).catch(err => {
  logger.error('Failed to setup AdminJS:', err);
});
