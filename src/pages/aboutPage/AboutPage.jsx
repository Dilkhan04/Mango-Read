import React, { useEffect, useState } from "react";
import style from "./scss/AboutPage.module.scss";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  List,
  ListItem,
  PaginationItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cardState, getCard } from "../../redux/slices/CardSlice";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../media/icons/aboutPage/arrow.svg";
import { genreManga, genreState } from "../../redux/slices/GenreSlice";
import { cardsSelect, getComments } from "../../redux/slices/CardsSlice";
import { PaginationMangas } from "../../components/theme/Theme";
import { ReactComponent as Right } from "../../media/icons/arrow/Vector 3.svg";
import { ReactComponent as Left } from "../../media/icons/arrow/Vector 2.svg";
import AddCommentModal from "../../components/aboutPage/AddCommentModal";
import { authState } from "../../redux/slices/AuthAndRegSlice";

export default function AboutPage() {
  const dispatch = useDispatch();
  const { card, isLoad } = useSelector(cardState);
  const { comments } = useSelector(cardsSelect);
  const { logged } = useSelector(authState);
  const { id } = useParams();
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const back = () => navigate(-1);
  const { type } = useSelector(genreState);
  const limit = 3;
  const [offset, setOffset] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    !isLoad && setTypes(card?.genre?.map((id) => type[id - 1]));
  }, [card, type, isLoad]);

  useEffect(() => {
    dispatch(getComments(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(genreManga());
    dispatch(getCard(id));
  }, [dispatch, id]);

  return (
    <Box className={style.AboutPage} name='top'>
      <Container
        sx={{
          "&.MuiContainer-root": {
            padding: 0,
            maxWidth: 1240,
          },
        }}
      >
        {!isLoad ? (
          <Box className={style.AboutPageInner}>
            <Button onClick={back}>
              <Arrow />
              Назад
            </Button>
            <Box className={style.AboutPageBlockOne}>
              <Box className={style.ImageMangas}>
                <Box component='img' src={card?.image} alt='mangas-image' />
              </Box>
              <Box className={style.info}>
                <Typography variant='h2'>{card?.ru_name}</Typography>
                <Box className={style.infoInner}>
                  <Typography variant='h3'>Информация:</Typography>
                  <Typography>
                    Тип:
                    <Typography variant='span'>{" " + card?.type}</Typography>
                  </Typography>
                  <Typography>
                    Год:
                    <Typography variant='span'>
                      {" " + card?.issue_year}
                    </Typography>
                  </Typography>
                  <Typography>
                    Жанр:
                    {types?.map((genres) => (
                      <Typography variant='span' key={genres?.id}>
                        {"  " + genres?.title + ", "}
                      </Typography>
                    ))}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className={style.AboutPageBlockTwo}>
              <Typography variant='h2'>Синопсис</Typography>
              <Typography
                dangerouslySetInnerHTML={{ __html: card?.description }}
                sx={{
                  borderBottom: "1px solid #CECECE",
                  paddingBottom: "33px",
                }}
              />
            </Box>
            <Box className={style.Comments}>
              <Box className={style.CommentsTitle}>
                <Typography variant='h2'>Топ комментарий</Typography>
                <Button
                  variant='text'
                  disabled={!logged}
                  onClick={() => setOpen(true)}
                >
                  добавить комментарий
                </Button>
                <AddCommentModal open={open} setOpen={setOpen} id={id} />
              </Box>
              <List>
                {comments.length > 0 ? (
                  comments?.slice(offset * 3 - 3, offset * 3).map((images) => (
                    <ListItem key={images?.id} className={style.CommentsInner}>
                      <Box
                        component='img'
                        alt='user-image'
                        src={images?.user?.image_file}
                      />
                      <Box className={style.CommetnsText}>
                        <Typography component='h2'>
                          {images?.user?.username}, {images?.user?.nickname}
                        </Typography>
                        <Typography>{images?.text}</Typography>
                      </Box>
                    </ListItem>
                  ))
                ) : (
                  <Typography variant='span'>
                    Здесь пока нет комментариев
                  </Typography>
                )}
              </List>
            </Box>
            {comments.length > limit && (
              <PaginationMangas
                className={style.AboutPagePagination}
                page={offset}
                onChange={(_, page) => setOffset(page)}
                count={Math.ceil(comments.length / limit)}
                size='large'
                color='secondary'
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: Left, next: Right }}
                    {...item}
                  />
                )}
              />
            )}
          </Box>
        ) : (
          <Box className={style.Load}>
            <CircularProgress color='secondary' />
          </Box>
        )}
      </Container>
    </Box>
  );
}
