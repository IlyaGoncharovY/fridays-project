import s from "./cardlist.module.scss"

type CardListType = {
    question: string;
    answer: string;
    lastUpdated: string;
    grade: number;
    actions: any
}

export const CardList = (props: CardListType) => {
    return (
        <div className={s.cardBody}>
            <div>{props.question}</div>
            <div>{props.answer}</div>
            <div>{props.lastUpdated}</div>
            <div>{props.grade}</div>
            <div>{props.actions}</div>
        </div>
    )
}