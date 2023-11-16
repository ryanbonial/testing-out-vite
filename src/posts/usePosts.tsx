import { useCallback, useEffect, useState } from "react";
import { Post } from "./Post";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  const createPost = async (post: Post) => {
    const postResp = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const postJson: Post = await postResp.json();
    setPosts((posts) => [...posts, postJson]);
    return postJson;
  };

  const updatePost = async (post: Post) => {
    const postResp = await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const postJson: Post = await postResp.json();
    setPosts((posts) =>
      posts.map((p) => (p.id === postJson.id ? postJson : p))
    );
    return postJson;
  };

  const deletePost = async (postId: number) => {
    const postResp = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
    });
    await postResp.json();
    setPosts((posts) => posts.filter((p) => p.id !== postId));
    return;
  };

  const fetchPosts = useCallback(async () => {
    const postResp = await fetch("http://localhost:3000/posts");
    const postJson = await postResp.json();
    setPosts(postJson);
    return postJson;
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, createPost, updatePost, deletePost };
}
