"use client";
import Input from "@/components/input/input";
import { useRouter } from "next/navigation";
import { useRef, KeyboardEvent } from "react";
import { CornerDownLeft } from "lucide-react";

export const SearchInput = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const search = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchRef.current && searchRef.current.value)
      router.push(`/?search=${searchRef.current.value}`);
  };

  return (
    <div className="relative">
      <Input
        ref={searchRef}
        id="search"
        type="text"
        placeholder="Search reports"
        onKeyDown={search}
      />
      <button
        className="absolute flex justify-center items-center right-0 top-0 h-full aspect-square"
        onClick={() => {
          if (searchRef.current && searchRef.current.value)
            router.push(`/?search=${searchRef.current.value}`);
        }}
      >
        <CornerDownLeft className="rounded-lg w-3/4 h-3/4 p-1 hover:bg-white/20 transition duration-300" />
      </button>
    </div>
  );
};
