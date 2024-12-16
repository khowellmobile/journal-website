import { useEffect, useState } from "react";
import { supabase } from "../components/clients/supabaseClient";
import { useNavigate } from "react-router-dom";

import MainFeed from "../components/sections/MainFeed";

import classes from "./AdminPage.module.css";

const AdminPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) {
                navigate("/");
            } else {
                setUser(user);
            }
        };

        checkUser();
    }, [navigate]);

    return (
        <div className={classes.contentContainer}>
            <h2>Admin</h2>
            <MainFeed />
        </div>
    );
};

export default AdminPage;
