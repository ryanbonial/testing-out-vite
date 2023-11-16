import "./App.css";
import { usePosts } from "./posts/usePosts";

function App() {
  const { posts, createPost, deletePost } = usePosts();

  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          await createPost({
            title: `My Title ${new Date().toLocaleTimeString()}`,
            author: "Me",
          });
        }}
      >
        Create Post
      </button>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.author}</p>
          <button type="button" onClick={async () => {
            if (post.id) {
              await deletePost(post.id);
            }
          }}>Delete 🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default App;
