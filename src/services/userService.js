const currentUser = {};

export const getCurrentUser = () => {
  return currentUser;
};

export const login = (user) => {
  currentUser = user;
};

export const logout = () => {
  currentUser = {};
};

export const getAllUsers = () => {
  return fetch("http://localhost:8088/users");
};

export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`)
    .then((res) => res.json())
    .then((res) => (res.length > 0 ? res : "Invalid email"));
};

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getUserById = (id) => {
  return fetch(`http://localhost:8088/users/${id}?_embed=posts`).then(res => res.json())
}