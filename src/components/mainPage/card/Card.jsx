import React from "react";
import { Box, ListItem, Typography } from "@mui/material";
import style from "./scss/Card.module.scss";
import { NavLink } from "react-router-dom";

export default function Card({ card }) {
  return (
    <ListItem className={style.Card}>
      <NavLink to={`/aboutPage/${card?.id}`}>
        <Box
          sx={{
            background: `url(${card?.image}) no-repeat center`,
          }}
          className={style.CardInner}
        >
          <Typography component='span'>Год: {card?.issue_year}</Typography>
          <Typography>
            {card?.ru_name.split(" ").length > 1
              ? card?.ru_name.split(" ")[0] +
                " " +
                card?.ru_name.split(" ")[1] +
                " " +
                "..."
              : card?.ru_name}
          </Typography>
        </Box>
      </NavLink>
    </ListItem>
  );
}
