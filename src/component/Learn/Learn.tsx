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
import {Loader} from "../../common/Loader/Loader";

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
    return <>{cards.length
        ? <div>
        <div className={s.backToPacksList} onClick={redirectHandler}><ArrowCircleLeftIcon/> Back to Cards</div>
        <h2 className={style.title}>Learn “{name}”</h2>
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={"center"}>
                <Paper elevation={3} style={{width: "350px", padding: "30px"}}>
                    <div><span className={style.text}>Question: </span> {randomQuestion?.question}</div>
                    <span
                        className={style.trained}>Количество попыток ответов на вопрос:
                            <span> {randomQuestion?.shots}</span>
                        </span>
                    {showAnswer &&
                        <div>
                            <div><span className={style.text}>Answer: </span> {randomQuestion?.answer}</div>
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
        : <Loader/>}
    </>
};