import LoginCard from "../components/elements/LoginCard";
import MainFeed from "../components/sections/MainFeed";

import classes from "./HomePage.module.css"

const HomePage = () => {
    return (
        <div className={classes.contentContainer}>
            <LoginCard />
            <MainFeed />
        </div>
    );
}

export default HomePage;