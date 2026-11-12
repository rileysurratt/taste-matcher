import CompareView from "@/components/CompareView";

export const metadata = { title: "Compare · Taste Matcher" };

export default function ComparePage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-11 md:px-[120px]">
      <p className="text-xs font-medium text-lavender">02 / YOUR MATCH</p>
      <h1 className="mb-10 mt-3.5 text-4xl font-black tracking-[-0.04em] md:text-[56px]">
        How do you compare?
      </h1>
      <CompareView />
    </main>
  );
}
