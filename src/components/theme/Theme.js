import styled from "@emotion/styled";
import { TextField, Pagination, createTheme } from "@mui/material";

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

export const PaginationMangas = styled(Pagination)({
  "&": {
    margin: "28px 0 32px",
  },
  "& button:active": {
    background: "none !important",
  },
  "& .Mui-selected": {
    width: "45px !important",
    height: "45px !important",
    color: "#fff !important",
    padding: "0 !important",
  },
  "& .MuiButtonBase-root": {
    padding: "0 13px",
    margin: 0,
    minWidth: "max-content",
    maxHeight: 45,
    fontWeight: 400,
    fontSize: 24,
    borderRadius: "50%",
    color: "#A5A5A5",
  },
  "& .MuiPaginationItem-ellipsis": {
    margin: 0,
    fontWeight: 400,
    fontSize: 45,
    lineHeight: "35px",
    color: "#A5A5A5",
  },
  "& .MuiPaginationItem-previousNext": {
    margin: "0px,32px",
  },
});
export const theme = createTheme({
  palette: {
    primary: {
      main: "#AD02E0",
    },
    secondary: {
      main: "#2FE09B",
    },
  },
});
export const InputModal = styled(TextField)({
  "& fieldset": {
    width: 500,
    height: 52,
  },
  "& .MuiInputBase-root": {
    width: 500,
    height: 52,
    borderRadius: "8px",
    backgroundColor: "#fff",
    zIndex: 1,
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    letterSpacing: "3px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 8,
      border: "1px solid black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AD02E0",
    },
    "&::placeholder": {},
  },
});
export const styleAuthBtn = {
  width: "500px",
  height: "50px",
  background: "#AD02E0",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "20px",
  textTransform: "uppercase",
};
export const InputForDate = styled(TextField)({
  "& input": {
    caretColor: "#2FE09B",
  },
  "& fieldset": {
    width: 168,
    height: 55,
    borderRadius: 8,
    border: "2px solid #2FE09B !important",
  },
  "& .MuiInputBase-root": {
    width: 168,
    height: 50,
    borderRadius: "8px",
    backgroundColor: "#fff",
    "& input": {
      padding: 15,
    },
  },
});
