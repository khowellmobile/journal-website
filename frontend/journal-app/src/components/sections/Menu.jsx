import classes from "./Menu.module.css";

import MenuLineItem from "../elements/MenuLineItem";

const Menu = () => {
    return (
        <div className={classes.mainContainer}>
            <section className={classes.logoSection}>
                <div className={classes.logo}>
                    <p>H</p>
                </div>
                <div className={classes.seperatorV}></div>
                <p>Dashboard</p>
            </section>
            <section className={classes.itemsSection}>
                <MenuLineItem itemName="Dashboard" />
                <MenuLineItem itemName="Schedule" />
                <MenuLineItem itemName="Tasks" />
                <MenuLineItem itemName="Priority" />
                <MenuLineItem itemName="Clients" />
                <div className={classes.seperatorH}></div>
                <MenuLineItem itemName="Support" />
                <MenuLineItem itemName="Settings" />
            </section>
            {/* <section className={classes.profileSection}>
                <div className={classes.profilePicture}></div>
                <div className={classes.profileInfo}>
                    <p className={classes.profileName}>John Doe</p>
                    <p className={classes.profileDate}>August 3rd, 2024 10:32am</p>
                </div>
            </section> */}
            <MenuLineItem className={classes.logoutItem} itemName="Logout" />
        </div>
    );
};

export default Menu;
