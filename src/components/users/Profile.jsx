import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserById } from "../../services/userService.js"
import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material"

export const Profile = ({currentUser}) => {
    const [profile, setProfile] = useState({})
    const {id} = useParams()

    useEffect(() => {
        getUserById(parseInt(id)).then(res => setProfile(res))
    }, [currentUser])


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
            <Card
                variant="outlined"
                sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                }}
          >
                <CardHeader title={
                    <Box sx={{display: "flex"}}>
                        <>
                            {profile.name}
                        </>
                        {profile.id === currentUser.id && <Button sx={{marginLeft: "auto"}}>Edit</Button>}

                    </Box>
                    }/>
                <CardContent>
                    <Typography>Cohort: {profile.cohort}</Typography>
                    <Typography>Number of Posts: {profile.posts?.length}</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}