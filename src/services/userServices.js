import { API_ENDPOINT } from "@env";
export const saveUser = async (user) => {
  const response = await fetch(`${API_ENDPOINT}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  });

  const newUser = await response.json();
  return newUser;
};

export const getRolesAvailables = async () => {
  const response = await fetch(`${API_ENDPOINT}/api/roles`);
  const roles = await response.json();
  console.log(roles);
  return roles;
};
