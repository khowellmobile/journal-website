import { useState } from "react";
import classes from "./TaskGraph.module.css";

const TaskGraph = () => {
    const [columns, setColumns] = useState(new Array(31).fill(null).map(() => Math.floor(Math.random() * 10) + 1));
    const [columns2, setColumns2] = useState(new Array(31).fill(null).map(() => Math.floor(Math.random() * 10) + 1));

    return (
        <>
            <div className={classes.graphContainer}>
                <div className={classes.graph}>
                    <div className={classes.bars}>
                        {columns.map((column, index) => (
                            <div key={index} className={classes.barContainer}>
                                <div className={classes.bar} style={{ height: `${column}rem` }}></div>
                                <div className={classes.bar2} style={{ height: `${columns2[index]}rem` }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskGraph;
