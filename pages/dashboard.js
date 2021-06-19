import { useEffect, useState } from "react";

//Redux
import { useSelector } from "react-redux";

const dashBoard = () => {
    const session = useSelector(state => state.userReducer);

    const [problemText, setProblemText] = useState("");
    const [problemData, setProblemData] = useState([
        {description: "hello"},
        {description: "salut"}
    ]);

    useEffect(async () => {
        console.log(session);
        if (session.token) {

            const response = await fetch("http://localhost:5000/user/entries/" + session.user._id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + session.token,
                    "Content-Type" : "application/json",
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const errData = await response.json();
                console.log(errData);
            } else {
                const resData = await response.json();
                // setProblemData(resData);
            }

        }
    }, []);

    const addEntryHandler = () => {
        let problemUpdate = [...problemData, { description: problemText }];
        setProblemText("");
        setProblemData(problemUpdate);
    };

    return (
        <div>
            <ul>
                {problemData.map((item, index) => {
                    return <li key={"key " + index}>{item.description}</li>
                })}
            </ul>
            <textarea onChange={(e) => setProblemText(e.target.value)} value={problemText}></textarea>
            <button onClick={addEntryHandler}>Add</button>
        </div>
    );
};

export default dashBoard;