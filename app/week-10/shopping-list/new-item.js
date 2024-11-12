"use client";

import { useState } from "react";

export default function NewItem({onAddItem}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");
  const [quantity, setQuantity] = useState(1);
  const categories = ["Produce", "Dairy", "Bakery", "Meat", "Frozen Foods", "Canned Goods", "Dry Goods", "Beverages", "Snacks", "Household", "Other"];

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name !== "" && category !== "" && quantity > 0) {
        const newItem = { name, quantity, category };
        console.log("Submitting New Item:", newItem); // Debug log
        onAddItem(newItem);
        setName("");
        setCategory("produce");
        setQuantity(1);
    } else {
        console.log("Form validation failed"); // Debug log for validation failure
    }
};

  return (
    <div className="p-2 m-2 flex max-w-screen-sm w-full ">
      <form className="p-4" onSubmit={handleSubmit}> 
        <div className="max-w-screen-sm items-center mb-2">
          <input 
            id="name" 
            type="text" 
            value={name} 
            onChange={(event) => setName(event.target.value)} 
            placeholder="enter item name" 
            className="my-2 p-2 max-w-screen-sm w-full rounded text-black border" 
            required />
        </div>

        <div className="max-w-screen-sm items-center mb-2">
          <p className="px-4 text-black space-around bg-white">{quantity}
          <button type="button" 
            disabled={quantity == 1} 
            className="p-3 text-black rounded m-1 hover:bg-blue-400 disabled:bg-slate-300 bg-blue-600"
            onClick={decrement}
          >
            -
          </button>
          <button type="button" 
            disabled={quantity == 20} 
            className="p-3 text-black rounded m-1 hover:bg-blue-400 disabled:bg-slate-300 bg-blue-600"
            onClick={increment}
          >
            +
          </button>
          </p>
        </div>

        <div className="mb-2">
          <select required className="py-2 max-w-screen-sm w-full rounded text-black border" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value disabled>Pick a Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="py-2 my-2 max-w-screen-sm hover:bg-blue-400 bg-blue-600 rounded w-full">add to list</button> {/* Changed input to button */}
        </div>
      </form>
    </div>
  );

}
