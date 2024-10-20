import Link from "next/link";

const weeks = [2,3,4,5,6,7];

export default function Page() {
    return (
      <main>
        <h1 className="text-3xl p-2 m-2 font-bold text-yellow-100 text-center">CPRG 306: Web Development 2 - Assignments</h1>
        <ul>
          {weeks.map((week) => (
                <li key={{week}}><Link href={`week-${week}`}>&#x1F4C5; Week {week}</Link></li>
          ))}
        </ul>
      </main>
    );
  }