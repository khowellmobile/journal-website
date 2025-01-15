import { useState } from "react";
import classes from "./TaskItem.module.css";

const TaskDetails = ({ task, handleCloseModal }) => {
    const [taskState, setTaskState] = useState("Ready for Review");
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDropDownClick = (value) => {
        setTaskState(value);
        setIsExpanded(false);
    };

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.detailContainer}>
                <section className={classes.header}>
                    <div className={classes.priority}>
                        <h1>1</h1>
                    </div>
                    <div className={classes.headerInfo}>
                        <h2>Task Title</h2>
                        <p>Created at: January 14, 2025 at 8:30 AM</p>
                    </div>
                    <div className={classes.headerTools}>
                        <button>Complete</button>
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </section>
                <div className={classes.seperatorH}></div>
                <section className={classes.body}>
                    <div className={classes.bodyHeader}>
                        <div className={classes.clientInfo}>
                            <p>Howell Associates</p>
                            <p>Kent Howell</p>
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
                    <div className={classes.taskDescription}></div>
                </section>
            </div>
        </div>
    );
};

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
