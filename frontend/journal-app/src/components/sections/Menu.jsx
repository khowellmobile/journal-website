import classes from "./Menu.module.css";

import MenuLineItem from "../elements/MenuLineItem";

const Menu = () => {
    return (
        <div className={classes.mainContainer}>
            <section className={classes.logoSection}>
                <div className={classes.logo}>
                    <p>H</p>
                </div>
                <div className={classes.seperatorH}></div>
                <p>1099 Tracker</p>
            </section>
            <section className={classes.itemsSection}>
                <MenuLineItem itemName="Example Item" />
            </section>
            <section className={classes.profileSection}></section>
        </div>
    );
};

export default Menu;
