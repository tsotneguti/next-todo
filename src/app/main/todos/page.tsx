"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getTodos } from "../../actions";

export default function Page() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const res = await getTodos();
    if (res !== "error") {
      setItems(res as any);
    } else {
      setItems([]);
    }
  };

  return (
    <div>
      <div>
        <Link href={"/main/todos/create"}>
          <button className={"custom-btn"}>Create Item</button>
        </Link>
      </div>
      {items.map((item: any) => (
        <div key={item.id}>{item.description}</div>
      ))}
    </div>
  );
}
