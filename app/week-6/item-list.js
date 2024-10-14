"use client";

import Item from "./item.js";
import itemsJson from "./items.json";
import { useState } from "react";

export default function ItemList() {
    
  const [items, setItems] = useState([...itemsJson]);
  const [sortBy, setSortBy] = useState("name");     
  
  const byName = () => {
    setSortBy("name");
    setItems(
      [...items].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const byCategory = () => {
    setSortBy("category");
    setItems(
      [...items].sort((a, b) => a.category.localeCompare(b.category))
    );    
  };
   
    return ( 
        <main>
          <h1 className="p-2 m-2 text-xl">Sort shopping list items</h1>
          <p className="m-2">
          <button 
            className={`p-2 m-2 ${sortBy === "name" ? "bg-green-900" : "bg-red-900"} rounded`}
            onClick={byName}>
            Sort by Name
          </button>
          <button 
            className={`p-2 m-2 ${sortBy === "category" ? "bg-green-900" : "bg-red-900"} rounded`}
            onClick={byCategory}>
            Sort by Category
          </button>
          <button 
            className={`p-2 m-2 bg-red-900 rounded`}
            disabled
            >            
            Sort by Grouped Category
          </button>
          </p>
          {items.map((item) => (                        
            <div key={item.id}>
            <Item                           
              {...item}
            />
            </div>            
          ))}
          
        </main>
    );
}

