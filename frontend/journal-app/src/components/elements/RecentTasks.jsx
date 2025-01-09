import classes from "./RecentTasks.module.css";

const RecentTasks = () => {
    return (
        <div className={classes.mainContainer}>
            <section className={classes.header}>
                <h2>Recently Completed</h2>
                <div className={classes.headerTools}></div>
            </section>
            <section className={classes.columnNames}>
                <div>
                    <p>Client</p>
                </div>
                <div>
                    <p>Description</p>
                </div>
                <div>
                    <p>Completed</p>
                </div>
            </section>
            <section className={classes.items}></section>
        </div>
    );
};

export default RecentTasks;
