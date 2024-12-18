const users = [
  {
    email: "atapas@email.com",
    password: "password",
  },
  {
    email: "alex@email.com",
    password: "password",
  },
  {
    email: "bob@email.com",
    password: "password",
  },
];

export const getUserByEmail = (email) => {
  const found = users.find((user) => user.email === email.email);
  return found;
};

export async function loginBackend(credentials) {
  const dataForm = {
    username: credentials.email,
    password: credentials.password,
  };

  const user = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });

  return user;
}
