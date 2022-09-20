import React from "react";

const PlaceOrder = () => {
  useEffect(() => {
    document.title = "Place an Order";
  });

  return (
    <div>
      <h2 className="label-place-order">Place an Order</h2>
    </div>
  );
};

export default PlaceOrder;
