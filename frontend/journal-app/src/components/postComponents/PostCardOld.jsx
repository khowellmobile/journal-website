import { useState, useEffect } from "react";

import { supabase } from "../clients/supabaseClient";
import DeletePostModal from "./DeletePostModal";

import classes from "./PostCard.module.css";

const PostCard = ({ postId, title, date, initialContent, removePost }) => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(initialContent);

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

    return (
        <div className={classes.postCard}>
            <div className={classes.header}>
                <div className={classes.headerText}>
                    <h3>{title}</h3>
                    <p>Date: {date}</p>
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
            <div className={classes.content}>
                <textarea
                    readOnly={!isEditing}
                    className={classes.textarea}
                    placeholder="Type here..."
                    value={content}
                    onChange={handleContentChange}
                ></textarea>
            </div>
        </div>
    );
};

export default PostCard;
