import classes from "./TaskItem.module.css";

const TaskItem = ({ task }) => {
    const { priority, state, info_needed, last_contacted, Clients } = task;
    const { client_name, contact_first_name, contact_last_name, contact_email, client_lead } = Clients;

    console.log("client name:", client_name)
    return (
        <div className={classes.taskItemContainer}>
            <div>
                <p>{priority}</p>
            </div>
            <div className={classes.clientInfo}>
                <p>{client_name}</p>
                <p>
                    {contact_first_name} {contact_last_name}
                </p>
            </div>
            <div>
                <p>{contact_email}</p>
            </div>
            <div>
                <p>{client_lead}</p>
            </div>
            <div>
                <p>{state}</p>
            </div>
            <div>
                <p>{info_needed}</p>
            </div>
            <div>
                <p>{last_contacted}</p>
            </div>
        </div>
    );
};

export default TaskItem;
