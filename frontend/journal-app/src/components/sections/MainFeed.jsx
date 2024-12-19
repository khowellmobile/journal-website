import { useEffect, useState } from "react";

import { supabase } from "../clients/supabaseClient";
import PostCard from "../postComponents/PostCard";
import NewPostModal from "../postComponents/NewPostModal";

import classes from "./MainFeed.module.css";
import PostE from "../postComponents/PostE";
import Tag from "../elements/Tag";

const MainFeed = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [isTagMono, setisTagMono] = useState(true);

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
            <div className={classes.allTags}>
                <Tag tagName="ai" isMono={isTagMono}/>
                <Tag tagName="css" isMono={isTagMono}/>
                <Tag tagName="correction" isMono={isTagMono}/>
                <Tag tagName="database" isMono={isTagMono}/>
                <Tag tagName="example" isMono={isTagMono}/>
                <Tag tagName="fix" isMono={isTagMono}/>
                <Tag tagName="github" isMono={isTagMono}/>
                <Tag tagName="goal" isMono={isTagMono}/>
                <Tag tagName="idea" isMono={isTagMono}/>
                <Tag tagName="important" isMono={isTagMono}/>
                <Tag tagName="improvement" isMono={isTagMono}/>
                <Tag tagName="javascript" isMono={isTagMono}/>
                <Tag tagName="problem" isMono={isTagMono}/>
                <Tag tagName="python" isMono={isTagMono}/>
                <Tag tagName="question" isMono={isTagMono}/>
                <Tag tagName="react" isMono={isTagMono}/>
                <Tag tagName="research" isMono={isTagMono}/>
                <Tag tagName="solution" isMono={isTagMono}/>
                <Tag tagName="supabase" isMono={isTagMono}/>
                <Tag tagName="testing" isMono={isTagMono}/>
                <Tag tagName="vscode" isMono={isTagMono}/>
            </div>
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
                <PostE />
            </div>
        </div>
    );
};

export default MainFeed;
