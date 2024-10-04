import React, { useState } from "react";
import Form from "../../ui/Form/components/Form";
import { useFormSubmit } from "../../../utils/hooks/useFormSubmit";
import Lottie from "../../images/animations/lottie";
import Container from "../../ui/Container";

export default function Newsletter() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubscribed, setIsSubscribed] = useState(false); // State to track subscription status
	const [titleMessage, setTitleMessage] = useState({
		title: "Subscribe to Our Newsletter!",
		body: "Sign up to our newsletter to get the latest news and updates.",
	});

	const newsletterAnimation =
		"https://lottie.host/ebc0a280-efc9-43a4-9be1-be0cdef674d1/VrnZT7yV9p.lottie";

	const [isFading, setIsFading] = useState(false);

	const fields = [
		{
			type: "email",
			name: "email",
			label: "Email Address",
			placeholder: "john.doe@example.com",
			required: true,
		},
	];

	const { handleSubmit, submitError, setSubmitError } =
		useFormSubmit("newsletter");

	const onSubmit = async (formData: any) => {
		setIsSubmitting(true);
		try {
			await handleSubmit(formData);
			setIsFading(true);
			setIsSubscribed(true);
			setTimeout(() => {
				setTitleMessage({
					title: "Thank You For Joining Our Newsletter!",
					body: "You will receive an email when we publish new content.",
				});
				setIsFading(false);
			}, 500); // Adjust this timing to match your CSS transition duration
		} catch (error) {
			setSubmitError("Error subscribing. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-white w-full p-4 pt-24 rounded-md flex flex-col items-center justify-center gap-8">
			<Container>
				<div
					className={`w-full flex flex-col text-center justify-center ${
						isFading ? "opacity-0" : "opacity-100"
					}`}
				>
					<Lottie
						button={false}
						src={newsletterAnimation}
						loop={true}
						autoplay={true}
					/>
					<h2 className={`text-2xl font-bold mb-4`}>
						{titleMessage.title}
					</h2>
					<p className="text-sm text-gray-500">{titleMessage.body}</p>
				</div>
				<div className="w-full flex items-center">
					<Form
						fields={fields}
						onSubmit={onSubmit}
						submitButtonText={
							isSubmitting ? "Subscribing..." : "Subscribe"
						}
						isSubmitting={isSubmitting}
						successMessage="Subscribed successfully!"
						errorMessage="Error subscribing. Please try again."
						submitSuccess={isSubscribed}
						submitError={submitError}
					/>
				</div>
			</Container>
		</div>
	);
}
