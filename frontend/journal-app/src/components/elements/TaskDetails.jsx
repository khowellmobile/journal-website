import { useState, useRef } from "react";

import { supabase } from "../clients/supabaseClient";

import classes from "./TaskDetails.module.css";

const TaskDetails = ({ task, handleCloseModal }) => {
    const { id, created_at, priority, state, notes, title, client_id, date_completed, description, Clients } = task;

    const { client_name, contact_first_name, contact_last_name } = Clients;

    const [taskState, setTaskState] = useState(state);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [descriptionContent, setDescriptionContent] = useState(description);
    const [newNoteContent, setNewNoteContent] = useState(null);

    const descriptionRef = useRef(null);
    const noteRef = useRef(null);

    const handleDropDownClick = (value) => {
        setTaskState(value);
        setIsExpanded(false);
    };

    const handleDescContentChange = (event) => {
        setDescriptionContent(event.target.value);
    };

    const handleNoteContentChange = (event) => {
        setNewNoteContent(event.target.value);
    };

    const handleNewNoteSave = () => {
        setIsAddingNote(false);
    };

    const handleCloseDetails = () => {
        const updatedTask = { 
            ...task, 
            state: taskState, 
            description: descriptionContent,
            notes: notes,
        };

        handleCloseModal(updatedTask);
    }

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.detailContainer}>
                <section className={classes.header}>
                    <div className={classes.priority}>
                        <h1>{priority}</h1>
                    </div>
                    <div className={classes.headerInfo}>
                        <h2>{title}</h2>
                        <p>Created at: January 14, 2025 at 8:30 AM</p>
                    </div>
                    <div className={classes.headerTools}>
                        <button onClick={handleCloseDetails}>Close</button>
                    </div>
                </section>
                <div className={classes.seperatorH}></div>
                <section className={classes.body}>
                    <div className={classes.bodyHeader}>
                        <div className={classes.clientInfo}>
                            <p>{client_name}</p>
                            <p>
                                {contact_first_name} {contact_last_name}
                            </p>
                        </div>
                        <div className={classes.taskState}>
                            <div>
                                <p>{taskState}</p>
                            </div>
                            <div onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}>
                                <p>{isExpanded ? "△" : "▽"}</p>
                            </div>
                            {isExpanded && (
                                <div className={classes.dropDown}>
                                    <div className={classes.dropDownContent}>
                                        <span onClick={() => handleDropDownClick("Waiting")}>Waiting</span>
                                        <span onClick={() => handleDropDownClick("In Progress")}>In Progress</span>
                                        <span onClick={() => handleDropDownClick("Ready for Review")}>
                                            Ready for Review
                                        </span>
                                        <span onClick={() => handleDropDownClick("Completed")}>Completed</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={classes.taskDescription}>
                        <div className={classes.toolbar}>
                            <p>Description:</p>
                            <span onClick={() => setIsEditing((prevIsEditing) => !prevIsEditing)}>
                                {isEditing ? "Save" : "Edit"}
                            </span>
                        </div>
                        <textarea
                            className={classes.descriptionTextarea}
                            ref={descriptionRef}
                            readOnly={!isEditing}
                            placeholder="Type Here..."
                            value={descriptionContent}
                            onChange={handleDescContentChange}
                        ></textarea>
                    </div>
                    <div className={classes.taskNotes}>
                        <div className={classes.toolbar}>
                            <p>Notes:</p>
                            <span onClick={() => setIsAddingNote(true)}>New Note</span>
                        </div>
                        <div className={classes.noteListing}></div>
                        {isAddingNote && (
                            <div className={classes.newNoteBox}>
                                <span>
                                    <p>New Note</p> <button onClick={handleNewNoteSave}>Save</button>
                                </span>
                                <textarea
                                    className={classes.newNoteTextarea}
                                    ref={noteRef}
                                    value={newNoteContent}
                                    onChange={handleNoteContentChange}
                                ></textarea>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TaskDetails;
