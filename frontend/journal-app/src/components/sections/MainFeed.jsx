import { useEffect, useState } from "react";
import { NewPostCard, PostCard } from "../elements/PostCard";
import { supabase } from "../clients/supabaseClient";
import classes from "./MainFeed.module.css";

const MainFeed = () => {
    const [loadedPosts, setLoadedPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase.from("Posts").select();

                if (error) {
                    console.error("Error fetching posts:", error);
                } else {
                    console.log("Posts fetched successfully:", data);
                    setLoadedPosts(data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className={classes.feed}>
          <div className={classes.tools}>
            <NewPostCard />
          </div>
          <div className={classes.posts}>
            {loadedPosts.length > 0 ? (
              loadedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.post_title}
                  date={new Date(post.created_at).toLocaleString()}
                  initialContent={post.post_text}
                />
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      );
};

export default MainFeed;
