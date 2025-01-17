import { useState } from "react";
import classes from "./TaskItem.module.css";

import TaskDetails from "./TaskDetails";

const PriorityTaskItem = ({ task, handleUpdateTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { priority, title, state, task_lead, Clients } = task;
    const { client_name, contact_first_name, contact_last_name, contact_email } = Clients;

    const handleCloseModal = (updatedTask) => {
        setIsModalOpen(false);
        handleUpdateTask(updatedTask);
    };

    const handleClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && <TaskDetails task={task} handleCloseModal={handleCloseModal} />}

            <div onClick={handleClick} className={`${classes.taskItemContainer} ${classes.priorityTaskGrid}`}>
                <div>
                    <p>{priority}</p>
                </div>
                <div>
                    <p>{title}</p>
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
                    <p>{task_lead}</p>
                </div>
                <div>
                    <p>{state}</p>
                </div>
            </div>
        </>
    );
};

const CompletedTaskItem = ({ task, handleUpdateTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { date_completed, description, Clients } = task;
    const { client_name, contact_first_name, contact_last_name } = Clients;

    const handleCloseModal = (updatedTask) => {
        setIsModalOpen(false);
        handleUpdateTask(updatedTask);
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
