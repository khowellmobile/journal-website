import classes from "./NewTask.module.css";

const NewTask = ({handleCloseModal}) => {
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.newTaskContainer}>
                <h1 onClick={handleCloseModal}>Hello</h1>
            </div>
        </div>
    );
};

export default NewTask;
