"use client";

import ItemList from "./item-list.js";
import NewItem from "./new-item.js";
import MealIdeas from "./meal-ideas.js";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

// Helper function to clean item names
const cleanItemName = (name) => {
  let cleanedName = name.split(',')[0].trim();
  cleanedName = cleanedName.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F800}-\u{1F8FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
  
  if (cleanedName.endsWith('s')) {
    cleanedName = cleanedName.slice(0, -1);
  }
  return cleanedName;
};

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(null);

  const loadItems = useCallback(async () => {
    if (user) { // Check if user is defined
      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
      ItemList.sortItems();
    }
  }, [user]); // Include user as a dependency

  useEffect(() => {
    loadItems(); // Call loadItems when user changes
  }, [user, loadItems]);

  if (!user) {
    return (
      <p>
        <Link href="../week-10">You shouldn&apos;t be here, click to go back</Link>
      </p>
    );
  }

  const handleAddItem = async (newItem) => {
    await addItem(newItem, user.uid);
    loadItems();     
  };

  const handleItemSelect = (item) => {
    const cleanedName = cleanItemName(item.name);
    setSelectedItemName(cleanedName);
  };

  return (
    <main>
      <p className="text-sm p-2 m-2">
        <Link href="../">&#8592; back to main page</Link>
      </p>
      <h1 className="text-3xl p-2 m-2 font-bold text-yellow-100">
        Shopping List
      </h1>
      <button className="p-2 m-2 w-20 hover:bg-blue-400 bg-blue-600 rounded" onClick={firebaseSignOut}>
        Sign Out
      </button>
      <div className="flex">
        <ul>
          <NewItem onAddItem={handleAddItem} />
          <ItemList
            items={items}
            setItems={setItems} // Pass setItems as a prop
            onItemSelect={handleItemSelect}
          />
        </ul>
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
