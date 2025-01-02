import classes from "./MenuLineItem.module.css";

import logo from "../../assets/react.svg";

const MenuLineItem = ({ itemName, navPath = null }) => {
    return (
        <div className={classes.mainContainer}>
            <img src={logo} alt="Orange triangle" />
            <p>{itemName}</p>
        </div>
    );
};

export default MenuLineItem;
