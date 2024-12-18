"use client";

import SocialLogins from "./SocialLogins";

import { doCredentialLogin } from "@/app/actions";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        setError(response.error.message);
      } else {
        router.push("/home");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <div className="flex bg-slate-400 h-screen w-full justify-center items-center">
      <div className="text-xl bg-white text-red-500">{error}</div>
      
      <form
        className="flex flex-col items-center border-gray-200 rounded-md"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col w-80 gap-2 items-center">
            <h1 className="text-2xl font-bold">Login</h1>
          <div className="flex flex-row justify-evenly items-center font-semibold ">
            <label htmlFor="email">Username</label>
            <input
              className="border mx-2 p-2 border-gray-500 rounded"
              type="text"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-row justify-evenly items-center font-semibold ">
            <label htmlFor="password">Password</label>
            <input
              className="border mx-2 p-2 border-gray-500 rounded"
              type="password"
              name="password"
              id="password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-orange-300 mt-4 h-8 rounded flex justify-center items-center w-80"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
