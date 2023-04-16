import React, { useState } from "react";
import style from "./scss/Header.module.scss";
import { AppBar, Box, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../../media/icons/header/mangoRead.svg";
import { StylesTextField } from "../theme/Theme";
import ButtonsHeader from "./btns/ButtonsHeader";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  const [searh, setSearh] = useState(false);

  return (
    <AppBar position='relative' className={style.Header}>
      <Container>
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
              onFocus={() => setSearh(true)}
              onBlur={() => setSearh(false)}
            />
            <SearchIcon
              style={
                searh
                  ? { width: "0px", left: "19px", top: "17px", opacity: 0 }
                  : { width: "24px", left: "19px", top: "17px", opacity: 1 }
              }
            />
          </Box>
          <Box className={style.HeaderBtns}>
            <ButtonsHeader />
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
