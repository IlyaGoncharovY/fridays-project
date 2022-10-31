import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../bll/hook/hook";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {CardType} from "../../api/cardsAPI";
import {setCardsGrade, setUserPack} from "../../bll/reducers/learnReducer";
import {useNavigate, useParams} from "react-router-dom";
import {fetchCardsTC} from "../../bll/reducers/cardsReducer";
import {PATH} from '../../App';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {Button} from "@mui/material";
import style from "./learn.module.css"
import s from "../Profile/profile.module.scss";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";


export const Learn = () => {

    const getCard = (cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        return cards[res.id + 1];
    }

    const rate = [
        "Did not know",
        "Forgot",
        "A lot of thought",
        "Confused",
        "Knew the answer",
    ]
    const params = useParams()
    const packID = params.cardID
    const packName = params.name

    const name = useAppSelector(state => state.learn.packName)
    const cards = useAppSelector(state => state.cards.cards)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [randomQuestion, setRandomQuestion] = useState(getCard(cards))
    const [showAnswer, setShowAnswer] = useState(false)
    const [value, setValue] = React.useState("Knew the answer");

    useEffect(() => {
        if (packID && packName) {
            dispatch(setUserPack({packID: packID, packName: packName}))
            dispatch(fetchCardsTC(packID, {pageCount: 102}))
        }
    }, [])
    useEffect(() => {
        setRandomQuestion(getCard(cards))
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
        navigate(`${PATH.CARD}/` + packID)
    }
    return (
        <div>
            <div className={s.backToPacksList} onClick={redirectHandler}> <ArrowCircleLeftIcon/> Back to Cards</div>
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

    )
        ;
};

