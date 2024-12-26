import classes from "./Separators.module.css";

const SeparatorV = () => {
    return (
        <div className={classes.seperatorVWrapper}>
            <div className={classes.seperatorV}></div>
        </div>
    );
};

const SeparatorH = () => {
    return (
        <div className={classes.seperatorHWrapper}>
            <div className={classes.seperatorH}></div>
        </div>
    );
};

export { SeparatorV, SeparatorH };
