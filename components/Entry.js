import { useState } from "react";

const Entry = ({ init }) => {

    const { description } = init;

    //States
    const [entryState, setEntryState] = useState(description);

    //Handlers
    const onChangeHandler = (e) => {
        setEntryState(e.target.value);
    }

    return (
        <div>
            <textarea onChange={onChangeHandler} value={entryState}></textarea>
        </div>
    );
};

export default Entry;