import { useState } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../services/modules/User/userSlice";

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector(state => state.user);
  //States
  const [email, setEmai] = useState();
  const [password, setPassword] = useState();
  //Handlers
  const loginHandler = async () => {
    await dispatch(authUser({ email, password }));
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