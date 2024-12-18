import { useRef, useState, useEffect } from "react";
import { supabase } from "../clients/supabaseClient";

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
                        <DeletePostCard postId={postId} removePost={removePost} />
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
                            <input type="text" className={classes.titleInput} placeholder="Title" ref={titleInputRef} />
                            <div className={classes.newHeaderTools}>
                                <button type="button" className={classes.postButton} onClick={handleCancelClick}>
                                    Cancel
                                </button>
                                <button type="button" className={classes.postButton} onClick={handleSaveClick}>
                                    Save
                                </button>
                            </div>
                        </div>
                        <textarea
                            className={classes.newTextarea}
                            placeholder="Type here..."
                            ref={textAreaInput}
                        ></textarea>
                    </form>
                </div>
            )}
        </>
    );
};

const DeletePostCard = ({ postId, removePost }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancelDeleteClick = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDeleteClick = async () => {
        const { data, error } = await supabase.from("Posts").delete().eq("id", postId);

        if (error) {
            console.error("Error deleting post:", error);
        } else {
            removePost(postId);
        }

        setIsModalOpen(false);
    };

    return (
        <>
            <p onClick={() => setIsModalOpen(true)} className={classes.tool}>
                x
            </p>

            {/* Conditional logic to control overlay. Right side wont eval if left side false */}
            {isModalOpen && (
                <div className={classes.modalOverlay}>
                    <div className={classes.deleteCard}>
                        <p>Are you sure?</p>
                        <div>
                            <button onClick={handleCancelDeleteClick}>Cancel</button>
                            <button onClick={handleConfirmDeleteClick}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export { PostCard, NewPostCard };
