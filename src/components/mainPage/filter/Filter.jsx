import React from "react";
import {
  Box,
  Button,
  FormControlLabel,
  List,
  ListItem,
  Typography,
  FormGroup,
  Checkbox,
} from "@mui/material";
import style from "./scss/Filter.module.scss";
import { ReactComponent as Arrow } from "../../../media/icons/arrow/Vector 3.svg";
import { InputForDate } from "../../theme/Theme";
import { useDispatch } from "react-redux";
import { getCards } from "../../../redux/slices/CardsSlice";

export default function Filter({ typ, setTyp, offset, move, setMove }) {
  const dispatch = useDispatch();
  const typesMangas = ["Манга", "Манхва", "Западный комикс", "Маньхуа"];

  const click = () => {
    dispatch(
      getCards({
        limit: 12,
        offset,
        type: typ,
      })
    );
  };

  const clicked = () => {
    dispatch(
      getCards({
        limit: 12,
        offset,
      })
    );
    setTyp("");
  };

  const moved = () => setMove(!move);

  return (
    <Box className={style.Filter}>
      <Box className={style.FilterTitle}>
        <Typography>Жанры</Typography>
        <Button onClick={moved} variant='text'>
          <Typography component='span'>все</Typography>
          <Arrow />
        </Button>
      </Box>
      <Box className={style.FilterType}>
        <Typography>Тип</Typography>
        <List className={style.TypesList}>
          {typesMangas?.map((i, j) => (
            <ListItem key={j}>
              <FormGroup>
                <FormControlLabel
                  className={style.Check}
                  control={
                    <Checkbox
                      checked={i === typ}
                      onChange={() => setTyp(i)}
                      size='large'
                      sx={{ fill: "#2FE09B" }}
                    />
                  }
                  label={i}
                />
              </FormGroup>
            </ListItem>
          ))}
        </List>
        <Box className={style.InputForDate}>
          <InputForDate type='number' color='secondary' placeholder='От 0' />
          <hr />
          <InputForDate type='number' color='secondary' placeholder='До 2022' />
        </Box>
        <Box className={style.FilterBtns}>
          <Button onClick={clicked}>Сбросить</Button>
          <Button onClick={click}>Применить</Button>
        </Box>
      </Box>
    </Box>
  );
}
