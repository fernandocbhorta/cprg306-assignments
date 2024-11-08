"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  console.log(user);

  return (
    <div>
      <h1>Week 9</h1>
      <p>{user ? "Hi there!" : "Please sign in to see the shopping list"}</p>          
      
      <p>
        {user ? (<p><Link href="./week-9/shopping-list">See the shopping list</Link></p>) : (<p>&nbsp;</p>)}
        {user ? (
          
          <button onClick={firebaseSignOut}>Sign Out</button>
        ) : (
          <button onClick={gitHubSignIn}>Sign In with GitHub</button>
        )}
      </p>
    </div>
  );
}
