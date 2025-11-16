"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function Button({ filter, children }) {
    return (
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter(filter)}
      >
        {children}
      </button>
    );
  }

  return (
    <div className="border border-primary-800 flex">
      <Button filter="all">All cabins</Button>
      <Button filter="small">1&mdash;3 guests</Button>
      <Button filter="medium">4&mdash;7 guests</Button>
      <Button filter="large">8&mdash;12 guests</Button>
    </div>
  );
}

export default Filter;
