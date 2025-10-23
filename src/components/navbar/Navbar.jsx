import { getAllPosts } from "../../services/postService.js";
import { AllPosts } from "../posts/AllPosts.jsx";
import { SearchBar } from "../posts/SearchBar.jsx";
import { TopicSelect } from "../posts/TopicSelect.jsx";
import { LoginOutButton } from "../users/LoginOutButton.jsx";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [allPosts, setAllPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTopic, setCurrentTopic] = useState({});

  useEffect(() => {
    getAllPosts().then((res) => setAllPosts(res));
  }, []);


  return (
    <><div style={{display: "flex", flexDirection: "row", gap: "2rem", justifyContent: "flex-end", padding: "1rem"}}>
        <LoginOutButton
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        ></LoginOutButton>
        <SearchBar setSearchTerm={setSearchTerm}></SearchBar>
        <TopicSelect setTopic={setCurrentTopic} topic={currentTopic}></TopicSelect>
    </div>
      <AllPosts
        currentUser={currentUser}
        posts={allPosts}
        setPosts={setAllPosts}
        searchTerm={searchTerm}
        topic={currentTopic}
        setTopic={setCurrentTopic}
      ></AllPosts>
    </>
  );
};
