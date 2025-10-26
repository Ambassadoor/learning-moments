import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const PostDetails = ({ currentUser, handleLikeToggle, posts, setTopic }) => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setPost(posts?.find(p => p.id === parseInt(id)) || {})
  }, [posts]);

  return (
    <div
      className="card-container"
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
      {post.id ? (
        <Card
          variant="outlined"
          sx={{
            width: "50%",
            minHeight: "20vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            title={post.title}
            subheader={
              <Box sx={{ display: "flex"}}>
                <Typography>{post.user.name}</Typography>
                <Typography sx={{ marginLeft: "auto" }}>
                  {new Date(post.date).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
            }
          />
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ flexGrow: 1 }}>{post.body}</Typography>
            <CardActions
              sx={{
                mt: "auto",
                p: 0,
                display: "flex",
                width: "100%",
                justifyContent: "space-between"
              }}
            >
            <Box sx={{display: "flex", gap: 1}}>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "transparent",
                  color: "#1976d2",
                  borderColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
                onClick={() => {
                    setTopic(post.topic)
                    navigate("/")
                }}
              >
                {post.topic?.name}
              </Button>
              <IconButton
                aria-label="add to favorites"
                disabled={currentUser.id === undefined}
                onClick={() => {
                  handleLikeToggle(post, currentUser);
                }}
              >
                {post.likedPosts.length ? (
                  <Favorite
                    sx={
                      post.likedPosts.some(
                        (like) => like.userId === currentUser.id,
                      )
                        ? { color: "#EA33F7" }
                        : {}
                    }
                  />
                ) : (
                  <FavoriteBorderIcon />
                )}
                <div>
                  {post.likedPosts.length ? post.likedPosts.length : ""}
                </div>
              </IconButton>
            </Box>
              {currentUser.id === post.userId ? <Button>Edit</Button> : ""}
            </CardActions>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};
