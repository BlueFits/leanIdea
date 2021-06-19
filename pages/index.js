import { useState } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";

//Redux
import { useDispatch } from "react-redux";
//Reducers
import { getUser } from "../store/actions/user";

const Index = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [email, setEmai] = useState();
  const [password, setPassword] = useState();

  //Handlers
  const loginHandler = async (e, path) => {
    try {
      const response = await fetch("http://localhost:5000/" + "user/login", {
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

        dispatch(getUser(resData.token, resData.result));

        localStorage.setItem("authData", resData.token);

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