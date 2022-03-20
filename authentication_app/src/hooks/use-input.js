import { useState } from "react";

const useInput = (validateCondition) => {
    const [enteredVal, setEnteredVal] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valIsValid = validateCondition(enteredVal);
    let hasErr = !valIsValid && isTouched;

    const valChangeHandler = (event) => {
        setEnteredVal(event.target.value);
    }

    const blurHandler = () => {
        setIsTouched(true);
    }

    return{
        val: enteredVal,
        hasErr,
        valChangeHandler,
        blurHandler,
        setIsTouched,
        valIsValid
    }

}

export default useInput;