import React, { useEffect } from "react";
import style from "./scss/AboutPage.module.scss";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cardState, getCard } from "../../redux/slices/CardSlice";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../media/icons/aboutPage/arrow.svg";

export default function AboutPage() {
  const dispatch = useDispatch();
  const { card, isLoad } = useSelector(cardState);
  const { id } = useParams();
  const navigate = useNavigate();

  const back = () => navigate(-1);

  useEffect(() => {
    dispatch(getCard(id));
  }, [dispatch, id]);
  return (
    <Box className={style.AboutPage}>
      <Container>
        {!isLoad ? (
          <>
            <Box className={style.AboutPageInner}>
              <Button onClick={back}>
                <Arrow />
                Назад
              </Button>
              <Box className={style.AboutPageBlockOne}>
                <Box>
                  <Box
                    component='img'
                    src={card?.sprites?.other?.home?.front_default}
                  />
                </Box>
                <Box className={style.info}>
                  <Typography variant='h2'>{card?.name}</Typography>
                  <Box>
                    <Typography component='span'>Информация:</Typography>
                    <Typography>Тип: блабла</Typography>
                    <Typography>Год: 2001</Typography>
                    <Typography>Жанр:</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box>
            <CircularProgress color='primary' />
          </Box>
        )}
      </Container>
    </Box>
  );
}
