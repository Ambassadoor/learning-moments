import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllTopics, getPostById, editPost } from "../../services/postService.js"

export const EditPost = ({posts}) => {
    const [post, setPost] = useState({})
    const [topics, setTopics] = useState([])

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getPostById(parseInt(id)).then(res => setPost(res))
    }, [posts, id])

    useEffect(() => {
        getAllTopics().then(res => setTopics(res))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await editPost(post)
        navigate("/my_posts")
    }

    return (
        post.id &&
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
                Edit Post
            </Typography>
            
            <TextField 
                label="Title"
                fullWidth
                value={post.title || ""}
                onChange={(e) => {
                    setPost(prev => ({...prev, title: e.target.value}))
                }}
            />
            
            <TextField 
                label="Body"
                fullWidth
                multiline
                minRows={7}
                value={post.body || ""}
                onChange={(e) => {
                    setPost(prev => ({...prev, body: e.target.value}))
                }}
            />
            
            <FormControl fullWidth>
                <InputLabel>Topic</InputLabel>
                <Select
                    value={post.topic?.id ? topics.find(t => t.id === post.topic.id) || "" : ""}
                    label="Topic"
                    onChange={(e) => {
                        setPost((prev) => ({...prev, topic: e.target.value}))
                    }}
                >
                    <MenuItem value="">
                        <em>Select a topic...</em>
                    </MenuItem>
                    {topics?.map((topic) => (
                        <MenuItem key={topic.id} value={topic}>{topic.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="secondary" onClick={() => {
                    setPost({})
                    navigate("/my_posts")
                    }}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Update Post
                </Button>
            </Box>
        </Box>
    )
}