import LinksNav from "../components/sections/LinksNav";
import MainFeed from "../components/sections/MainFeed";
import MenuNav from "../components/sections/MenuNav";

import { SeparatorV } from "../components/elements/Separators";

import classes from "./HomePage.module.css"

const HomePage = () => {
    return (
        <div className={classes.contentContainer}>
            <MenuNav />
            <SeparatorV />
            <MainFeed />
            <SeparatorV />
            <LinksNav />
        </div>
    );
}

export default HomePage;
