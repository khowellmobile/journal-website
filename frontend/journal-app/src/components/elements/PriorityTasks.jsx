import { useState, useEffect } from "react";

import classes from "./PriorityTasks.module.css";
import TaskItem from "./TaskItem";

import { supabase } from "../clients/supabaseClient";

const PriorityTasks = () => {
    const [loadedTasks, setLoadedTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data, error } = await supabase
                    .from("Tasks")
                    .select(
                        `
                    id,
                    priority,
                    client_id,
                    state,
                    info_needed,
                    last_contacted,
                    Clients (
                        client_name,
                        contact_first_name,
                        contact_last_name,
                        contact_email,
                        client_lead
                    )
                    `
                    )
                    .order("priority", { ascending: true });

                if (error) {
                    console.error("Supabase error fetching tasks:", error);
                } else {
                    setLoadedTasks(data);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        console.log(loadedTasks);
    }, [loadedTasks]);

    return (
        <div className={classes.mainContainer}>
            <section className={classes.tasksHeader}>
                <h2>Priority Tasks</h2>
                <div className={classes.tasksHeaderTools}></div>
            </section>
            <section className={classes.tasksColumnNames}>
                <div>
                    <p>Priority</p>
                </div>
                <div>
                    <p>Client</p>
                </div>
                <div>
                    <p>Email</p>
                </div>
                <div>
                    <p>Lead</p>
                </div>
                <div>
                    <p>Stage</p>
                </div>
                <div>
                    <p>Needed</p>
                </div>
                <div>
                    <p>Contacted</p>
                </div>
            </section>
            <section className={classes.tasksItems}>
                {loadedTasks.length > 0 ? (
                    loadedTasks.map((task) => {
                        return <TaskItem key={task.id} task={task} />;
                    })
                ) : (
                    <p>No Tasks Available</p>
                )}
            </section>
        </div>
    );
};

export default PriorityTasks;
