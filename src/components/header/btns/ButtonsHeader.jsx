import { Box, Button } from "@mui/material";
import React from "react";
import style from "./css/buttonsHeader.module.scss";

export default function ButtonsHeader() {
  return (
    <Box className={style.Btns}>
      <Button variant='outlined'>Войти</Button>
      <Button variant='contained'>регистрация</Button>
    </Box>
  );
}
