import { useState, useRef } from "react";

import { supabase } from "../clients/supabaseClient";
import Tag from "../elements/Tag";

import classes from "./NewPostModal.module.css";

const NewPostModal = ({ addNewPost }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tagList, setTagList] = useState([]);

    const titleInputRef = useRef();
    const textAreaInput = useRef();

    const addTag = (tagName) => {
        setTagList((prevTags) => [tagName, ...prevTags]);
    };

    const removeTag = (tagName) => {
        setTagList((prevTags) => prevTags.filter((tag) => tag !== tagName));
    };

    const handleCancelClick = () => {
        setIsModalOpen(false);
    };

    const handleSaveClick = async () => {
        const postTitle = titleInputRef.current.value;
        const postContent = textAreaInput.current.value;
        const isFavorite = false;
        const postLinks = {
            links: [],
            tags: tagList,
        };

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
                        <div className={classes.separatorH}></div>
                        <textarea
                            className={classes.newTextarea}
                            placeholder="Type here..."
                            ref={textAreaInput}
                        ></textarea>
                        <div className={classes.separatorH}></div>
                        <div className={classes.allTags}>
                            <Tag tagName="ai" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="css" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="correction" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="database" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="example" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="fix" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="github" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="goal" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="idea" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="important" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="improvement" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="javascript" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="problem" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="python" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="question" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="react" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="research" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="solution" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="supabase" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="testing" isMono={true} addTag={addTag} removeTag={removeTag} />
                            <Tag tagName="vscode" isMono={true} addTag={addTag} removeTag={removeTag} />
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default NewPostModal;
