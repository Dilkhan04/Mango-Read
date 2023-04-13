import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StylesTextField = styled(TextField)({
  "& fieldset": {
    width: 342,
    height: 56,
  },
  "& .MuiInputBase-root": {
    width: 342,
    height: 51,
    borderRadius: "8px",
    zIndex: 1,
  },
  "& input:focus": {
    caretColor: "#AD02E0",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 8,
      border: "2px solid #878787",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AD02E0",
    },
  },
});
