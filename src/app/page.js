import LoginForm from "@/components/LoginForm";
import { getAuth } from "./actions";
import { redirect } from "next/navigation";
import { Image } from "react-bootstrap";

export default async function Home() {
  const auth = await getAuth();

  auth?.user?.fullname ? redirect("/home") : null;
  return (
    <div className="flex flex-row h-screen w-screen bg-slate-500 items-center justify-evenly">
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="w-1/2 ">
        <LoginForm />
      </div>
    </div>
  );
}
