import { useEffect, useState } from "react";
import { toggleLike } from "../../services/postService.js";
import { Post } from "./Post.jsx";

export const AllPosts = ({
  currentUser,
  posts,
  setPosts,
  searchTerm,
  topic,
  setTopic,
}) => {
  const [topicFilter, setTopicFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState(false);

  /**
   * Updated allPosts to add or delete a likedPost object
   * @param {*} post The current post object
   * @param {*} currentUser The current user object
   */
  const handleLikeToggle = async (post, currentUser) => {
    const result = await toggleLike(post, currentUser);

    const del = post.likedPosts.find((l) => l.id === result.id) !== undefined;
    const updatedLikes = del
      ? post.likedPosts.filter((l) => l.id !== result.id)
      : [...post.likedPosts, result];

    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id ? { ...p, likedPosts: updatedLikes } : p,
      ),
    );
  };

/**
 * Sets/resets topic
 * @param {*} t Selected topic
 */
  const handleSelectTopic = (t) => {
    if (topic.id !== t.id) {
      setTopic(t);
    } else {
      setTopic({});
    }
  };

  useEffect(() => {
    if (topic.id !== undefined) {
      setTopicFilter(true);
    } else {
      setTopicFilter(false);
    }

    if (searchTerm !== "") {
      setSearchFilter(true);
    } else {
      setSearchFilter(false);
    }
  }, [searchTerm, topic]);

  return (
    <div
      className="posts"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "2rem",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      {posts
        ?.filter((post) => {
          if (searchFilter && !post.body?.toLowerCase().includes(searchTerm))
            return false;
          if (topicFilter && post.topic.id !== topic.id) return false;
          return true;
        })
        .map((post) => (
          <Post
            post={post}
            key={post.id}
            currentUser={currentUser}
            onLikeToggle={handleLikeToggle}
            onTopicSelect={handleSelectTopic}
            topicFilter={topicFilter}
          />
        ))}
    </div>
  );
};
