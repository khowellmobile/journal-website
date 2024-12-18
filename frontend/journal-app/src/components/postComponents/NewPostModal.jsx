import { useState, useRef } from "react";

import { supabase } from "../clients/supabaseClient";

import classes from "./NewPostModal.module.css";

const NewPostModal = ({ addNewPost }) => {
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
                                <button type="button" onClick={handleCancelClick}>
                                    Cancel
                                </button>
                                <button type="button" onClick={handleSaveClick}>
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

export default NewPostModal;
