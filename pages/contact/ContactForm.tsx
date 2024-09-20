import React, { useState } from "react";
import Form from "../../components/ui/Form/Form";
import { useFormSubmit } from "../../utils/hooks/useFormSubmit";

const ContactForm = () => {
	const fields = {
		"Send us a message.": [
			{
				type: "text",
				name: "firstName",
				placeholder: "John",
				label: "First Name",
				required: true,
			},
			{
				type: "text",
				name: "lastName",
				placeholder: "Doe",
				label: "Last Name",
				required: true,
			},
			{
				type: "tel",
				name: "phone",
				placeholder: "(123) 456-7890",
				label: "Phone Number",
				required: false,
			},
			{
				type: "email",
				name: "email",
				placeholder: "john.doe@example.com",
				label: "Email Address",
				required: true,
			},
			{
				type: "textarea",
				name: "message",
				placeholder: "Hello, I'm interested in applying for a new home!",
				label: "Your message",
				required: true,
			},
		],
	};

	const [isSubmitting, setIsSubmitting] = useState(false);

	const { handleSubmit, submitError } = useFormSubmit("contact");

	const onSubmit = async (formData: any) => {
		setIsSubmitting(true);
		try {
			await handleSubmit(formData);
			alert("Message sent successfully");
			// Reset form or redirect as needed
		} catch (error) {
			// Error is already logged and set in the hook
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			{submitError && (
				<div className="text-red-500 mb-4">{submitError}</div>
			)}
			<Form
				fields={fields}
				onSubmit={onSubmit}
				submitButtonText={isSubmitting ? "Sending..." : "Send Message"}
				isSubmitting={isSubmitting}
			/>
		</>
	);
};

export default ContactForm;