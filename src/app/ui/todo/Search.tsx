"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    // params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <div>
        <Link href={"/main/todos/create"}>
          <button className={"custom-btn"}>Create Item</button>
        </Link>
        <div className={"flex"}>
          <input
            type={"text"}
            className={"custom-input w-40"}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
