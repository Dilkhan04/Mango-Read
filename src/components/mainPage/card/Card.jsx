import { Box, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./scss/Card.module.scss";
import { NavLink } from "react-router-dom";

export default function Card({ card }) {
  const [img, setImg] = useState("");

  useEffect(() => {
    axios.get(card.url).then((data) => {
      console.log(data, "respoonse ");
      setImg(data.data.sprites.other.dream_world.front_default);
    });
  }, [card.url]);
  return (
    <ListItem className={style.ul}>
      <NavLink to={`/aboutPage/${card.name}`}>
        <Box
          sx={{
            background: `url(${img}) no-repeat center`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            border: "1px solid black",
          }}
          className={style.Card}
        >
          <Typography component='span'>Год: 2000</Typography>
          <Typography>{card?.name}</Typography>
        </Box>
      </NavLink>
    </ListItem>
  );
}
