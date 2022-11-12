import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../common/hook/hook";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {setCardsGrade, setUserPack} from "../../bll/reducers/learnReducer";
import {useNavigate, useParams} from "react-router-dom";
import {fetchCardsTC} from "../../bll/reducers/cardsReducer";
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {Button} from "@mui/material";
import style from "./learn.module.css"
import s from "../authComponent/Profile/Profile.module.scss";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {setRandomCard} from "../../utils/setRandomCard";
import {PATH} from "../../utils/path";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


const rate = [
    "Did not know",
    "Forgot",
    "A lot of thought",
    "Confused",
    "Knew the answer",
]

export const Learn = () => {

    const params = useParams()
    const {cardsPack_id, userID, packName} = params

    const name = useAppSelector(state => state.learn.packName)
    const {cards, sortCards, cardQuestion, cardsTotalCount, page} = useAppSelector(state => state.cards)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [randomQuestion, setRandomQuestion] = useState(setRandomCard(cards))
    const [showAnswer, setShowAnswer] = useState(false)
    const [value, setValue] = React.useState("Knew the answer");

    useEffect(() => {
        if (cardsPack_id && packName) {
            dispatch(setUserPack({packID: cardsPack_id, packName}))
            dispatch(fetchCardsTC({cardsPack_id, pageCount: cardsTotalCount, sortCards, page, cardQuestion}))
        }
    }, [])
    useEffect(() => {
        setRandomQuestion(setRandomCard(cards))
    }, [cards])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const showAnswerHandler = () => {
        setShowAnswer(true)
    }

    const nextQuestion = () => {
        setShowAnswer(false)
        const grade = rate.findIndex(r => value === r) + 1
        dispatch(setCardsGrade(randomQuestion._id, grade))
    }
    const redirectHandler = () => {
        navigate(`${PATH.CARD}/${cardsPack_id}/${userID}/${packName}`)
    }
    return <>
        <div>
            <div className={s.backToPacksList} onClick={redirectHandler}><ArrowCircleLeftIcon/> Back to Cards</div>
            <h2 className={style.title}>Learn “{name}”</h2>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={"center"}>
                    <Paper elevation={3} style={{width: "350px", padding: "30px"}}>
                        <div><span
                            className={style.text}>Question :
                            <span>{cards.length
                                ? randomQuestion?.question
                                : <Skeleton variant="text" sx={{fontSize: '1.2rem', width: '250px'}} component='span'/>}
                            </span>
                            </span>
                        </div>
                        <span
                            className={style.trained}>Количество попыток ответов на вопрос :
                            <span> {cards.length ? randomQuestion?.shots :
                                <Skeleton variant="text" sx={{fontSize: '1rem', width: '20px'}}
                                          component='span'/>} </span>
                        </span>
                        {showAnswer &&
                            <div>
                                <div><span className={style.text}>Answer : </span> {randomQuestion?.answer}</div>
                                <FormControl>
                                    <FormLabel>Rate yourself:</FormLabel>
                                    <RadioGroup
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        {rate.map((rate, index) =>
                                            <FormControlLabel
                                                key={index}
                                                value={rate}
                                                control={<Radio/>}
                                                label={rate}/>
                                        )}
                                    </RadioGroup>
                                </FormControl>
                            </div>}
                        <div>
                            {!showAnswer
                                ? <Button
                                    id={style.btn}
                                    variant='contained'
                                    style={{width: "100%", borderRadius: "20px"}}
                                    onClick={showAnswerHandler}>
                                    Show answer
                                </Button>
                                : <Button
                                    onClick={nextQuestion}
                                    variant='contained'
                                    style={{width: "100%", borderRadius: "20px"}}>
                                    Next
                                </Button>
                            }
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </>
};


export default function Variants() {
    return (
        <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}


            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40}/>
            <Skeleton variant="rectangular" width={210} height={60}/>
            <Skeleton variant="rounded" width={210} height={60}/>
        </Stack>
    );
}
