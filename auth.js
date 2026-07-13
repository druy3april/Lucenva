let currentUser = null;

// Kiểm tra token khi khởi chạy
window.addEventListener('load', () => {
  const token = localStorage.getItem('lucenva_token');
  const userStr = localStorage.getItem('lucenva_user');
  
  if (token && userStr) {
    try {
      currentUser = JSON.parse(userStr);
      updateAuthUI();
      fetchFavoritesFromBackend();
    } catch(e) {}
  }
});

function openAuthModal() {
  if (currentUser) {
    // Đã đăng nhập, show info
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('account-info').style.display = 'block';
    
    document.getElementById('acc-name-display').innerText = currentUser.fullName || 'Khách hàng';
    document.getElementById('acc-email-display').innerText = currentUser.email || '';
    document.getElementById('acc-phone-display').innerText = currentUser.phone || '';
    document.getElementById('auth-title').innerText = 'TÀI KHOẢN CỦA TÔI';
  } else {
    // Chưa đăng nhập, show login
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('account-info').style.display = 'none';
    document.getElementById('auth-title').innerText = 'ĐĂNG NHẬP';
  }
  
  document.getElementById('auth-overlay').style.display = 'block';
  document.getElementById('auth-modal').style.display = 'block';
  setTimeout(() => {
    document.getElementById('auth-modal').style.transform = 'translate(-50%, -50%) scale(1)';
    document.getElementById('auth-modal').style.opacity = '1';
  }, 10);
}

function closeAuthModal() {
  document.getElementById('auth-overlay').style.display = 'none';
  document.getElementById('auth-modal').style.transform = 'translate(-50%, -50%) scale(0.9)';
  document.getElementById('auth-modal').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('auth-modal').style.display = 'none';
  }, 300);
}

function switchAuthTab(tab) {
  if (tab === 'login') {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('auth-title').innerText = 'ĐĂNG NHẬP';
  } else {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('auth-title').innerText = 'ĐĂNG KÝ';
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Lỗi đăng nhập');
    
    saveUser(data);
    showToast('<i class="fas fa-check-circle" style="color:#4ade80"></i> Đăng nhập thành công!');
    closeAuthModal();
  } catch (err) {
    alert(err.message);
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const fullName = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;
  const password = document.getElementById('reg-password').value;
  
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, phone, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Lỗi đăng ký');
    
    saveUser(data);
    showToast('<i class="fas fa-check-circle" style="color:#4ade80"></i> Đăng ký thành công!');
    closeAuthModal();
  } catch (err) {
    alert(err.message);
  }
}

function saveUser(data) {
  localStorage.setItem('lucenva_token', data.token);
  localStorage.setItem('lucenva_user', JSON.stringify(data.customer));
  currentUser = data.customer;
  updateAuthUI();
  fetchFavoritesFromBackend();
}

function handleLogout() {
  localStorage.removeItem('lucenva_token');
  localStorage.removeItem('lucenva_user');
  currentUser = null;
  wishlist = []; // Xóa wishlist local hiện tại
  saveWishlistToStorage();
  updateWishlistBadge();
  updateHeartButtons();
  updateAuthUI();
  closeAuthModal();
  showToast('<i class="fas fa-sign-out-alt"></i> Đã đăng xuất');
}

function updateAuthUI() {
  // Điền thông tin vào form thanh toán nếu có
  if (currentUser) {
    const nameEl = document.getElementById('chk-name');
    const phoneEl = document.getElementById('chk-phone');
    const emailEl = document.getElementById('chk-email');
    if (nameEl && !nameEl.value) nameEl.value = currentUser.fullName || '';
    if (phoneEl && !phoneEl.value) phoneEl.value = currentUser.phone || '';
    if (emailEl && !emailEl.value) emailEl.value = currentUser.email || '';
  }
}

// === Đồng bộ Yêu thích với Backend ===
async function fetchFavoritesFromBackend() {
  if (!currentUser) return;
  try {
    const token = localStorage.getItem('lucenva_token');
    const res = await fetch(`${API_BASE_URL}/auth/favorites`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const favs = await res.json();
      wishlist = favs.map(f => {
        return {
          id: f.productId,
          name: f.Product ? f.Product.name : 'Unknown',
          price: f.Product ? f.Product.price : 0,
          imgSrc: f.Product ? f.Product.imgSrc : ''
        };
      });
      saveWishlistToStorage();
      updateWishlistBadge();
      updateHeartButtons();
    }
  } catch (err) {
    console.error('Lỗi lấy danh sách yêu thích', err);
  }
}

// Sửa lại hàm toggleWishlist hiện tại trong cart-wishlist.js nếu có thể
window.toggleWishlistApi = async function(productId, name, price, imgSrc) {
  if (!currentUser) {
    // Nếu chưa đăng nhập, dùng localStorage local logic
    return; // Fallback happens in the original function
  }
  try {
    const token = localStorage.getItem('lucenva_token');
    const res = await fetch(`${API_BASE_URL}/auth/favorites`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ productId })
    });
    if (res.ok) {
      fetchFavoritesFromBackend();
    }
  } catch (err) {
    console.error('Lỗi thay đổi yêu thích backend', err);
  }
}
