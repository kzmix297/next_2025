import HeaderUser from "@/components/HeaderUser";

export default function Layout({ children }) {
  return (
    <section className="flex flex-col h-screen">
      <HeaderUser />
      {children}
    </section>
  );
}
