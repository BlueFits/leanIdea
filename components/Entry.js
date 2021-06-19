import { useState } from "react";

const Entry = ({ init }) => {

    //States
    const [entryState, setEntryState] = useState(init);

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