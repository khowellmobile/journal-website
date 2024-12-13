import { useRef, useState } from "react";

import classes from "./PostCard.module.css";

const PostCard = ({ postId, title, date, initialContent }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(initialContent);

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
        <div className={classes.card}>
            <div className={classes.header}>
                <div className={classes.headerText}>
                    <h3>{title}</h3>
                    <p>Date: {date}</p>
                </div>
                <div className={classes.headerTools}>
                    <div className={classes.tool} onClick={handleEditClick}>
                        {isEditing ? <p>✔</p> : <p>Edit</p>}
                    </div>
                    <div className={classes.tool}>
                        <p>x</p>
                    </div>
                </div>
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

import { supabase } from "../clients/supabaseClient";

const NewPostCard = ({ addNewPost }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const titleInputRef = useRef();
    const textAreaInput = useRef();

    const handleCancelClick = () => {
        setIsModalOpen(false);
    };

    const handleSaveClick = async () => {
        const postTitle = titleInputRef.current.value;
        const postContent = textAreaInput.current.value;
        const isFavorite = false;
        const postLinks = {};

        const { data, error } = await supabase
            .from("Posts")
            .insert([
                {
                    post_title: postTitle,
                    post_text: postContent,
                    is_favorite: isFavorite,
                    post_links: postLinks,
                },
            ])
            .select();

        addNewPost(data[0]);

        if (error) {
            console.error("Error saving post:", error);
        } else {
            console.log("Post saved successfully:", data);

            titleInputRef.current.value = "";
            textAreaInput.current.value = "";

            alert("Post saved successfully!");
        }

        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className={classes.openModalButton}>
                New Post
            </button>

            {/* Conditional logic to control overlay. Right side wont eval if left side false */}
            {isModalOpen && (
                <div className={classes.modalOverlay}>
                    <form className={classes.newCard}>
                        <div className={classes.newHeader}>
                            <div className={classes.newHeaderInput}>
                                <input type="text" placeholder="Title" ref={titleInputRef} />
                            </div>
                            <div className={classes.newHeaderTools}>
                                <button type="button" className={classes.postButton} onClick={handleCancelClick}>
                                    Cancel
                                </button>
                                <button type="button" className={classes.postButton} onClick={handleSaveClick}>
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className={classes.textareaContainer}>
                            <textarea
                                className={classes.newTextarea}
                                placeholder="Type here..."
                                ref={textAreaInput}
                            ></textarea>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export { PostCard, NewPostCard };
