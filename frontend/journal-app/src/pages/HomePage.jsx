import classes from "./HomePage.module.css"

import Menu from "../components/sections/Menu"
import Header from "../components/sections/Header"
import Features from "../components/sections/Features"


const HomePage = () => {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.menuContainer}>
                <Menu />
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.headerContainer}>
                    <Header />
                </div>
                <div className={classes.featuresContainer}>
                    <Features />
                </div>
            </div>
        </div>
    );
}

export default HomePage;