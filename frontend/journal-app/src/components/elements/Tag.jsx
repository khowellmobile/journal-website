import { useState, useCallback } from "react";
import classes from "./Tag.module.css";

const Tag = ({ tagName, isMono = false, lockInitialState = false, addTag = null, removeTag = null }) => {
    const [colorClass, setColorClass] = useState(() => (isMono ? "monochrome" : tagName));

    // Use useCallback to memoize clickHandler so it doesn't get recreated on every render
    const clickHandler = useCallback(() => {
        if (!lockInitialState) {
            setColorClass((prev) => {
                const newColorClass = prev === "monochrome" ? tagName : "monochrome";
                return newColorClass;
            });

            if (colorClass === "monochrome") {
                addTag(tagName); 
            } else {
                removeTag(tagName);
            }
        }
    }, [colorClass, tagName, addTag, removeTag, lockInitialState]);

    return (
        <div className={`${classes.tag} ${classes[colorClass]}`} onClick={clickHandler}>
            <p>#{tagName}</p>
        </div>
    );
};

export default Tag;