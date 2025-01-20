import { useState } from "react";
import classes from "./TaskGraph.module.css";

const TaskGraph = () => {
    const [columns, setColumns] = useState(new Array(14).fill(null).map(() => Math.floor(Math.random() * 10) + 1));
    const [columns2, setColumns2] = useState(new Array(14).fill(null).map(() => Math.floor(Math.random() * 10) + 1));

    const [rows, setRows] = useState(new Array(10).fill(null));

    return (
        <>
            <div className={classes.mainContainer}>
                <section className={classes.header}>
                    
                </section>
                <section className={classes.graphContainer}>
                    <div className={classes.yAxis}>
                        {rows.map((rows, index) => (
                            <div key={index} className={classes.yAxisTickBox}>
                                <div></div>
                            </div>
                        ))}
                    </div>
                    <div className={classes.graph}>
                        <div className={classes.bars}>
                            {columns.map((column, index) => (
                                <div key={index} className={classes.barContainer}>
                                    <div className={classes.bar} style={{ height: `${column * 2}rem` }}></div>
                                    <div className={classes.bar2} style={{ height: `${columns2[index] * 2}rem` }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default TaskGraph;
