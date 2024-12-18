import { doLogout } from "@/app/actions";

const Logout = () => {
  return (
    <form action={doLogout}>
      <button
        className="bg-amber-500 text-gray-950 px-3 py-2 rounded hover:bg-amber-600 transition duration-300"
        type="submit"
      >
        Logout
      </button>
    </form>
  );
};

export default Logout;
