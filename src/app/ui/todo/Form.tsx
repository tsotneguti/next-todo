"use client";

import { useActionState } from "react";
import { addTodo, editTodo } from "@/app/actions";
import { redirect } from "next/navigation";

export default function TodoForm({ data }: any) {
  const [state, formAction, isPending] = useActionState(
    async (ps: any, formData: any) => {
      if (data) {
        formData.append("id", data.id);
        return await editTodo(ps, formData);
      } else {
        return await addTodo(ps, formData);
      }
    },
    null
  );
  if (state && !state.error) {
    redirect("/main/todos");
  }

  return (
    <>
      <form className={"flex"} action={formAction}>
        <input
          type={"text"}
          className={"custom-input w-64"}
          name={"description"}
          defaultValue={data?.description}
        />
        <button className={"custom-btn"} type="submit">
          submit
        </button>
      </form>
      <div>{isPending && "იტვირთება"}</div>
    </>
  );
}
