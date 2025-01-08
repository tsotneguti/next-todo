import Menu from "../ui/menu";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"flex h-screen"}>
      <div className={"border-solid border-2 w-64"}>
        <Menu />
      </div>
      <div className={"border-solid border-2 flex-1"}>{children}</div>
    </div>
  );
}
