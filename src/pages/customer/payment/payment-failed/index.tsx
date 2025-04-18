import React from 'react';
import { useNavigate } from 'react-router-dom';


const PaymentFail: React.FC = () => {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/'); // Điều hướng về trang chính
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100">
            <h1 className="text-3xl font-bold text-red-600">Thanh toán không thành công!</h1>
            <p className="mt-4 text-lg text-gray-700">
            Vui lòng thử lại!
            </p>
            <button
                onClick={handleGoHome}
                className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
            >
                Đi đến trang chủ
            </button>
        </div>
    );
};

export default PaymentFail;