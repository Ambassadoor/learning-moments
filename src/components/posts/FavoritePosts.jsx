import { Box, Card, CardHeader, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Favorite } from "@mui/icons-material";

export const FavoritePosts = ({posts, currentUser, getAndSetPosts, handleLikeToggle}) => {
    const [myFavorites, setMyFavorites] = useState([])

    useEffect(() => {
        const favorites = posts.filter(post => post.likedPosts.some(like => like.userId === currentUser.id))
        setMyFavorites(favorites)
    },[posts, currentUser])

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
            {myFavorites.map((post) => (
             <Card
                variant="outlined"
                sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column"
                }}
                key={post.id}
             >
                <CardHeader
                    title={
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Link
                                to={`/${post.id}`}
                                style={{ textDecoration: "none", color: "inherit"}}                                
                                >
                                {post.title}
                            </Link>
                            <IconButton
                            aria-label="add to favorites"
                            disabled={currentUser.id === undefined}
                            onClick={() => {
                                handleLikeToggle(post, currentUser);
                            }}
                            sx={{marginLeft: "auto"}}
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
                    }
                />
             </Card>   
            ))}
        </Box>
    )
}