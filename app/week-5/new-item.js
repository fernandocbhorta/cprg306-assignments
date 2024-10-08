"use client";

import { useState } from "react";

export default function NewItem() {
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
    let item = { name, category, quantity};
    console.log(item);
    alert(`New item object created: ${name} (${category}), x${quantity}`);
    setName("");
    setCategory("");
    setQuantity(1);
  };

  return (
    <div className="p-4 m-4 bg-slate-900 flex max-w-sm w-full text-center content-center">
      <form onSubmit={(event) => handleSubmit(event)} className="border rounded p-4">
        <div className="flex items-center mb-2">
          <input 
            id="name" 
            type="text" 
            value={name} 
            onChange={(event) => setName(event.target.value)} 
            placeholder="enter item name" 
            className="m-2 p-2 max-w-sm w-full rounded text-black border" 
            required />
        </div>

        <div className="flex items-center mb-2">
          <p className="mr-2">{quantity}</p>
          <button
            disabled={quantity == 1} 
            className="p-3 text-black rounded m-1 hover:bg-blue-400 disabled:bg-slate-300 bg-blue-600"
            onClick={decrement}
          >
            -
          </button>
          <button
            disabled={quantity == 20} 
            className="p-3 text-black rounded m-1 hover:bg-blue-400 disabled:bg-slate-300 bg-blue-600"
            onClick={increment}
          >
            +
          </button>
        </div>

        <div className="mb-2">
          <select className="p-2 w-full rounded text-black border" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value disabled>Pick a Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <input type="submit" value="add to list" className="p-2 m-2 hover:bg-blue-400 bg-blue-600 rounded w-full"/>
        </div>
      </form>
    </div>
  );

}
