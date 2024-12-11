import { useState } from "react";

import classes from "./PostCard.module.css";

const PostCard = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <div className={classes.headerText}>
                    <h3>Working on website</h3>
                    <p>Date: 12/11/2024 @ 10:59am</p>
                </div>
                <div className={classes.headerTools}>
                    <div className={classes.tool} onClick={handleEditClick}>{isEditing ? <p>✔</p> : <p>E</p>}</div>
                    <div className={classes.tool}><p>x</p></div>
                </div>
            </div>
            <div className={classes.content}>
                <textarea type="text" className={classes.textarea} placeholder="Type here"></textarea>
            </div>
        </div>
    );
};

export default PostCard;
