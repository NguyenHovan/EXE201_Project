import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentReturn } from '../../../../services/payment.services';


const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(window.location.search);

  const code = queryParams.get("code");
  const id = queryParams.get("id");
  const status = queryParams.get("status");
  const orderCode = queryParams.get("orderCode");

  useEffect(() => {
    returnPayment()
  }, [code, id, status, orderCode])

  const returnPayment = async () => {
    if (orderCode && id && status && code) {
      await PaymentReturn(orderCode, status, id, code)
    }
  }

  const handleGoHome = () => {
    navigate('/'); // Điều hướng về trang chính
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg text-gray-700">
        Thank you for your payment. Your transaction has been completed successfully.
      </p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;