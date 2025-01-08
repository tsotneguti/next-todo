"use client";

import { useActionState } from "react";
import { addTodo } from "@/app/actions";

export default function Page() {
  const [state, formAction] = useActionState(addTodo, null);
  return (
    <form className={"flex"} action={formAction}>
      <input
        type={"text"}
        className={"custom-input w-64"}
        name={"description"}
      />
      <button className={"custom-btn"} type="submit">
        submit
      </button>
    </form>
  );
}
