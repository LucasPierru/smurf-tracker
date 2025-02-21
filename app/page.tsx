import Image from "next/image";
import Form from "@/components/form/form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 gap-4">
      <div className="flex w-full items-center justify-center">
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
      <Form />
    </div>
  );
}
