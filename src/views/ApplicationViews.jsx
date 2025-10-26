import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/posts/AllPosts.jsx"
import { Navbar } from "../components/navbar/Navbar.jsx"
import { useEffect, useState } from "react"
import { getAllPosts } from "../services/postService.js"
import { PostDetails } from "../components/posts/PostDetails.jsx"
import { toggleLike } from "../services/postService.js"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [topic, setTopic] = useState({})

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObject)

        getAllPosts().then(res => setPosts(res))
    }, [])
    

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


    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Navbar setSearchTerm={setSearchTerm} topic={topic} setTopic={setTopic}/>
                    <Outlet/>
                </>
            }>
                <Route index element={<AllPosts posts={posts} currentUser={currentUser} handleLikeToggle={handleLikeToggle} searchTerm={searchTerm} topic={topic} setTopic={setTopic}/>}/>
                <Route path=":id" element={<PostDetails currentUser={currentUser} handleLikeToggle={handleLikeToggle} posts={posts} setTopic={setTopic}/>}/>
            </Route>
        </Routes>
    )
}