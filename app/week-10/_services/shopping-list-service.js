import { db } from "../_utils/firebase"; // Import your configured Firestore instance
import { collection, getDocs, addDoc, query } from "firebase/firestore";

// export const getItems = async (userId) => {
//     try {
//         // Reference to the items subcollection for the specific user
//         const itemsRef = collection(db, `users/${userId}/items`);
        
//         // Query the items subcollection
//         const itemsQuery = query(itemsRef);
        
//         // Getting the documents from the query
//         const querySnapshot = await getDocs(itemsQuery);
        
//         // Initialize an array to hold the items
//         const items = [];
        
//         // Loop through each document and add to items array
//         querySnapshot.forEach((doc) => {
//             items.push({
//                 id: doc.id, // Document ID
//                 ...doc.data() // Document data
//             });
//         });
        
//         return items; // Return the items array
//     } catch (error) {
//         console.error("Error fetching items:", error);
//         throw error; // Rethrow the error for further handling
//     }
// };

export const getItems = async (userId) => {
    const ref = collection(db, "users", userId, "items");
    const docs = await getDocs(ref);
    return docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    docs.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    });
}

export const addItem = async (userId, item) => {
    try {
        // Reference to the user's items subcollection
        const itemsRef = collection(db, 'users', userId, 'items');
        
        // Add a new document with the item data to the items subcollection
        const docRef = await addDoc(itemsRef, item);
        
        // Return the new document's ID
        return docRef.id;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error; // Re-throw the error for handling in the calling function
    }
};
