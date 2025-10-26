import { Link } from "react-router-dom";
import { SearchBar } from "../posts/SearchBar.jsx";
import { TopicSelect } from "../posts/TopicSelect.jsx";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = ({setSearchTerm, topic, setTopic}) => {

  const navigate = useNavigate();


  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          Learning Moments
        </div>

        {/* Navigation Links */}
        <ul className="navbar-nav">
          <li>
            <Link to="/" className="nav-link">
              All Posts
            </Link>
          </li>
          <li>
            <Link to="/new_post" className="nav-link">
              New Post
            </Link>
          </li>
          <li>
            <TopicSelect topic={topic} setTopic={setTopic}/>
          </li>
          <li>
            <SearchBar setSearchTerm={setSearchTerm}/>
          </li>
          {localStorage.getItem("learning_user") ? (
            <li>
              <Link
                to=""
                className="nav-link"
                onClick={() => {
                  localStorage.removeItem("learning_user")
                  navigate("/login", { replace: true})
                }}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
