import NewItem from "./new-item";
import Link from "next/link";

export default function Page() {
    return (
        
      <main>
        <p className="text-sm p-2 m-2"><Link href="../"> &#8592; back to main page</Link></p>
        <h1 className="text-3xl p-2 m-2 m-0 font-bold text-center text-yellow-100">Week 5 - Interactivity with Forms</h1>        
        <NewItem />
      </main>
    );
  }