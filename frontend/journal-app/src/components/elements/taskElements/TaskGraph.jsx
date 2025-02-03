import { useState, useEffect } from "react";
import classes from "./TaskGraph.module.css";

const TaskGraph = () => {
    /* Y axis ranges 10, 30, 50, 100 */

    const [graphWidth, setGraphWidth] = useState(45);
    const [graphHeight, setGraphHeight] = useState(20);

    const [xAxisRange, setXAxisRange] = useState(14);
    const [yAxisRange, setYAxisRange] = useState(10);

    const [yTicks, setYTicks] = useState(10); // Denotes number of tick marks. Keep @ 10

    const [numTasksCreated, setNumTasksCreated] = useState(
        new Array(xAxisRange).fill(null).map(() => Math.floor(Math.random() * 10) + 1)
    );
    const [numTasksCompleted, setNumTasksCompleted] = useState(
        new Array(xAxisRange).fill(null).map(() => Math.floor(Math.random() * 10) + 1)
    );

    const [columns, setColumns] = useState(new Array(xAxisRange).fill(null));
    const [rows, setRows] = useState(new Array(yTicks).fill(null));

    const [barHeightUnit, setBarHeightUnit] = useState(0);

    useEffect(() => {
        const determineYStep = () => {
            const maxNum = Math.max(Math.max(...numTasksCreated), Math.max(...numTasksCompleted));

            if (maxNum <= 10) {
                setBarHeightUnit(graphHeight / 10);
            } else if (maxNum <= 30) {
                setBarHeightUnit(graphHeight / 30);
            } else if (maxNum <= 50) {
                setBarHeightUnit(graphHeight / 50);
            } else if (maxNum <= 100) {
                setBarHeightUnit(graphHeight / 100);
            }
        };

        determineYStep();
    }, [numTasksCreated, numTasksCompleted, graphHeight]);

    return (
        <>
            <div className={classes.mainContainer}>
                <section className={classes.header}>
                    <h2>Task Creation & Completion</h2>
                </section>
                <section className={classes.graphContainer}>
                    <div className={classes.yAxis}>
                        <div className={classes.test}>
                            <p>{yAxisRange}</p>
                        </div>
                        {rows.map((rows, index) => (
                            <div key={index} className={classes.yAxisTickBox}>
                                <div>
                                    <p>{yAxisRange - index * (yAxisRange / 10) - yAxisRange / 10}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={classes.graphPlusXAxis}>
                        <div className={classes.graph}>
                            <div className={classes.bars}>
                                {numTasksCreated.map((column, index) => (
                                    <div key={index} className={classes.barContainer}>
                                        <div
                                            className={classes.bar}
                                            style={{ height: `calc(${column * barHeightUnit}rem - 2px)` }}
                                        ></div>
                                        <div
                                            className={classes.bar2}
                                            style={{
                                                height: `calc(${numTasksCompleted[index] * barHeightUnit}rem - 2px)`,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={classes.xAxis}>
                            {columns.map((column, index) => (
                                <div key={index} className={classes.xAxisTickBox}>
                                    <div></div>
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
