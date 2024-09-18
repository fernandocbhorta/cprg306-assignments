import ItemList from "./item-list.js";
import Link from "next/link";

export default function Page() {
    return (
        
      <main>
        <p className="text-sm p-2 m-2"><Link href="../"> &#8592; back to main page</Link></p>
        <h1 className="text-3xl p-2 m-2 font-bold text-yellow-100">Shopping List</h1>        
        <ul>
            <ItemList />
        </ul>
      </main>
    );
  }