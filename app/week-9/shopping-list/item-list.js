"use client";
import Item from "./item.js";

export default function ItemList({ items, sortBy, byName, byCategory, byGroup, onItemSelect }) {
  let currentCat = "";

  return (
    <main>
      <p className="m-2">
        <button
          className={`p-2 m-2 ${
            sortBy === "name" ? "bg-slate-900" : "bg-stone-900 text-stone-500"
          } rounded`}
          onClick={byName}
        >
          Sort by Name
        </button>
        <button
          className={`p-2 m-2 ${
            sortBy === "category" ? "bg-slate-900" : "bg-stone-900 text-stone-500"
          } rounded`}
          onClick={byCategory}
        >
          Sort by Category
        </button>
        <button
          className={`p-2 m-2 ${
            sortBy === "grouped" ? "bg-slate-900" : "bg-stone-900 text-stone-500"
          } rounded`}
          onClick={byGroup}
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

          <Item {...item} 
          onSelect={() => onItemSelect(item)}/>
        </div>
      ))}
    </main>
  );
}
