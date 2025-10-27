import { useEffect, useState } from "react";
import { getAllTopics } from "../../services/postService.js";
import { MenuItem, Select } from "@mui/material";
import "./TopicSelect.css";

export const TopicSelect = ({ topic, setTopic }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics().then((res) => setTopics(res));
  }, []);

  return (
    <>
      <Select
        labelId="topic-select-label"
        id="topic-select"
        label="Topics"
        className="topic-select-container"
        onChange={(e) => {
          const selectedValue = e.target.value;
          if (selectedValue === "") {
            setTopic({}); // Clear selection
          } else {
            setTopic(selectedValue);
          }
        }}
        value={topic?.id ? topics.find((t) => t.id === topic.id) || topic : ""}
        autoWidth
        displayEmpty
        size="small"
        variant="outlined"
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
        }}
      >
        <MenuItem value="" className="topic-menu-item">
          <em>All Topics</em>
        </MenuItem>
        {topics?.map((t) => (
          <MenuItem
            key={t.id}
            value={t}
            selected={t.id === topic?.id}
            className="topic-menu-item"
          >
            {t.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
