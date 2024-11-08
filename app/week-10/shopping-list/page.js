"use client";

import ItemList from "./item-list.js";
import NewItem from "./new-item.js";
import { getItems, addItem } from "../_services/shopping-list-service.js";
import MealIdeas from "./meal-ideas.js";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  if (!user) {
    return <p><Link href="../week-10">You shouldn't be here, click to go back</Link></p>;
  }
  const [items, setItems] = useState([]);

  // Async function to load items
  const loadItems = async () => {
      try {
          // Check if user is logged in
          if (user && user.uid) {
              // Call getItems with the userId
              const userItems = await getItems(user.uid);
              // Set the state with the result
              setItems(userItems);
          }
      } catch (error) {
          console.error("Error loading items:", error);
      }
  };

  // Load items when the component mounts or when the user changes
  useEffect(() => {
      loadItems();
  }, [user]);

  const handleAddItem = async (newItem) => {
    try {
        // Call the addItem function with user.uid and the new item
        const newItemId = await addItem(user.uid, newItem);
        
        // Set the id of the new item
        const updatedItem = { ...newItem, id: newItemId };
        
        // Update the state to include the new item
        setItems([...items, updatedItem]);
    } catch (error) {
        console.error("Error adding item:", error);
    }
};


  const [sortBy, setSortBy] = useState("name");
  const [selectedItemName, setSelectedItemName] = useState(null);


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