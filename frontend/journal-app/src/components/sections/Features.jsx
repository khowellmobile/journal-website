import classes from "./Features.module.css";

import PriorityTasks from "../elements/PriorityTasks";
import RecentTasks from "../elements/RecentTasks";

const Features = () => {
    return (
        <div className={classes.featureContainer}>
            <PriorityTasks />
            <RecentTasks />
        </div>
    );
};

export default Features;
