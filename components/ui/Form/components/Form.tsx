import React, { useState } from "react";
import { validateForm, FormErrors } from "../../../../utils/formValidation";
import Category from "./Category";

const formClasses = "p-6 form-control w-full max-w-lg mx-auto p-2 mb-20";
const submitButtonClasses = "btn btn-primary w-full mt-6";

export interface FieldType {
	label: string;
	type: string;
	name: string;
	placeholder: string;
	options?: string[];
	required?: boolean;
}

interface FormProps {
	fields: FieldType[] | { [category: string]: FieldType[] };
	requiredFields?: string[];
	onSubmit: (formData: any) => Promise<void>;
	submitButtonText?: string;
	isSubmitting: boolean;
	children?: React.ReactNode;
	initialData?: Record<string, any>;
}

const Form: React.FC<FormProps> = ({
	fields,
	onSubmit,
	submitButtonText = "Submit",
	isSubmitting,
	initialData,
}) => {
	const [formData, setFormData] = useState<{ [key: string]: string }>(
		initialData || {}
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form className={formClasses} onSubmit={handleSubmit}>
			{Array.isArray(fields) ? (
				<Category
					fields={fields}
					formData={formData}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>)
					}
					errors={{}}
				/>
			) : (
				fields &&
				Object.entries(fields).map(
					([category, categoryFields]) =>
						categoryFields.length > 0 && (
							<Category
								key={category}
								category={category}
								fields={categoryFields}
								formData={formData}
								onChange={(e) =>
									handleChange(
										e as React.ChangeEvent<HTMLInputElement>
									)
								}
								errors={{}}
							/>
						)
				)
			)}
			<button
				type="submit"
				className={submitButtonClasses}
				disabled={isSubmitting}
			>
				{isSubmitting ? "Submitting..." : submitButtonText}
			</button>
		</form>
	);
};

export default Form;
