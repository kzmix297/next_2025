import { auth } from "@/auth";
import Logout from "./Logout";

export default async function Header() {
  const session = await auth();
  if (!session?.user) redirect("/");
  const menu = [
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Add Product",
      href: "/addProduct",
    },
    {
      name: "Draft Product",
      href: "/draftProduct",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];
  return (
    <header className="bg-appaqua">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center  justify-between p-6 lg:px-8"
      >
        <a href="/" className="text-2xl font-bold text-gray-900">
          Cla Fashion
        </a>

        <ul className="flex items-center space-x-6">
          {menu.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-gray-900 font-semibold hover:text-gray-700 hover:underline hover:opacity-75 hover:transition "
              >
                {item.name}
              </a>
            </li>
          ))}

          <Logout />
        </ul>
      </nav>
    </header>
  );
}
