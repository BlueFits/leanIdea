import { useState } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import Server from "../config/Server";
import { useDispatch } from "react-redux";
import { getUser } from "../services/modules/User/userSlice";

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //States
  const [email, setEmai] = useState();
  const [password, setPassword] = useState();
  //Handlers
  const loginHandler = async (e, path) => {
    try {
      const response = await fetch(Server + "user/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        }),
      });

      if (!response.ok) {
        const errData = await response.text();
        alert(errData);
      } else {
        const resData = await response.json();
        dispatch(getUser({ token: resData.token, user: resData.result }));
        alert("Successfuly logged in");
        router.push("/dashboard");
      }
    } catch (err) {
      throw err;
    }
  };

  const guestHandler = () => {
    alert("Working on guest");
  };

  return (
    <div>
      <Head>
        <title>Lean Idea</title>
      </Head>
      <h1>Lean Idea</h1>
      <input onChange={(e) => setEmai(e.target.value)}/>
      <input onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={loginHandler}>Login</button>
      <button onClick={guestHandler}>Continue as guest</button>
    </div>
  )
}

export default Index;