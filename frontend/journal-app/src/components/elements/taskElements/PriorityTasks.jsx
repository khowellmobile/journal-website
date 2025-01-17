import { useState, useEffect } from "react";

import classes from "./PriorityTasks.module.css";
import { PriorityTaskItem } from "./TaskItem";

import { supabase } from "../../clients/supabaseClient";

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
                    created_at,
                    priority,
                    state,
                    notes,
                    title,
                    client_id,
                    task_lead,
                    description,
                    Clients (
                        client_name,
                        contact_first_name,
                        contact_last_name,
                        contact_email
                    )
                    `
                    )
                    .eq("is_completed", false)
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

    const handleUpdateTask = async (updatedTask) => {
        const taskIndex = loadedTasks.findIndex((task) => task.id === updatedTask.id);

        if (taskIndex !== -1) {
            // Only updates task in loadedTasks if it still is completed
            const updatedTasks =
                updatedTask.state == "Completed"
                    ? loadedTasks.filter((task) => task.id !== updatedTask.id)
                    : [...loadedTasks];

            if (updatedTask.state !== "Completed") {
                updatedTasks[taskIndex] = updatedTask;
            }

            setLoadedTasks(updatedTasks);

            try {
                const { data, error } = await supabase
                    .from("Tasks")
                    .update({
                        description: updatedTask.description,
                        state: updatedTask.state,
                        notes: updatedTask.notes,
                        is_completed: updatedTask.state == "Completed" ? true : false,
                    })
                    .eq("id", updatedTask.id);

                if (error) {
                    console.error("Error updating task:", error);
                }
            } catch (error) {
                console.error("Error updating task in the database:", error);
            }
        }
    };

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
                    <p>Title</p>
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
            </section>
            <section className={classes.tasksItems}>
                {loadedTasks.length > 0 ? (
                    loadedTasks.map((task) => {
                        return <PriorityTaskItem key={task.id} task={task} handleUpdateTask={handleUpdateTask}/>;
                    })
                ) : (
                    <p>No Tasks Available</p>
                )}
            </section>
        </div>
    );
};

export default PriorityTasks;
