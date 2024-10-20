"use client";

import ItemList from "./item-list.js";
import NewItem from "./new-item.js";
import itemsData from "./items.json";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

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

  const byGroup = () => {
    setSortBy("grouped");
    setItems(
      [...items].sort((a, b) => a.category.localeCompare(b.category))
    );
  };

  return (
    <main>
      <p className="text-sm p-2 m-2">
        <Link href="../">&#8592; back to main page</Link>
      </p>
      <h1 className="text-3xl p-2 m-2 font-bold text-yellow-100">
        Shopping List
      </h1>
      <ul>
        <NewItem onAddItem={handleAddItem} />
        <ItemList
          items={items}
          sortBy={sortBy}
          byName={byName}
          byCategory={byCategory}
          byGroup={byGroup}
        />
      </ul>
    </main>
  );
}
