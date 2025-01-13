"use client";

import { useActionState, useState } from "react";
import { addTodo } from "@/app/actions";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function Page() {
  const [value, setValue] = useState("");

  const [state, formAction, isPending] = useActionState(
    async (ps: any, formData: any) => {
      return await addTodo(ps, formData);
    },
    null
  );
  if (state && !state.error) {
    redirect("/main/todos");
  }
  // async function formAction() {
  //   const formData = new FormData();
  //   formData.append("description", value);
  //   await addTodo(null, formData);
  //   setStatus("წარმატებით დაემატა");
  //   setTimeout(() => router.push("/main/todos"), 1000);
  // }

  return (
    <>
      <form className={"flex"} action={formAction}>
        <input
          type={"text"}
          className={"custom-input w-64"}
          name={"description"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className={"custom-btn"} type="submit">
          submit
        </button>
      </form>
      <div>{isPending && "იტვირთება"}</div>
    </>
  );
}
