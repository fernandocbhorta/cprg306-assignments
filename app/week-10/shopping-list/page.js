"use client";

import ItemList from "./item-list.js";
import NewItem from "./new-item.js";
import MealIdeas from "./meal-ideas.js";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();


  // Define state variables at the top
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [selectedItemName, setSelectedItemName] = useState(null);

  // If user is not logged in, render a message


  const loadItems = async () => {
      console.log("Loading Items...");
      console.log("User ID:", user.uid);
      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
      console.log("Loaded Items:", fetchedItems);
  };

  useEffect(() => {
    if (user)
    loadItems();
}, [user]); // Run effect whenever 'user' changes


  const handleAddItem = async (newItem) => {
      await addItem(newItem, user.uid);
      console.log("Added Item:", newItem);
      console.log("User ID:", user.uid);
      loadItems(); // Reload items after adding a new one
  };

  const handleItemSelect = (item) => {
    console.log("Selected Item:", item); 

    // big function to clean up the item name. Got most of this from Google
    const cleanItemName = (name) => {
        // Remove anything after a comma
        let cleanedName = name.split(',')[0].trim();

        // Remove emojis using a regular expression
        cleanedName = cleanedName.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F800}-\u{1F8FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

        // Remove trailing whitespace
        cleanedName = cleanedName.trim();

        // Remove the last character if it's an "s" (plural)
        if (cleanedName.endsWith('s')) {
            cleanedName = cleanedName.slice(0, -1);
        }

        return cleanedName;
    };

    const cleanedName = cleanItemName(item.name);
    setSelectedItemName(cleanedName);
    console.log("Selected Item Name:", cleanedName); 
  };

  

  const byName = () => {
    setSortBy("name");
    setItems(
      [...items].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const byCategory = () => {
    setSortBy("category");
    setItems(
      [...items].sort((a, b) => {
        // Sort by category first
        if (a.category.localeCompare(b.category) !== 0) {
          return a.category.localeCompare(b.category);
        } else {
          // If categories are the same, sort by name
          return a.name.localeCompare(b.name);
        }
      })
    );
  };

  const byGroup = () => {
    setSortBy("grouped");
    setItems(
      [...items].sort((a, b) => {
        // Sort by category first
        if (a.category.localeCompare(b.category) !== 0) {
          return a.category.localeCompare(b.category);
        } else {
          // If categories are the same, sort by name
          return a.name.localeCompare(b.name);
        }
      })
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
      <button  className="p-2 m-2 w-20 hover:bg-blue-400 bg-blue-600 rounded" onClick={firebaseSignOut}>Sign Out</button>
      <div className="flex"> 
        <ul>
          <NewItem onAddItem={handleAddItem} />
          <ItemList
            items={items}
            sortBy={sortBy}
            byName={byName}
            byCategory={byCategory}
            byGroup={byGroup}
            onItemSelect={handleItemSelect} 
          />
        </ul>
        <MealIdeas ingredient={selectedItemName} /> 
      </div>
    </main>
  );
}