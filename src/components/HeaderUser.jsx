import { auth } from "@/auth";
import Logout from "./Logout";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default async function HeaderUser() {
  const session = await auth();
  if (!session?.user) redirect("/");
  const menu = [];

  function FormFloatingBasicExample() {
    return (
      <>
        <FloatingLabel
          controlId="floatingInput"
          label="Cari Product"
          className="hidden md:flex items-center w-1/2 "
        >
          <Form.Control type="string" placeholder="grays" />
        </FloatingLabel>
      </>
    );
  }
  return (
    <header className="bg-slate-300">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <a href="/" className="text-2xl font-bold text-gray-900">
          Cla Fashion
        </a>
        <FormFloatingBasicExample />
        <ul className="hidden md:flex items-center space-x-6 ">
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
