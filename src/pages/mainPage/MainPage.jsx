import React, { useEffect, useState } from "react";
import style from "./scss/MainPage.module.scss";
import { Box, CircularProgress, Container, List } from "@mui/material";
import Filter from "../../components/mainPage/filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { PaginationMangas } from "../../components/theme/Theme";
import {
  cardsSelect,
  getCards,
  setOffset,
} from "../../redux/slices/CardsSlice";
import Card from "../../components/mainPage/card/Card";
import FilterNext from "../../components/mainPage/filter/FilterNext";

const limit = 12;
export default function MainPage() {
  const dispatch = useDispatch();
  const { cards, isLoad, offset } = useSelector(cardsSelect);
  const [typ, setTyp] = useState("");
  const [genr, setGenr] = useState("");
  const [move, setMove] = useState(false);

  useEffect(() => {
    dispatch(
      getCards({
        limit,
        offset,
        type: typ,
        genre__title: genr,
      })
    );
  }, [dispatch, limit, offset]);
  return (
    <Box className={style.MainPage} id='top'>
      <Container
        sx={{
          "&.MuiContainer-root": {
            padding: 0,
            maxWidth: 1240,
          },
        }}
      >
        <Box className={style.MainPageInner}>
          {!move ? (
            <Filter
              move={move}
              setMove={setMove}
              typ={typ}
              setTyp={setTyp}
              offset={offset}
            />
          ) : (
            <FilterNext
              move={move}
              setMove={setMove}
              genr={genr}
              setGenr={setGenr}
              offset={offset}
            />
          )}
          <Box className={style.MangaCards}>
            {!isLoad ? (
              <List className={style.Cards}>
                {cards?.results?.map((card, id) => (
                  <Card card={card} key={card.id} />
                ))}
              </List>
            ) : (
              <Box className={style.Load}>
                <CircularProgress color='secondary' />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      {cards.count >= limit && (
        <PaginationMangas
          className={style.MainPagePagination}
          page={offset / limit + 1}
          onChange={(_, page) => dispatch(setOffset((page - 1) * limit))}
          count={Math.ceil(cards?.count / limit)}
          size='large'
          color='secondary'
        />
      )}
    </Box>
  );
}
