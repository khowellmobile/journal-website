import { useEffect, useState, useRef } from "react";

import Tag from "../elements/Tag";
import DeletePostModal from "./DeletePostModal";
import { supabase } from "../clients/supabaseClient";

import classes from "./PostCard.module.css";

const PostCard = ({ postId, title, date, initialContent, removePost, postTagsList = null }) => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(initialContent);
    const [postTags, setPostTags] = useState(postTagsList);

    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            resizeTextarea(textareaRef.current);
        }
    }, [initialContent]);

    useEffect(() => {
        const textarea = document.querySelector(`.${classes.textarea}`);
        if (textarea) {
            resizeTextarea(textarea);
        }

        const handleResize = () => {
            const textarea = document.querySelector(`.${classes.textarea}`);
            if (textarea) {
                resizeTextarea(textarea);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [content]);

    useEffect(() => {
        const checkUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
            }
        };
        checkUser();
    }, []);

    const handleContentUpdate = async () => {
        if (content !== initialContent) {
            const { data, error } = await supabase.from("Posts").update({ post_text: content }).eq("id", postId);
            if (error) {
                console.error("Error saving post:", error);
            } else {
                console.log("Post updated successfully:", data);
            }
        }
    };

    const handleEditClick = () => {
        if (isEditing) {
            handleContentUpdate();
        }

        setIsEditing(!isEditing);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const resizeTextarea = (textarea) => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <div className={classes.postCard}>
            <div className={classes.header}>
                <div className={classes.headerText}>
                    <h3>{title}</h3>
                    <p>{date}</p>
                </div>
                {/* Conditional rendering of tools */}
                {user && (
                    <div className={classes.headerTools}>
                        <div className={classes.tool} onClick={handleEditClick}>
                            {isEditing ? <p>✔</p> : <p>Edit</p>}
                        </div>
                        <DeletePostModal postId={postId} removePost={removePost} />
                    </div>
                )}
            </div>
            <div className={classes.separatorH}></div>
            <div className={classes.content}>
                <textarea
                    ref={textareaRef}
                    readOnly={!isEditing}
                    className={classes.textarea}
                    placeholder="Type here..."
                    value={content}
                    onChange={handleContentChange}
                    onInput={(e) => resizeTextarea(e.target)}
                ></textarea>
            </div>
            <div className={classes.separatorH}></div>
            <div className={classes.tags}>
                {postTags.map((tag) => (
                    <Tag key={tag} tagName={tag} lockInitialState={true} />
                ))}
            </div>
        </div>
    );
};

export default PostCard;
