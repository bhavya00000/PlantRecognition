import Link from "next/link";

export default function Home() {

  return (
    <>
      <h1>Herb ID</h1>
      <p>Scan your plants now</p>
      <Link href="/plantinfo">Get Info Now</Link>
    </>
  );
}
