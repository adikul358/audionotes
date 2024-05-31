"use client"

import { useEffect } from "react";

export default function RazorpayButton() {
	useEffect(() => {
    const rzpPaymentForm = document.getElementById("rzp_payment_form");
    
    if (!rzpPaymentForm.hasChildNodes()) {

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.async = true;
      script.dataset["payment_button_id"] = "pl_OGs39SZoFPovy1";
      rzpPaymentForm.appendChild(script);

    }

  }, []);


	return (
		<form id="rzp_payment_form" className="scale-110 w-max p-2"></form>
	)
}
