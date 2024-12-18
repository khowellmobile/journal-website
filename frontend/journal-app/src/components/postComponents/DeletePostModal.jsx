import { useState } from "react";

import { supabase } from "../clients/supabaseClient";

import classes from "./DeletePostModal.module.css";

const DeletePostModal = ({ postId, removePost }) => {
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

export default DeletePostModal;
