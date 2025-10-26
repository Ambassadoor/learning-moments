import { useEffect, useState } from "react";
import { Post } from "./Post.jsx";

export const AllPosts = ({posts, currentUser, handleLikeToggle, searchTerm, topic, setTopic}) => {
  const [topicFilter, setTopicFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState(false);


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
