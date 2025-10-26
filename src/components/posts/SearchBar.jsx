import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState, useRef} from "react";
import "./SearchBar.css";

export const SearchBar = ({ setSearchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null)
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const handleIconClick = () => {
    inputRef.current?.focus()
    setIsFocused(true);
  };

  return (
    <>
      <TextField
        inputRef={inputRef}
        size="medium"
        placeholder={isFocused ? "Search" : ""}
        className={`search-bar-container search-bar-desktop ${
          isFocused ? 'search-bar-expanded' : 'search-bar-collapsed'
        }`}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Search 
                  onClick={handleIconClick}
                  className="search-icon"
                />
              </InputAdornment>
            ),
          },
        }}
        onChange={(e) => {
          setSearchTerm(e.target.value.toLowerCase());
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></TextField>
    </>
  );
};
