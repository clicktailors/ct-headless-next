import React, { useState } from "react";
import Form from "../../ui/Form/components/Form";
import { useFormSubmit } from "../../../utils/hooks/useFormSubmit";

const fields = {
	"Subscribe to Our Newsletter!": [
		{
			type: "email",
			name: "email",
			label: "Email Address",
			placeholder: "john.doe@example.com",
			required: true,
		},
	],
};

export default function Newsletter() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { handleSubmit, submitError } = useFormSubmit("newsletter");

	const onSubmit = async (formData: any) => {
		setIsSubmitting(true);
		try {
			await handleSubmit(formData);
			alert("Subscribed successfully");
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
				submitButtonText={isSubmitting ? "Subscribing..." : "Subscribe"}
				isSubmitting={isSubmitting}
			/>
		</>
	);
}
