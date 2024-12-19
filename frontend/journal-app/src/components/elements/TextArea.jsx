import { useState } from "react";

import classes from "./TextArea.module.css";

const TextArea = () => {
    return (
        <div>
            <textarea type="text" className={classes.textarea} spellcheck="false" placeholder="Type here"></textarea>
        </div>
    );
};

export default TextArea;
