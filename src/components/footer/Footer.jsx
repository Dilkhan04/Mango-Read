import React from "react";
import style from "./css/footer.module.scss";
import {
  Box,
  Container,
  List,
  ListItem,
  Typography,
  Link,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../media/icons/header/mangoRead.svg";
import { ReactComponent as Facebook } from "../../media/icons/footer/Facebook.svg";
import { ReactComponent as Instagram } from "../../media/icons/footer/Instagram.svg";
import { ReactComponent as Twitter } from "../../media/icons/footer/Twitter.svg";

export default function Footer() {
  return (
    <Box className={style.Footer} component='footer'>
      <Container>
        <Box className={style.FooterInner}>
          <Box className={style.FooterLogo}>
            <NavLink to='/'>
              <Logo />
              <Box>
                <Typography variant='h4'>MangoRead</Typography>
                <Typography variant='span'>Читай мангу с нами</Typography>
              </Box>
            </NavLink>
          </Box>
          <Box className={style.FooterLinks}>
            <List>
              <ListItem>
                <Link href='#' alt='facebook'>
                  <Typography component='span'>
                    <Facebook /> Link One
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link href='#' alt='instagram'>
                  <Typography component='span'>
                    <Instagram /> Link Two
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link href='#' alt='twitter'>
                  <Typography component='span'>
                    <Twitter /> Link Three
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Box>
          <Box>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.704209289773!2d74.61576867623864!3d42.8790869711494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb794b532a8f1%3A0xcea5bfa3cae816aa!2sVictory!5e0!3m2!1sru!2skg!4v1681390190977!5m2!1sru!2skg'
              width='400'
              height='250'
              style={{
                border: 0,
                borderRadius: 20,
                filter: "drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.15))",
              }}
              allowfullscreen=''
              loading='lazy'
              referrerpolicy='no-referrer-when-downgrade'
            />
          </Box>
        </Box>
      </Container>
      <Box className={style.FooterInnerBootom}>
        <Box className={style.Bottom}>
          <Box>
            <Link href='#' alt='twitter'>
              <Typography component='span'>
                ©2022, All right reserved.
              </Typography>
            </Link>
          </Box>
          <Box className={style.Right}>
            <Link href='#' alt='twitter'>
              <Typography component='span'>Privacy Policy</Typography>
            </Link>
            <Link href='#' alt='twitter'>
              <Typography component='span'>Terms of Service</Typography>
            </Link>
            <Link href='#' alt='twitter'>
              <Typography component='span'>Cookies Settings</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
