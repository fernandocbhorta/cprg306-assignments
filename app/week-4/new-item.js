"use client";

import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="p-4 m-4 bg-slate-900 w-40">
      <p className="text-center">{quantity}</p>
      <button
        disabled={quantity == 1} 
        className="p-3 text-black rounded m-1 hover:bg-blue-400 disabled:bg-slate-600 bg-gray-100"
        onClick={decrement}
      >
        -
      </button>
      <button
        disabled={quantity == 20} 
        className="p-3 text-black rounded m-1 hover:bg-blue-400 disabled:bg-slate-600 bg-gray-100"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}
