import classes from "./Features.module.css";

import PriorityTasks from "../elements/taskElements/PriorityTasks";
import RecentTasks from "../elements/taskElements/RecentTasks";

const Features = () => {
    return (
        <div className={classes.featureContainer}>
            <div>
                <PriorityTasks />
                <RecentTasks />
            </div>
            <div>

            </div>
        </div>
    );
};

export default Features;
