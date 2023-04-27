import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import style from "./scss/AddComment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "../../redux/slices/AuthAndRegSlice";
import { addComments, getComments } from "../../redux/slices/CardsSlice";
import Swal from "sweetalert2";

export default function AddCommentModal({ open, id, setOpen }) {
  console.log(id);
  const dispatch = useDispatch();
  const [com, setCom] = useState("");
  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : false;
  const click = async (event) => {
    event.preventDefault();
    setOpen(false);
    if (user) {
      await dispatch(addComments({ id: id, text: com, access: access }));
      dispatch(getComments(id));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const { image, username, nickname, access } = useSelector(authState);

  return (
    <Modal open={open} onClose={() => setOpen(false)} className={style.Modal}>
      <Box className={style.ModalInner}>
        <Box className={style.ModalTitle}>
          <Box component='img' src={image} />
          <Typography component='span'>
            {username + " , " + nickname}
          </Typography>
        </Box>
        <TextField
          className={style.ModalInput}
          placeholder='Добавьте комментарий'
          onChange={({ target }) => setCom(target.value)}
        />
        <Button onClick={click}>Добавить</Button>
      </Box>
    </Modal>
  );
}
