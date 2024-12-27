import axios from "axios";

export interface ILoginInputs {
  username: string;
  password: string;
}

export const login = async ({ username, password }: ILoginInputs) => {
  try {
    const res = await axios.request({
      url: "http://localhost:8080/auth/login",
      method: "POST",
      data: {
        email: username,
        password,
      },
    });
    console.log(res);
    // store token in local storage
    if (res.status !== 200) {
      throw new Error("Oh no! An error occured logging you in...");
    }

    localStorage.setItem("token", res.data.token);

    return res;
  } catch (err) {
    console.error(err);
  }
};

export const verify = async (token: string) => {
  try {
    const res = await axios.request({
      url: "http://localhost:8080/auth/verify",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);

    if (res.status !== 200) {
      throw new Error("Authentication Invalid!");
    }
    return res;
  } catch (err) {
    console.error(err);
  }
};
