import React from 'react';

const FooterComponent: React.FC = () => {
  return (
    <footer className="mt-10 bg-purple-800 text-white pt-10 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Exclusive */}
        <div>
          <h3 className="font-bold text-lg mb-4">Exclusive</h3>
          <p className="mb-4">Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <div className="flex items-center border border-white rounded-md p-2">
            <input
              type="email"
              placeholder="Enter your email"
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

        {/* Support */}
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <p className="text-sm">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p className="text-sm mt-2">exclusive@gmail.com</p>
          <p className="text-sm mt-2">+88015-88888-9999</p>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-bold text-lg mb-4">Account</h3>
          <ul className="space-y-2 text-sm">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Link */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Link</h3>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="font-bold text-lg mb-4">Download App</h3>
          <p className="text-sm mb-4">Save $3 with App New User Only</p>
          <div className="flex space-x-4">
            <img
              src="https://via.placeholder.com/100x40?text=Google+Play"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://via.placeholder.com/100x40?text=App+Store"
              alt="App Store"
              className="h-10"
            />
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
      {/* Footer bottom */}
      <div className="border-t border-purple-700 mt-10 pt-4 text-center">
        <p className="text-sm text-purple-300">© 2024 Exclusive. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
