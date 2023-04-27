import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Modal,
  Tab,
  Tabs,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Checkbox,
} from "@mui/material";
import style from "./scss/RegAndAuth.module.scss";
import { ReactComponent as Close } from "../../media/icons/regAndAuth/close.svg";
import PropTypes from "prop-types";
import { InputModal } from "../theme/Theme";
import { styleAuthBtn } from "../theme/Theme";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../redux/slices/AuthAndRegSlice";
import { useMemo } from "react";
import Swal from "sweetalert2";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant='span'>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RegAndAuth({ open, setOpen, reg, setReg }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [fil, setFil] = useState(null);
  const imgRef = useRef(null);
  const [username, setUsername] = useState("");
  const [nick, setNick] = useState("");
  const [passw, setPassw] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [modal, setModal] = useState("-100%");
  const handleClose = () => {
    setModal("-1000%");
    setTimeout(() => setOpen(false), 250);
  };

  const changePhoto = ({ target }) => {
    setFil(target.files[0]);
  };

  const post = () => {
    const data = { username, nickname: nick, password: passw, image_file: fil };
    dispatch(signUp(data));
    setNick("");
    setPassw("");
    setUsername("");
    setFil("");
    handleClose();
    Swal.fire("Good job!", "You clicked the button!", "success");
  };

  const sign = () => {
    const data = { username, password: passw, apply: checked };
    dispatch(signIn({ d: data, checked }));
    if (username === "") {
      return false;
    } else {
      setUsername("");
      setPassw("");
      handleClose();
    }
  };

  const filling = () => {
    imgRef.current.click();
  };
  const formRegister = useMemo(() => {
    return (
      <>
        <TabPanel value={reg ? 1 : 0} index={0}>
          <Box className={style.Auth}>
            <InputModal
              placeholder='Username'
              required
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <InputModal
              placeholder='Password'
              required
              id='standard-password-input'
              type='password'
              autoComplete='current-password'
              value={passw}
              onChange={({ target }) => setPassw(target.value)}
            />
            <FormGroup>
              <FormControlLabel
                className={style.Check}
                control={
                  <Checkbox
                    onChange={({ target }) => setChecked(target.checked)}
                    checked={checked}
                    size='large'
                  />
                }
                label='Запомнить меня'
              />
            </FormGroup>
            <Button sx={styleAuthBtn} onClick={sign}>
              Войти
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={reg ? 1 : 0} index={1}>
          <Box className={style.Reg}>
            <Box className={style.AddImage}>
              <Box
                component='img'
                src={
                  fil
                    ? URL.createObjectURL(fil)
                    : "https://avatars.githubusercontent.com/u/105124646?s=400&u=2e3e1ae90fbcc8f79eec14ab121722e2c3d96b3e&v=4"
                }
                alt='anime'
                className={style.UserImage}
              />
              <Button onClick={filling} variant='text'>
                <input type='file' hidden ref={imgRef} onChange={changePhoto} />
                ДОБАВИТЬ ФОТО
              </Button>
            </Box>
            <Box className={style.RegInputs}>
              <InputModal
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
                required
              />
              <InputModal
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                placeholder='Nickname'
                required
              />
              <InputModal
                value={passw}
                onChange={(e) => setPassw(e.target.value)}
                placeholder='Password'
                required
                id='standard-password-input'
                type='password'
                autoComplete='current-password'
              />
              <Button onClick={post} sx={styleAuthBtn}>
                регистрация
              </Button>
            </Box>
          </Box>
        </TabPanel>
      </>
    );
  }, [reg, value, username, nick, passw, fil, imgRef, checked]);

  useEffect(() => {
    setTimeout(() => open && setModal("50%"), 250);
  }, [open]);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ top: modal }} className={style.ModalInner}>
        <Close onClick={handleClose} />
        <Box className={style.ModalInnerInner}>
          <Box className={style.Btns}>
            <Tabs value={reg ? 1 : 0} onChange={handleChange}>
              <Tab
                label='Вход'
                {...a11yProps(0)}
                onClick={() => setReg(false)}
              />
              <Tab
                label='Регистрация'
                {...a11yProps(1)}
                onClick={() => setReg(true)}
              />
            </Tabs>
          </Box>
          {formRegister}
        </Box>
      </Box>
    </Modal>
  );
}
