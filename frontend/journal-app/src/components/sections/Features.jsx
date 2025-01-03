import classes from "./Features.module.css";

import PriorityTasks from "../elements/PriorityTasks";

const Features = () => {
    return (
        <div className={classes.featureContainer}>
            <PriorityTasks />
        </div>
    );
};

export default Features;
