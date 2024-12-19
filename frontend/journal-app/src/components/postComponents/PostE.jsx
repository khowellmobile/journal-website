import { useState } from "react";

import Tag from "../elements/Tag";

import classes from "./PostE.module.css";

const PostE = () => {
    const [isTagMono, setisTagMono] = useState(true);
    const [content, setContent] = useState();

    const resizeTextarea = (textarea) => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <div className={classes.postCard}>
            <div className={classes.header}>
                <h3>This is a Title</h3>
                <p>Date: 12/17/2024, 2:41:23 PM</p>
            </div>
            <div className={classes.separatorH}></div>
            <div className={classes.content}>
                <textarea
                    className={classes.textarea}
                    placeholder="Type here..."
                    onInput={(e) => resizeTextarea(e.target)}
                ></textarea>
            </div>
            <div className={classes.separatorH}></div>
            <div className={classes.tags}>
                <Tag tagName="correction" />
                <Tag tagName="database" />
                <Tag tagName="example" />
            </div>
        </div>
    );
};

export default PostE;
