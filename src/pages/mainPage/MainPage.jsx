import React, { useEffect, useState } from "react";
import style from "./scss/MainPage.module.scss";
import {
  Box,
  CircularProgress,
  Container,
  List,
  PaginationItem,
} from "@mui/material";
import Filter from "../../components/mainPage/filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Right } from "../../media/icons/arrow/Vector 3.svg";
import { ReactComponent as Left } from "../../media/icons/arrow/Vector 2.svg";
import { PaginationMangas } from "../../components/theme/Theme";
import {
  cardsSelect,
  getCards,
  setOffset,
} from "../../redux/slices/CardsSlice";
import Card from "../../components/mainPage/card/Card";
import FilterNext from "../../components/mainPage/filter/FilterNext";

export default function MainPage() {
  const dispatch = useDispatch();
  const { cards, isLoad, offset } = useSelector(cardsSelect);
  const [typ, setTyp] = useState('')
  const [genr, setGenr] = useState('')
  const [move, setMove] = useState(false)
  let limit = 12;

  useEffect(() => {
    dispatch(
      getCards({
        limit,
        offset,
        type: typ,
        genre__title: genr
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
          {
            !move
            ? <Filter move={move} setMove={setMove} typ={typ} setTyp={setTyp} offset={offset}/>
            : <FilterNext move={move} setMove={setMove} genr={genr} setGenr={setGenr} offset={offset}/>
          }
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
      {cards.count >= 12 && (
        <PaginationMangas
          className={style.MainPagePagination}
          page={offset / limit + 1}
          onChange={(_, page) => dispatch(setOffset((page - 1) * limit))}
          count={Math.ceil(cards?.count / limit)}
          size='large'
          color='secondary'
          renderItem={(item) => (
            <PaginationItem slots={{ previous: Left, next: Right }} {...item} />
          )}
        />
      )}
    </Box>
  );
}
