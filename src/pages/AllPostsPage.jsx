import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import PostList from "../components/PostList";
import PostService from "../api/PostService";


const AllPostsPage = () => {
    const [posts, setPosts] = useState([]);

    const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
        const response = await PostService.getAll();
        setPosts(response.data)
    });
    useEffect(() => {
        const fetchAPI = async () => {
            await fetchPosts();
        }
        fetchAPI();
    }, []);

    return (
        <PostList posts={posts}/>
    );
}

export default AllPostsPage;