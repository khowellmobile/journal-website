import { useRef, useState } from "react";

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
                    <div className={classes.tool} onClick={handleEditClick}>
                        {isEditing ? <p>✔</p> : <p>Edit</p>}
                    </div>
                    <div className={classes.tool}>
                        <p>x</p>
                    </div>
                </div>
            </div>
            <div className={classes.content}>
                <textarea readOnly={!isEditing} className={classes.textarea} placeholder="Type here..."></textarea>
            </div>
        </div>
    );
};

const NewPostCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const titleInputRef = useRef();
    const textAreaInput = useRef();

    const handleCancelClick = () => {
        setIsModalOpen(false);
    };

    const handleSaveClick = () => {
        console.log(titleInputRef.current.value, textAreaInput.current.value);
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
