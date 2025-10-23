import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState, useRef} from "react";

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
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Search 
                  onClick={handleIconClick}
                  sx={{ cursor: 'pointer' }}
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
        sx={{
            width: isFocused ? { xs: 250, sm: 350 } : { xs: 50, sm: 75 },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:focus-within': {
            transform: 'scale(1.02)'
            }
        }}
      ></TextField>
    </>
  );
};
