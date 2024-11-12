import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";

export async function getItems(userid) {
    const q = query(
        collection(db, "users", userid, "items"),
        where("quantity", ">", 0)
    );
    const querySnapshot = await getDocs(q);
    
    const items = [];
    querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
    });
    return items; 
    
}

export async function addItem(item, userid) {
    console.log("Adding item:", item);
    console.log("User ID:", userid);
    try {
        const docRef = await addDoc(collection(db, "users", userid, "items"), item);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error.message);
        console.error("Error details: ", error);
    }
}