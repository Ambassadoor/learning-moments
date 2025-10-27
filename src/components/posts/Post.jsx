import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Favorite } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export const Post = ({
  post,
  currentUser,
  onLikeToggle,
  onTopicSelect,
  topicFilter,
}) => {
  const navigate = useNavigate();

  return (
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
        title={
          <Link
            to={`/${post.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {post.title}
          </Link>
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
        <CardActions sx={{ mt: "auto", p: 0 }}>
          <Button
            variant={topicFilter ? "contained" : "outlined"}
            onClick={() => onTopicSelect(post.topic)}
            sx={{
              backgroundColor: topicFilter ? "#1976d2" : "transparent",
              color: topicFilter ? "white" : "#1976d2",
              borderColor: "#1976d2",
              "&:hover": {
                backgroundColor: topicFilter ? "#1565c0" : "#f5f5f5",
              },
            }}
          >
            {post.topic.name}
          </Button>
          <IconButton
            aria-label="add to favorites"
            disabled={currentUser.id === undefined}
            onClick={() => {
              onLikeToggle(post, currentUser);
            }}
          >
            {post.likedPosts.length ? (
              <Favorite
                sx={
                  post.likedPosts.some((like) => like.userId === currentUser.id)
                    ? { color: "#EA33F7" }
                    : {}
                }
              />
            ) : (
              <FavoriteBorderIcon />
            )}
            <div>{post.likedPosts.length ? post.likedPosts.length : ""}</div>
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};
