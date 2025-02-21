import Image from "next/image";
import Form from "@/components/form/form";
import SearchReports from "@/components/search-reports/search-reports";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 gap-4 bg-gradient-to-br from-blue-900 to-black">
      <div className="flex w-full items-center justify-center mb-4">
        <div className="relative min-w-48 min-h-36">
          <Image
            src="valorant.svg"
            alt="valorant logo"
            fill
            className="absolute object-contain"
          />
        </div>
        <h1 className="text-3xl font-semibold">Valorant smurf tracker</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Form />
        <SearchReports search={search} />
      </div>
    </div>
  );
}
