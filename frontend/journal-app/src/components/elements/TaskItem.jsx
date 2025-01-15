import { useState } from "react";
import classes from "./TaskItem.module.css";

import TaskDetails from "./TaskDetails";

const PriorityTaskItem = ({ task }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { priority, state, info_needed, last_contacted, Clients } = task;
    const { client_name, contact_first_name, contact_last_name, contact_email, client_lead } = Clients;

    return (
        <div className={`${classes.taskItemContainer} ${classes.priorityTaskGrid}`}>
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

const CompletedTaskItem = ({ task }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { date_completed, description, Clients } = task;
    const { client_name, contact_first_name, contact_last_name } = Clients;

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && <TaskDetails task={task} handleCloseModal={handleCloseModal} />}

            <div onClick={handleClick} className={`${classes.taskItemContainer} ${classes.completedTaskGrid}`}>
                <div className={classes.clientInfo}>
                    <p>{client_name}</p>
                    <p>
                        {contact_first_name} {contact_last_name}
                    </p>
                </div>
                <div>
                    <p>{description}</p>
                </div>
                <div>
                    <p>{date_completed}</p>
                </div>
            </div>
        </>
    );
};

export { PriorityTaskItem, CompletedTaskItem };
