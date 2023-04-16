import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import style from "./scss/ButtonsHeader.module.scss";
import RegAndAuth from "../../regAndAuth/RegAndAuth";

export default function ButtonsHeader(handleClose) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <>
      <Box className={style.Btns}>
        <Button variant='outlined' onClick={handleOpen}>
          Войти
        </Button>
        <Button onClick={handleOpen} variant='contained'>
          регистрация
        </Button>
      </Box>
      <RegAndAuth open={open} click={handleClose} setOpen={setOpen} />
    </>
  );
}
