import React, { useState } from "react";
import ApplicationLayout from "../ApplicationLayout";
import ApplicationForm from "../ApplicationForm";
import { BUYER_APPLICATION_FEE } from "../../../lib/stripeAmounts";
import StripeForm from "../../../components/ui/StripeForm";

const BuyerApplication = () => {
	const pageTitle = "Buyer Application";
	const pageDescription =
		"Fill out the form below to apply for a buyer account.";
	const initialFormData = { availableTime: JSON.stringify({ Any: true }) };
	const [isSubmitted, setIsSubmitted] = useState(false);

	const steps = [
		{
			title: "Contact Info",
			fields: {
				"Contact Information": [
					{
						type: "text",
						name: "firstName",
						label: "First Name",
						placeholder: "John",
						required: true,
					},
					{
						type: "text",
						name: "lastName",
						label: "Last Name",
						placeholder: "Doe",
						required: true,
					},
					{
						type: "tel",
						name: "phoneNumber",
						label: "Phone Number",
						placeholder: "(123) 456-7890",
						required: true,
					},
					{
						type: "email",
						name: "email",
						label: "Email Address",
						placeholder: "john.doe@example.com",
						required: true,
					},
				],
			},
		},
		{
			title: "Address",
			fields: {
				Address: [
					{
						type: "address",
						name: "address",
						label: "Address",
						placeholder: "123 Main St",
						required: true,
					},
					{
						type: "address2",
						name: "address2",
						label: "Apartment, Suite, etc.",
						placeholder: "Apt 1",
						required: false,
					},
					{
						type: "city",
						name: "city",
						label: "City",
						placeholder: "Anytown",
						required: true,
					},
					{
						type: "state",
						name: "state",
						label: "State",
						placeholder: "CA",
						required: true,
					},
					{
						type: "zip",
						name: "zip",
						label: "Zip",
						placeholder: "12345",
						required: true,
					},
				],
			},
		},
		{
			title: "Availability",
			fields: [
				{
					type: "weekdays",
					name: "availableDays",
					label: "Available Days to Call",
					placeholder: "Available Days to Call",
					required: true,
				},
				{
					type: "timeOfDay",
					name: "availableTime",
					label: "Available Time to Call",
					placeholder: "Available Time to Call",
					required: true,
				},
			],
		},
		{
			title: "Payment",
			component: StripeForm,
			props: { amount: BUYER_APPLICATION_FEE },
		},
	];

	const handleFormSubmit = () => {
		setIsSubmitted(true);
	};

	return (
		<ApplicationLayout
			pageTitle={pageTitle}
			pageDescription={isSubmitted ? "" : pageDescription}
		>
			<ApplicationForm
				steps={steps}
				formType="buyer"
				initialFormData={initialFormData}
				onFormSubmit={handleFormSubmit}
			/>
		</ApplicationLayout>
	);
};

export default BuyerApplication;
