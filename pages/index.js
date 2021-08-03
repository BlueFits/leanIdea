import { useState } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authUser } from "../services/modules/User/userSlice";

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //States
  const [email, setEmai] = useState();
  const [password, setPassword] = useState();
  //Handlers
  const loginHandler = () => {
    dispatch(authUser({ email, password }))
    .then(() => {
      router.push("/dashboard");
    });
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