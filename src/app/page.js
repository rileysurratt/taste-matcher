import Link from "next/link";

// Simple version of the "01 · Landing" hero. The poster collage and "how it works" cards come later.
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-16 md:px-[120px]">
      <p className="text-xs font-medium text-lavender">GOOD TASTE IS BETTER SHARED</p>
      <h1 className="mt-6 max-w-xl text-5xl font-black leading-[1.1] tracking-[-0.04em] md:text-[72px]">
        Find what to watch —{" "}
        <span className="relative inline-block text-lavender">
          together.
          <span className="absolute -bottom-2 left-0 h-1 w-full -rotate-1 rounded-sm bg-lavender" />
        </span>
      </h1>
      <p className="mt-8 max-w-md text-lg leading-7 text-muted">
        Your favorites. Their favorites. Your next obsession. Find the overlap, skip the endless scrolling.
      </p>
      <Link
        href="/match"
        className="mt-10 inline-flex h-12 items-center rounded-3xl bg-purple px-9 text-sm font-medium hover:bg-purple/85"
      >
        Start a Match&nbsp;&nbsp;↗
      </Link>
      <p className="mt-5 text-xs font-medium text-muted">Free to try. Better with friends.</p>
    </main>
  );
}