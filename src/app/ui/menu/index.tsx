"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Main page",
    route: "/main",
  },
  {
    label: "Todos page",
    route: "/main/todos",
  },
];

export default function Menu() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      {menuItems.map((item) => (
        <Link
          key={item.route}
          href={item.route}
          className={`${
            pathname === item.route
              ? "font-bold text-blue-600"
              : "text-gray-600"
          } px-3 py-2 text-lg
      hover:text-blue-500 hover:bg-gray-100
      focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
