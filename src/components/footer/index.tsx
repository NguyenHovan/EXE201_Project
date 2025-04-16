import React from 'react';

const FooterComponent: React.FC = () => {
  return (
    <footer className="bg-purple-800 text-white pt-10 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Đặc biệt */}
        <div>
          <h3 className="font-bold text-lg mb-4">Đặc biệt</h3>
          <p className="mb-4">Đăng ký</p>
          <p className="text-sm mb-4">Nhận 10% giảm giá cho đơn hàng đầu tiên của bạn</p>
          <div className="flex items-center border border-white rounded-md p-2">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="bg-transparent flex-grow text-sm px-2 outline-none"
            />
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6">
            <div className="w-8 h-8 bg-white text-purple-800 rounded-full flex items-center justify-center font-bold text-lg">
              S
            </div>
          </div>
        </div>

        {/* Hỗ trợ */}
        <div>
          <h3 className="font-bold text-lg mb-4">Hỗ trợ</h3>
          <p className="text-sm">Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh</p>
          <p className="text-sm mt-2">shoca@gmail.com</p>
          <p className="text-sm mt-2">+88015-88888-9999</p>
        </div>

        {/* Tài khoản */}
        <div>
          <h3 className="font-bold text-lg mb-4">Tài khoản</h3>
          <ul className="space-y-2 text-sm">
            <li>Tài khoản của tôi</li>
            <li>Đăng nhập / Đăng ký</li>
            <li>Giỏ hàng</li>
            <li>Danh sách yêu thích</li>
            <li>Mua sắm</li>
          </ul>
        </div>

        {/* Liên kết nhanh */}
        <div>
          <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2 text-sm">
            <li>Chính sách bảo mật</li>
            <li>Điều khoản sử dụng</li>
            <li>Câu hỏi thường gặp</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* Tải ứng dụng */}
        <div>
          <h3 className="font-bold text-lg mb-4">Tải ứng dụng</h3>
          <p className="text-sm mb-4">Tiết kiệm $3 cho người dùng mới trên ứng dụng</p>
          <div className="flex space-x-4">

          </div>
          <div className="flex space-x-4 mt-4 text-white">
            <a href="#" className="text-xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-xl">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Chân trang */}
      <div className="border-t border-purple-700 mt-10 pt-4 text-center">
        <p className="text-sm text-purple-300">© 2024 Exclusive. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
