import MainFeed from "../components/sections/MainFeed";

import classes from "./AdminPage.module.css";

const AdminPage = () => {

    return (
        <div className={classes.contentContainer}>
            <h2>Admin</h2>
            <MainFeed />
        </div>
    );
};

export default AdminPage;
