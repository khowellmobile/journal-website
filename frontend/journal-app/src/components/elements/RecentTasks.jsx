import { useState, useEffect } from "react";

import { supabase } from "../clients/supabaseClient";

import classes from "./RecentTasks.module.css";

const RecentTasks = () => {
    const [loadedTasks, setLoadedTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data, error } = await supabase
                    .from("Tasks")
                    .select(
                        `
                        id,
                        client_id,
                        Clients (
                            client_name,
                            contact_first_name,
                            contact_last_name
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
            <section className={classes.header}>
                <h2>Recently Completed</h2>
                <div className={classes.headerTools}></div>
            </section>
            <section className={classes.columnNames}>
                <div>
                    <p>Client</p>
                </div>
                <div>
                    <p>Description</p>
                </div>
                <div>
                    <p>Completed</p>
                </div>
            </section>
            <section className={classes.items}></section>
        </div>
    );
};

export default RecentTasks;
