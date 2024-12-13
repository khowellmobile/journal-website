import { useEffect, useState } from "react";

import { supabase } from "../clients/supabaseClient";
import PostCard from "../postComponents/PostCard";
import NewPostModal from "../postComponents/NewPostModal";

import classes from "./MainFeed.module.css";

const MainFeed = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);

    useEffect(() => {
        const checkUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
            }
        };
        checkUser();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase.from("Posts").select();

                if (error) {
                    console.error("Error fetching posts:", error);
                } else {
                    setLoadedPosts(data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const addNewPost = (newPost) => {
        setLoadedPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    const removePost = (postId) => {
        setLoadedPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    };

    if (isLoading) {
        return (
            <section className={classes.loading}>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <div className={classes.feed}>
            <div className={classes.tools}>{user && <NewPostModal addNewPost={addNewPost} />}</div>
            <div className={classes.posts}>
                {loadedPosts.length > 0 ? (
                    loadedPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            postId={post.id}
                            title={post.post_title}
                            date={new Date(post.created_at).toLocaleString()}
                            initialContent={post.post_text}
                            removePost={removePost}
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
