import React, { useEffect, useState } from "react";
import style from "./scss/Header.module.scss";
import { AppBar, Box, Button, Container, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import logo from "../../media/icons/header/mangoRead.svg";
import { StylesTextField } from "../theme/Theme";
import ButtonsHeader from "./btns/ButtonsHeader";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  cardsSelect,
  getScanning,
  setScann,
} from "../../redux/slices/CardsSlice";
import { authState, logOut, setUser } from "../../redux/slices/AuthAndRegSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [searh, setSearh] = useState(false);
  const { scann } = useSelector(cardsSelect);
  const [scan, setScan] = useState("");
  const { image, username, nickname, access, refresh, logged } =
    useSelector(authState);

  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : false;

  const clear = () => {
    setScan("");
    dispatch(setScann([]));
  };

  const scanin = (e) => {
    setScan(e.target.value);
    setSearh(!!e.target.value);
    dispatch(getScanning(e.target.value));
  };

  const blur = () => {
    setSearh(false);
  };

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("user")) || {
      username,
      nickname,
      access,
      refresh,
      image,
      logged,
    };
    dispatch(setUser(login));
  }, [logged, localStorage]);

  return (
    <AppBar className={style.Header}>
      <Container
        sx={{
          "&.MuiContainer-root": {
            padding: 0,
            maxWidth: 1240,
          },
        }}
      >
        <Box className={style.HeaderInner}>
          <Box className={style.HeaderLogo}>
            <NavLink to='/'>
              <Box component='img' src={logo} alt='logo-MangaRead'></Box>
              <Box className={style.HeaderText}>
                <Typography variant='h4'>MangoRead</Typography>
                <Typography variant='span'>Читай мангу с нами</Typography>
              </Box>
            </NavLink>
          </Box>
          <Box className={style.HeaderSearch}>
            <StylesTextField
              sx={{
                "& > div > input": { paddingLeft: searh ? "16px" : "56px" },
              }}
              placeholder='Placeholder'
              type='text'
              value={scan}
              onChange={scanin}
              onFocus={() => setSearh(true)}
              onBlur={blur}
            />
            <SearchIcon
              style={
                searh
                  ? { width: "0px", left: "19px", top: "17px", opacity: 0 }
                  : { width: "24px", left: "19px", top: "17px", opacity: 1 }
              }
            />
            {searh && (
              <Box
                sx={
                  scann.length > 0
                    ? { height: 200, padding: "0 5px" }
                    : { height: 0, padding: 0 }
                }
                className={style.SearchBox}
              >
                {scann?.length > 0 &&
                  scann.map((i) => (
                    <Link onClick={clear} to={`/aboutPage/${i?.id}`}>
                      <Box className={style.scanImg}>
                        <Box component='img' src={i?.image} />
                        <Typography component='span'>
                          {i.ru_name.substring(0, 20)}...
                        </Typography>
                      </Box>
                    </Link>
                  ))}
              </Box>
            )}
          </Box>
          <Box className={style.HeaderBtns}>
            {!logged ? (
              <ButtonsHeader />
            ) : (
              <Box className={style.UserAccount}>
                <Typography color='black'>{username}</Typography>
                <Box
                  component='img'
                  src={image}
                  alt=''
                  sx={{ width: 75, height: 75, borderRadius: "50%" }}
                />
                <Button onClick={() => dispatch(logOut({ access, refresh }))}>
                  out
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
