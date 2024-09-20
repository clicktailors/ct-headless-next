import { useEffect } from "react";
import { useRouter } from "next/router";

const PaymentSuccess = () => {
	const router = useRouter();
	const { payment_intent, payment_intent_client_secret, redirect_status } =
		router.query;

	useEffect(() => {
		if (redirect_status === "succeeded") {
			// Handle successful payment here
			console.log("Payment succeeded:", payment_intent);
		} else {
			// Handle other statuses or errors
			console.log("Payment status:", redirect_status);
		}
	}, [redirect_status, payment_intent]);

	return (
		<div className="container">
			<h1>Payment Success</h1>
			{redirect_status === "succeeded" ? (
				<p>Your payment was successful. Thank you for your purchase!</p>
			) : (
				<p>There was an issue with your payment. Please try again.</p>
			)}
		</div>
	);
};

export default PaymentSuccess;
