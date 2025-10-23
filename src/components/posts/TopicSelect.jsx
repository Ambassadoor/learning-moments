import { useEffect, useState } from "react"
import { getAllTopics } from "../../services/postService.js"
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export const TopicSelect = ({setTopic, topic}) => {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getAllTopics().then(res => setTopics(res))
    }, [])


    return (
        <>
                <Select
                    labelId="topic-select-label"
                    id="topic-select"
                    label="Topics"
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        if (selectedValue === "") {
                            setTopic({}); // Clear selection
                        } else {
                            setTopic(selectedValue);
                        }
                    }}
                    value={topic?.id ? topics.find(t => t.id === topic.id) || topic : ""}
                    autoWidth
                    displayEmpty
                    size="small"
                    sx={{ minWidth: 120 }}
                    variant="filled"
                >
                    <MenuItem value="">
                        <em>All Topics</em>
                    </MenuItem>
                    {topics?.map(t => (
                        <MenuItem key={t.id} value={t} selected={t.id === topic?.id}>
                            {t.name}
                        </MenuItem>
                    ))}
                </Select>
        </>
    )
}