import React, { useEffect } from "react";

const Payment = () => {
  useEffect(() => {
    document.title = "Payment";
  });
  return (
    <div>
      <h2 className="label-place-order">Payment</h2>
    </div>
  );
};

export default Payment;
