import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState, useMemo } from "react"
import { getAllTopics } from "../../services/postService.js"
import { useNavigate } from "react-router-dom"
import { createNewPost } from "../../services/postService.js"

export const NewPost = ({currentUser, refresh}) => {
    const [topics, setTopics] = useState([])
    const [post, setPost] = useState({topic: null, title: null, body: null})
    const navigate = useNavigate()

    useEffect(() => {
        getAllTopics().then(res => setTopics(res))
    }, [])

    // Validate form - memoized to avoid recalculating on every render
    const isFormValid = useMemo(() => {
        return (
            post.topic && post.topic.id && // Topic is selected
            post.title && post.title.trim().length > 0 && // Title is not empty
            post.body && post.body.trim().length > 0 // Body is not empty
        );
    }, [post.topic, post.title, post.body]);




    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                maxWidth: 600,
                margin: '0 auto',
                padding: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 2,
                mt: 4
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Create New Post
            </Typography>

            <FormControl fullWidth>
                <InputLabel>Topic</InputLabel>
                <Select 
                    labelId="topic-select-label" 
                    id="topic" 
                    value={post.topic?.id ? post.topic : ""} 
                    label="Topic"
                    onChange={(e) => {
                        setPost(prev => ({...prev, topic: e.target.value}))
                    }}
                >
                    <MenuItem value="">
                        <em>Select a topic...</em>
                    </MenuItem>
                    {topics?.map((topic) => (
                        <MenuItem key={topic.id} value={topic}>
                            {topic.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                id="title"
                label="Title"
                fullWidth
                value={post.title || ""}
                onChange={(e) => {
                    setPost(prev => ({...prev, title: e.target.value}))
                }}
                placeholder="Enter your post title..."
            />

            <TextField
                id="body"
                label="Body"
                fullWidth
                multiline
                minRows={7}
                value={post.body || ""}
                onChange={(e) => {
                    setPost(prev => ({...prev, body: e.target.value}))
                }}
                placeholder="Write your post content here..."
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="secondary" onClick={() => {
                    setPost({topic: null, title: null, body: null})
                navigate("/")
                }}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" disabled={!isFormValid} onClick={async () => {
                    await createNewPost(post, currentUser)
                    await refresh()
                    navigate("/")
                    }}>
                    Create Post
                </Button>
            </Box>
        </Box>
    )
}