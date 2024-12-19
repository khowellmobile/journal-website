import { useState } from "react";

import classes from "./Tag.module.css";

const Tag = ({ tagName, isMono=false }) => {
    const [colorClass, setColorClass] = useState(() => (isMono ? "monochrome" : tagName));

    return (
        <div className={`${classes.tag} ${classes[colorClass]}`}>
            <p>#{tagName}</p>
        </div>
    );
};

export default Tag;
