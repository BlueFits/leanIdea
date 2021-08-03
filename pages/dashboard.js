import { useEffect, useState } from "react";
import Server from "../config/Server";
import { useSelector } from "react-redux";

const dashBoard = () => {
    const userData = useSelector(state => state.user);
    const [problemText, setProblemText] = useState("");
    const [problemData, setProblemData] = useState([]);

    useEffect(async () => {
        const { token, user } = userData;
        if (token) {
            const response = await fetch(Server + "user/entries/" + user._id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type" : "application/json",
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                const errData = await response.json();
                console.log(errData);
            } else {
                const resData = await response.json();
                setProblemData(resData);
            }
        }
    }, []);

    const addEntryHandler = async (category) => {
        setProblemText("");
        const response = await fetch(Server+ "add_entry", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                title: "test",
                category,
                description: problemText,
                userId: localStorage.getItem("authId"),
            })
        });
        const resData = await response.json();
        setProblemData([...problemData, resData]);
    };

    const removeEntryHandler = async (entryId) => {
        try {
            const update = problemData.filter((entry) => {
                if (entry._id !== entryId) {
                    return entry;
                }
            });
            setProblemData(update);
            await fetch(Server + "util/remove_entry", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    'Accept': 'app1lication/json',
                },
                body: JSON.stringify({
                    entryId,
                }),
            });
        } catch(err) {
            throw err;
        }
    };

    return (
        <div>
            <ul>
                {problemData.map((item, index) => {
                    return (
                        <li key={"key " +index + ": "  + item._id}>
                            <span>{item.description}</span>
                            <button onClick={removeEntryHandler.bind(this, item._id)}>close</button>
                        </li>
                    )
                })}
            </ul>
            <textarea onChange={(e) => setProblemText(e.target.value)} value={problemText}></textarea>
            <button onClick={addEntryHandler.bind(this, "problem")}>Add</button>
        </div>
    );
};

export default dashBoard;