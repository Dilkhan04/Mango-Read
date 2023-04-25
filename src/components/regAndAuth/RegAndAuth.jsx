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
import { signUp } from "../../redux/slices/AuthAndRegSlice";

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

export default function RegAndAuth({ open, setOpen, tab, setTab, reg }) {
  const dispatch = useDispatch()
  const [value, setValue] = useState(0);
  const [fil, setFil] = useState(null);
  const imgRef = useRef(null);
  const [username, setUsername] = useState('')
  const [nick, setNick] = useState('')
  const [passw, setPassw] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [modal, setModal] = useState("-100%");
  const handleClose = () => {
    setModal("-1000%");
    setTimeout(() => setOpen(false), 250);
  };

  const changePhoto = ({target}) => {
    setFil(target.files[0])
  }

  const post = () => {
    const data = {username, nick, passw, fil}
    dispatch(signUp(data))
  }

  const filling = () => {
    imgRef.current.click();
  };

  useEffect(() => {
    setTimeout(() => open && setModal("50%"), 250);
  }, [open]);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ top: modal }} className={style.ModalInner}>
        <Close onClick={handleClose} />
        <Box className={style.ModalInnerInner}>
          <Box className={style.Btns}>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                label='Вход'
                {...a11yProps(0)}
                onClick={() => setTab(true)}
              />
              <Tab
                label='Регистрация'
                {...a11yProps(1)}
                onClick={() => setTab(false)}
              />
            </Tabs>
          </Box>
          {reg ? (
            <TabPanel value={value} index={0}>
              <Box className={style.Auth}>
                <InputModal placeholder='Username' required />
                <InputModal
                  placeholder='Password'
                  required
                  id='standard-password-input'
                  type='password'
                  autoComplete='current-password'
                />
                <FormGroup>
                  <FormControlLabel
                    className={style.Check}
                    control={<Checkbox size='large' />}
                    label='Запомнить меня'
                  />
                </FormGroup>
                <Button sx={styleAuthBtn}>Войти</Button>
              </Box>
            </TabPanel>
          ) : (
            <TabPanel value={value} index={1}>
              <Box className={style.Reg}>
                <Box className={style.AddImage}>
                  <Box component='img' src={!!fil && URL.createObjectURL(fil)} alt="anime" className={style.UserImage} />
                  <Button onClick={filling} variant='text'>
                    <input
                      type='file'
                      hidden
                      ref={imgRef}
                      onChange={changePhoto}
                    />
                    ДОБАВИТЬ ФОТО
                  </Button>
                </Box>
                <Box className={style.RegInputs}>
                  <InputModal value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
                  <InputModal value={nick} onChange={(e) => setNick(e.target.value)} placeholder='Nickname' required />
                  <InputModal
                  value={passw} onChange={(e) => setPassw(e.target.value)}
                    placeholder='Password'
                    required
                    id='standard-password-input'
                    type='password'
                    autoComplete='current-password'
                  />
                  <Button onClick={post} sx={styleAuthBtn}>регистрация</Button>
                </Box>
              </Box>
            </TabPanel>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
