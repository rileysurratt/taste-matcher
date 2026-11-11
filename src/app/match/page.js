import AddFavorites from "@/components/AddFavorites";

export const metadata = { title: "Build your taste · Taste Matcher"};

// Add Favorites Screen designed in Figma

export default function MatchPage(){
    return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-11 md:px-[120px]">
      <header className="relative mb-8">
        <p className="text-xs font-medium text-lavender">01 / BUILD YOUR TASTE</p>
        <h1 className="mt-3.5 text-4xl font-black leading-tight tracking-[-0.04em] md:text-[56px] md:leading-[62px]">
          <span className="relative inline-block">
            Your taste
            {/* Lavender marker underline */}
            <span className="absolute -bottom-1 left-0 h-1 w-full -rotate-[0.5deg] rounded-sm bg-lavender" />
          </span>{" "}
          starts here.
        </h1>
        <p className="mt-2 text-muted">Pick the movies and shows you can&apos;t stop thinking about.</p>

        <span className="absolute right-0 top-7 hidden h-12 -rotate-5 items-center rounded-3xl bg-lavender px-6 text-sm font-medium text-background xl:flex">
          VERY YOU. VERY GOOD.
        </span>
      </header>

      <AddFavorites />
    </main>
  );
}