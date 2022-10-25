import {useAppSelector} from "../../../bll/hook/hook";
import SuperButton from "../../common/super-button/SuperButton";
import SuperInputText from "../../common/super-input/SuperInputText";
import {CardList} from "../Card/Card-list";
import s from "./pack.module.scss"

export const PackList = () => {

    //fake state
    const cards = [
        {
            questions: "hello?",
            answer: "hello is hello",
            lastUpdated: "12.12.2222",
            grade: 5,
            actions: "hz"
        }
    ]
    // const cards = useAppSelector(state => state.cards.cards)
    // const dispatch = useAppDispatch()
    return (
        <div className={s.componentBody}>
            <div className={s.header}>
                <div className={s.title}>
                    Pack list
                </div>
                <div className={s.button}>
                    <button>Add new pack</button>
                </div>
            </div>
            <div className={s.filterWindow}>
                <SuperInputText title={"Search"}/>
                <div className={s.doubleButton}>
                    <button>My</button>
                    <button>All</button>
                </div>

            </div>
            <div className={s.tableHeader}>
                <div>Name</div>
                <div>Cards</div>
                <div>Last Updated</div>
                <div>Created by</div>
                <div>Actions</div>
            </div>
            <div>
                {
                    cards.map(el => {
                        return (
                            <CardList question={el.questions}
                                      answer={el.answer}
                                      lastUpdated={el.lastUpdated}
                                      grade={el.grade}
                                      actions={el.actions}
                            />
                        )
                    })
                }
            </div>
            <div>Pagination</div>
        </div>
    );
}
