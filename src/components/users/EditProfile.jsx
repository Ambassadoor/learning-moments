import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getUserById, updateUser } from "../../services/userService.js"
import { useNavigate, useParams } from "react-router-dom"

export const EditProfile = ({currentUser}) => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        getUserById(currentUser.id).then(res => setUser(res))
    }, [currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateUser(currentUser.id, {name: user.name, cohort: user.cohort})
        navigate(`/profile/${currentUser.id}`)
    }


    return (
        parseInt(id) === currentUser.id &&
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
            <Typography variant="h4" component="h1" gutterBottom>Edit Profile</Typography>
            <TextField
                label="Name"
                fullWidth
                value={user.name || ""}
                onChange={(e) => {
                    setUser(prev => ({...prev, name: e.target.value}))
                }}
            />
            <TextField
                label="Cohort"
                fullWidth
                value={user.cohort || ""}
                onChange={(e) => {
                    setUser(prev => ({...prev, cohort: e.target.value}))
                }}
            />
            <Box
                sx={{display: "flex", gap: 2, justifyContent: "flex-end"}}
            >
                <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={() => {
                        setUser({})
                        navigate(`/profile/${currentUser.id}`)
                    }}
                    >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Update Profile
                </Button>

            </Box>
        </Box>
    )
}