import classes from "./TaskItem.module.css";

const TaskItem = ({ priority, client, lead, stage, needed, contacted }) => {
    return (
        <div className={classes.taskItemContainer}>
            <div>
                <p>{priority}</p>
            </div>
            <div className={classes.clientInfo}>
                <p>{client}</p>
                <p>John Doe</p>
            </div>
            <div>
                <p>johndoe@gmail.com</p>
            </div>
            <div>
                <p>{lead}</p>
            </div>
            <div>
                <p>{stage}</p>
            </div>
            <div>
                <p>{needed}</p>
            </div>
            <div>
                <p>{contacted}</p>
            </div>
        </div>
    );
};

export default TaskItem;
