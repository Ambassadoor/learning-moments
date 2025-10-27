import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../../services/postService.js";

export const MyPosts = ({ posts, currentUser, getAndSetPosts }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    setUserPosts(posts.filter((p) => p.userId === currentUser.id));
  }, [posts, currentUser]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "2rem",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      {userPosts.map((post) => (
        <Card
          variant="outlined"
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
          }}
          key={post.id}
        >
          <CardHeader
            title={
              <Box sx={{ display: "flex" }}>
                <Link
                  to={`/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {post.title}
                </Link>
                <Button
                  sx={{
                    marginLeft: "auto",
                  }}
                  onClick={ async () => {
                    await deletePost(post.id)
                    await getAndSetPosts()
                  }}
                >
                  Delete
                </Button>
              </Box>
            }
          />
        </Card>
      ))}
    </Box>
  );
};
