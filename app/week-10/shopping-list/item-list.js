"use client";
import Item from "./item.js";
import { useCallback } from "react";
import { useState } from "react";

export default function ItemList({ items, setItems, onItemSelect }) {
  let currentCat = "";
  const [sortBy, setSortBy] = useState("name");  

  const sortItems = useCallback((criteria) => {
    setSortBy(criteria);
    const sortedItems = [...items].sort((a, b) => {
      if (criteria === "name") {
        return a.name.localeCompare(b.name);
      }
      const categoryComparison = a.category.localeCompare(b.category);
      return categoryComparison !== 0 ? categoryComparison : a.name.localeCompare(b.name);
    });
    setItems(sortedItems); 
  }, [items, setSortBy, setItems]); 

  return (
    <main>
      <p className="m-2">
        <button
          className={`p-2 m-2 ${
            sortBy === "name" ? "bg-slate-900" : "bg-stone-900 text-stone-500"
          } rounded`}
          onClick={() => sortItems("name")}
        >
          Sort by Name
        </button>
        <button
          className={`p-2 m-2 ${
            sortBy === "category" ? "bg-slate-900" : "bg-stone-900 text-stone-500"
          } rounded`}
          onClick={() => sortItems("category")}
        >
          Sort by Category
        </button>
        <button
          className={`p-2 m-2 ${
            sortBy === "grouped" ? "bg-slate-900" : "bg-stone-900 text-stone-500"
          } rounded`}
          onClick={() => sortItems("grouped")}
        >
          Sort by Grouped Category
        </button>
      </p>
      {items.map((item) => (
        <div key={item.id}>
          {currentCat !== item.category && sortBy === "grouped" ? (
            <p className="px-4 capitalize text-xl">
              {currentCat = item.category}
            </p>
          ) : null}

          <Item {...item} onSelect={() => onItemSelect(item)} />
        </div>
      ))}
    </main>
  );
}
