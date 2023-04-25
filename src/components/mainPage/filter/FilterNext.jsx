import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Typography,
  Checkbox,
} from "@mui/material";
import styleNext from "./scss/FilterNext.module.scss";
import { ReactComponent as Arrow } from "../../../media/icons/arrow/Vector 2.svg";
import { useDispatch, useSelector } from "react-redux";
import { genreState, genreManga } from "../../../redux/slices/GenreSlice";
import { getCards } from "../../../redux/slices/CardsSlice";

export default function FilterNext({ genr, setGenr, offset, setMove, move }) {
  const dispatch = useDispatch();
  const { type } = useSelector(genreState);

  const click = () => {
    dispatch(
      getCards({
        limit: 12,
        offset,
        genre__title: genr,
      })
    );
  };

  const removed = () => {
    dispatch(
      getCards({
        limit: 12,
        offset,
      })
    );
    setGenr("");
  };

  const moved = () => setMove(!move)

  useEffect(() => {
    dispatch(genreManga());
  }, [dispatch]);
  return (
    <Box className={styleNext.Filter}>
      <Box className={styleNext.FilterNextTitle}>
        <Button onClick={moved} variant='text'>
          <Arrow />
          <Typography component='span'>Назад</Typography>
        </Button>
        <Typography>Жанры</Typography>
      </Box>
      <List className={styleNext.TypesNextList}>
        {type?.map((genres) => (
          <ListItem key={genres?.id}>
            <FormGroup>
              <FormControlLabel
                className={styleNext.Check}
                control={
                  <Checkbox
                    checked={genres?.title === genr}
                    onChange={() => setGenr(genres?.title)}
                    size='large'
                    sx={{ fill: "#2fe09b" }}
                  />
                }
                label={genres.title}
              />
            </FormGroup>
          </ListItem>
        ))}
      </List>
      <Box className={styleNext.FilterBtns}>
        <Button onClick={removed}>Сбросить</Button>
        <Button onClick={click}>Применить</Button>
      </Box>
    </Box>
  );
}
