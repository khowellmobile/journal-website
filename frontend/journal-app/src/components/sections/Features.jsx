import classes from "./Features.module.css";

import PriorityTasks from "../elements/taskElements/PriorityTasks";
import RecentTasks from "../elements/taskElements/RecentTasks";
import TaskGraph from "../elements/taskElements/taskGraph";

const Features = () => {
    return (
        <div className={classes.featureContainer}>
            <div>
                <PriorityTasks />
                <RecentTasks />
            </div>
            <div>
                <TaskGraph />
            </div>
        </div>
    );
};

export default Features;
