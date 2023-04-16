import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./scss/RegAndAuth.module.scss";
import { ReactComponent as Close } from "../../media/icons/regAndAuth/close.svg";

export default function RegAndAuth({ open, click, setOpen }) {
  const [modal, setModal] = useState("-100%");

  const handleClose = () => {
    setModal("-1000%");
    setTimeout(() => setOpen(false), 250);
  };

  useEffect(() => {
    setTimeout(() => open && setModal("50%"), 250);
  }, [open]);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ top: modal }} className={style.ModalInner}>
        <Close onClick={handleClose} />
        <Box className={style.Btns}>
          <Typography variant='span'>Вход</Typography>
          <Typography variant='span'>Регистрация</Typography>
        </Box>
        <Box></Box>
      </Box>
    </Modal>
  );
}
