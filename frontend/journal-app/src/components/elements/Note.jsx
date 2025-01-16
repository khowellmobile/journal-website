import classes from "./Note.module.css";

const Note = ({ user, text, date, handleNoteDelete }) => {
    const dateObj = new Date(date);

    return (
        <div className={classes.noteContainer}>
            <p className={classes.noteText}>{text}</p>
            <div className={classes.noteInfo}>
                <p onClick={handleNoteDelete(date)}>Delete</p>
                <p>
                    {user} {dateObj.toLocaleDateString("en-US")}
                </p>
            </div>
        </div>
    );
};

export default Note;
