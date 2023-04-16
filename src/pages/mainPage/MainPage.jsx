import React, { useEffect } from "react";
import style from "./scss/MainPage.module.scss";
import {
  Box,
  CircularProgress,
  Container,
  List,
  Pagination,
} from "@mui/material";
import Filter from "../../components/mainPage/filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  cardsSelect,
  getCards,
  setOffset,
} from "../../redux/slices/CardsSlice";
import Card from "../../components/mainPage/card/Card";

export default function MainPage() {
  const dispatch = useDispatch();
  const { cards, isLoad, offset } = useSelector(cardsSelect);
  let limit = 12;

  useEffect(() => {
    dispatch(
      getCards({
        limit,
        offset: offset,
      })
    );
  }, [dispatch, limit, offset]);
  return (
    <>
      <Box className={style.MainPage} id='top'>
        <Container>
          <Box className={style.MainPageInner}>
            <Filter />
            <Box>
              {!isLoad ? (
                <>
                  <List className={style.Cards}>
                    {cards?.results.slice(0, 12).map((i) => (
                      <Card card={i} key={i.name} />
                    ))}
                  </List>
                </>
              ) : (
                <Box className={style.Load}>
                  <CircularProgress color='secondary' />
                </Box>
              )}
            </Box>
          </Box>
        </Container>
        {cards.count >= 12 && (
          <Pagination
            sx={{
              width: "max-content",
              height: "max-content",
              margin: "0 auto",
            }}
            page={offset / limit + 1}
            onChange={(_, page) => dispatch(setOffset((page - 1) * limit))}
            count={Math.ceil(cards?.count / limit)}
            color='secondary'
          />
        )}
      </Box>
      ;
    </>
  );
}
