import Link from "next/link";

function Week({n}) {
  return (
    <li><Link href={`week-${n}`}>&#x1F4C5; Week {n}</Link></li>
  )
}

export default function Page() {
    return (
      <main>
        <h1>CPRG 306: Web Development 2 - Assignments</h1>
        <ul>
            <Week n={2} />
            <Week n={3}/>
        </ul>
      </main>
    );
  }