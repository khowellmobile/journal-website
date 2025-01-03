import classes from "./PriorityTasks.module.css";
import TaskItem from "./TaskItem";

const PriorityTasks = () => {
    return <div className={classes.mainContainer}>
        <section className={classes.tasksHeader}>
            <h2>Priority Tasks</h2>
            <div className={classes.tasksHeaderTools}></div>
        </section>
        <section className={classes.tasksColumnNames}>
            <div><p>Priority</p></div>
            <div><p>Client</p></div>
            <div><p>Email</p></div>
            <div><p>Lead</p></div>
            <div><p>Stage</p></div>
            <div><p>Needed</p></div>
            <div><p>Contacted</p></div>
        </section>
        <section className={classes.tasksItems}>
            <TaskItem 
                priority="1"
                client="Howell Associates"
                lead="KCH"
                stage="IP"
                needed="Contractor Info"
                contacted="1/16/24"
            />
        </section>
    </div>;
};

export default PriorityTasks;
