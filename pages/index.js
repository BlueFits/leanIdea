import { useState, useEffect } from "react";
import Head from 'next/head';

//Components
import Entry from "../components/Entry";

const Index = () => {
  const [user, setUser] = useState(null);
  const [problemData, setProblemData] = useState({ description: "none" });
  const [email, setEmai] = useState();
  const [password, setPassword] = useState();

  //API calls
  const fetchUserEntries = async (userId) => {
    try {
      console.log(userId);
      const response = await fetch("http://localhost:5000/" + "user/entries/" + userId, {
        headers: {
          "Authorization": "Bearer " + user.token,
          "Content-Type" : "application/json",
        },
      });

      if (!response.ok) {
        return { description: "error" };
      } else {
        const resData = await response.json();
        return resData;
      }

    } catch (err) {
      throw err;
    }
  };

  //Handlers
  const loginHandler = async () => {
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

        setUser(resData);

        let entries = fetchUserEntries(resData.result._id);

        setProblemData(entries.filter(entry => entry.category === "problem"));

        localStorage.setItem("authData", resData.token);
        
        alert("Successfuly logged in");
      }
    } catch (err) {
      throw err;
    }
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

      <Entry 
        init={problemData}
      />
    </div>
  )
}

export const getStaticProps = () => {
  return {
    props: {
      problemData: {
        description: "none"
      }
    }
  };
}

export default Index;