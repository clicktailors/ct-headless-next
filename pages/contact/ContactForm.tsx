import React, { useState } from "react";
import Form from "../../components/ui/Form/components/Form";
import { useFormSubmit } from "../../utils/hooks/useFormSubmit";

const ContactForm = ({ fields }: { fields: any }) => {
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
