import { NewPostCard, PostCard } from "../elements/PostCard";
import classes from "./MainFeed.module.css";

const MainFeed = () => {
    return (
        <div className={classes.feed}>
            <div className={classes.tools}>
                <NewPostCard />
            </div>
            <div className={classes.posts}>
                <PostCard />
            </div>
        </div>
    );
};

export default MainFeed;
