import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/modules/User/userSlice";
import { useSelector } from "react-redux";
import Server from "../../config/Server";

// export async function getStaticProps(context) {

// }

// export const getStaticPaths = async (context) => {

// }

export const getServerSideProps = async (context) => {
    try {
        const { user } = context.params
        // Local storage doesnt work
        const response = await fetch(Server + "user/get_user?id=" + user, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("vToken"),
          },
        });
    
        if (!response.ok) {
          const errData = await response.text();
          alert(errData);
          window.location.href = "/";
        } else {
          const userData = await response.json();
          return {
              props: {
                  user: userData
              }
          };
        }
      } catch (err) {
        throw err;
      }
}

const userPage = ({ user }) => {
    return (
        <h1>Salut {user.firstName}</h1>
    );
};

export default userPage;