import { useEffect, useState } from "react";

import { supabase } from "../clients/supabaseClient";
import PostCard from "../postComponents/PostCard";
import NewPostModal from "../postComponents/NewPostModal";

import classes from "./MainFeed.module.css";
import Tag from "../elements/Tag";

const MainFeed = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [isTagMono, setisTagMono] = useState(true);
    const [tagList, setTagList] = useState([]);

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

    const addTag = (tagName) => {
        setTagList((prevTags) => [...prevTags, tagName]);
    };

    const removeTag = (tagName) => {
        setTagList((prevTags) => prevTags.filter((tag) => tag !== tagName));
    };

    const filteredPosts = tagList.length > 0
        ? loadedPosts.filter((post) =>
              post.post_links.tags.some((tag) => tagList.includes(tag))
          )
        : loadedPosts;

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
                <Tag tagName="ai" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="css" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="correction" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="database" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="example" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="fix" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="github" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="goal" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="idea" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="important" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="improvement" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="javascript" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="problem" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="python" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="question" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="react" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="research" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="solution" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="supabase" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="testing" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
                <Tag tagName="vscode" isMono={isTagMono} addTag={addTag} removeTag={removeTag} />
            </div>
            <div className={classes.posts}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            postId={post.id}
                            title={post.post_title}
                            date={new Date(post.created_at).toLocaleString()}
                            initialContent={post.post_text}
                            removePost={removePost}
                            postTagsList={post.post_links.tags}
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
