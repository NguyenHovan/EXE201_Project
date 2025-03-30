import { useEffect } from 'react';
import { getUserDataFromLocalStorage } from '../../consts/variable';
import { createPaymentService } from '../../services/payment.services';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATH } from '../../consts';

interface iPremiumButton {
    text: string;
}

const PremiumButton = ({ text }: iPremiumButton) => {
    const user = getUserDataFromLocalStorage();
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
    const [searchParams] = useSearchParams();
    // Kiểm tra tham số URL khi component được render
    useEffect(() => {
		const code = searchParams.get('code');



		// Set a 3-second delay before processing the redirect
		const timer = setTimeout(async () => {
			// if (!code) {
			// 	console.log('No responseCode, redirecting to PAYMENT_FAILURE');
			// 	navigate(USER_ROUTES.PAYMENT_FAILURE, { state: { orderId, errorCode: 'N/A' }, replace: true });
			// 	return;
			// }

			// Handle VNPAY response codes
			switch (code) {
				case '00': // Payment successful
					console.log('Navigating to PAYMENT_SUCCESS');
					navigate(PATH.PAYMENT_SUCCESS);
					break;
			}
		}, 2000);

		// Cleanup the timer if the component unmounts before the delay completes
		return () => clearTimeout(timer);
	}, [searchParams, navigate]);

    const createPayment = async () => {
        const response = await createPaymentService(user?.userId + "");
        if (response) {
            console.log("createPayment: ", response);
            window.location.href = response.checkoutUrl; // Chuyển hướng đến URL thanh toán
        }
    };

    return (
        <div>
            <button
                onClick={createPayment}
                type="button"
                className="text-purple-500 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
            >
                {text}
            </button>
        </div>
    );
};

export default PremiumButton;