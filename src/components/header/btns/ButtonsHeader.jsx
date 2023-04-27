import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import style from "./scss/ButtonsHeader.module.scss";
import RegAndAuth from "../../regAndAuth/RegAndAuth";

export default function ButtonsHeader({ handleClose, index }) {
  const [open, setOpen] = useState(false);
  const [reg, setReg] = useState(false);

  const openAuth = (sig = false) => {
    setOpen(true);
    setReg(sig);
  };

  return (
    <>
      <Box className={style.Btns}>
        <Button variant='outlined' onClick={() => openAuth(false)}>
          Войти
        </Button>
        <Button onClick={() => openAuth(true)} variant='contained'>
          регистрация
        </Button>
      </Box>
      <RegAndAuth
        reg={reg}
        open={open}
        click={handleClose}
        setOpen={setOpen}
        setReg={setReg}
      />
    </>
  );
}
