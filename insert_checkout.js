const fs = require("fs");
let html = fs.readFileSync("lucenva.html", "utf8");

if (!html.includes('id="page-checkout"')) {
    const checkoutHtml = `
  <!-- ================================================================
     PAGE: THANH TOÁN (CHECKOUT)
     ================================================================ -->
  <div class="page" id="page-checkout" style="display:none; padding: 40px 0; background-color: #f9f9f9; min-height: 80vh;">
    <div class="container checkout-container">
      <div class="checkout-row">
        <!-- C?t trái: Form thông tin -->
        <div class="checkout-col-left">
          <div class="checkout-section-title">
            <h3>Thông tin thanh toán</h3>
          </div>
          <form id="checkout-form" onsubmit="submitOrder(event)">
            <div class="chk-form-group">
              <label for="chk-name">H? và tên <span style="color:red">*</span></label>
              <input type="text" id="chk-name" required placeholder="Nh?p h? và tên ngý?i nh?n">
            </div>
            <div class="chk-form-group">
              <label for="chk-phone">S? ði?n tho?i <span style="color:red">*</span></label>
              <input type="tel" id="chk-phone" required placeholder="Nh?p s? ði?n tho?i" pattern="[0-9]{9,11}">
            </div>
            <div class="chk-form-group">
              <label for="chk-address">Ð?a ch? nh?n hàng <span style="color:red">*</span></label>
              <input type="text" id="chk-address" required placeholder="Ví d?: S? 20, ng? 90, Khu?t Duy Ti?n, Thanh Xuân, Hà N?i">
            </div>
            <div class="chk-form-group">
              <label for="chk-email">Ð?a ch? email (tùy ch?n)</label>
              <input type="email" id="chk-email" placeholder="Email ð? nh?n thông báo ðõn hàng">
            </div>
            <div class="chk-form-group">
              <label for="chk-note">Ghi chú ðõn hàng (tùy ch?n)</label>
              <textarea id="chk-note" rows="3" placeholder="Ghi chú v? giao hàng, ví d?: giao gi? hành chính..."></textarea>
            </div>
          </form>
        </div>

        <!-- C?t ph?i: Ðõn hàng c?a b?n -->
        <div class="checkout-col-right">
          <div class="checkout-order-summary">
            <h3 class="checkout-section-title">Ðõn hàng c?a b?n</h3>
            
            <table class="checkout-table">
              <thead>
                <tr>
                  <th class="product-name">S?n ph?m</th>
                  <th class="product-total">T?m tính</th>
                </tr>
              </thead>
              <tbody id="checkout-order-items">
                <!-- Javascript will inject items here -->
              </tbody>
              <tfoot>
                <tr class="cart-subtotal">
                  <th>T?m tính</th>
                  <td><span id="chk-summary-subtotal">0ð</span></td>
                </tr>
                <tr class="shipping">
                  <th>Giao hàng</th>
                  <td>Giao hàng t?n nõi</td>
                </tr>
                <tr class="order-total">
                  <th>T?ng thanh toán</th>
                  <td><strong id="chk-summary-total">0ð</strong></td>
                </tr>
              </tfoot>
            </table>

            <div class="checkout-payment-methods">
              <div class="payment-method">
                <input type="radio" id="payment-cod" name="payment_method" value="cod" checked onchange="togglePaymentInfo()">
                <label for="payment-cod">Tr? ti?n m?t khi nh?n hàng (COD)</label>
                <div class="payment-box" id="payment-box-cod">
                  Tr? ti?n m?t khi giao hàng.
                </div>
              </div>
              <div class="payment-method">
                <input type="radio" id="payment-bank" name="payment_method" value="bank" onchange="togglePaymentInfo()">
                <label for="payment-bank">Chuy?n kho?n ngân hàng</label>
                <div class="payment-box" id="payment-box-bank" style="display:none;">
                  Th?c hi?n thanh toán vào ngay tài kho?n ngân hàng c?a chúng tôi. Vui l?ng s? d?ng M? ðõn hàng c?a b?n trong ph?n N?i dung thanh toán. Ðõn hàng s? ðý?c giao sau khi ti?n ð? chuy?n.
                  <br><br>
                  <strong>Ngân hàng:</strong> Vietcombank<br>
                  <strong>S? tài kho?n:</strong> 1234567890<br>
                  <strong>Tên ch? TK:</strong> LUCENVA VIETNAM<br>
                </div>
              </div>
              <div class="payment-method">
                <input type="radio" id="payment-vnpay" name="payment_method" value="vnpay" onchange="togglePaymentInfo()">
                <label for="payment-vnpay">Thanh toán VNPay (Demo)</label>
                <div class="payment-box" id="payment-box-vnpay" style="display:none;">
                  Chuy?n hý?ng sang c?ng thanh toán VNPay ð? thanh toán b?ng th? ATM, Visa/MasterCard ho?c quét m? QR.
                </div>
              </div>
            </div>

            <button type="submit" form="checkout-form" class="checkout-place-order-btn" id="chk-submit-btn">
              <span class="chk-btn-text">Ð?T HÀNG</span>
              <i class="fas fa-spinner fa-spin chk-spinner" id="chk-spinner" style="display: none;"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
    html = html.replace('</body>', checkoutHtml + '\n</body>');
    fs.writeFileSync("lucenva.html", html);
    console.log("Checkout page added successfully.");
} else {
    console.log("Checkout page already exists.");
}
