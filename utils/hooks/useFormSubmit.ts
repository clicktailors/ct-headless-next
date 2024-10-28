import { useState } from 'react';
import { submitForm } from '../../services/submitForm';

const LOGGING = process.env.LOGGING || false;

export const useFormSubmit = (formType: string) => {
	const [submitError, setSubmitError] = useState<string | null>(null);

	const handleSubmit = async (formData: any) => {
		setSubmitError(null);
		try {
			const result = await submitForm(formType, formData);
			LOGGING && console.log("Form submission result:", result);
			return result;
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitError("Error sending message. Please try again.");
			throw error;
		}
	};

	return { handleSubmit, submitError, setSubmitError };
};