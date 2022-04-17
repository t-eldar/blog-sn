import React from "react";
import PostItem from "./PostItem";

const PostList = ({posts}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены
            </h1>
        )
    }

    return (
        <div className="d-flex-column">
            {posts.map(post => 
                <div className="d-flex justify-content-center">     
                    <PostItem key={post.id} post={post}/>
                </div>
            )}
        </div>
    );
}

export default PostList;