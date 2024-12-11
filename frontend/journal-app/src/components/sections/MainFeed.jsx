import PostCard from "../elements/PostCard";
import classes from "./MainFeed.module.css";

const MainFeed = () => {
    return (
        <div className={classes.feed}>
            <PostCard />
        </div>
    );
};

export default MainFeed;
