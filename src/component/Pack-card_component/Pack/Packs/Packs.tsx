import s from "./pasks.module.scss"

type PacksType = {
    name: string,
    cards: number,
    lastUpdated: string,
    userName: string,
    actions: string,
}

export const Packs = (props: PacksType) => {

    return (
        <div className={s.packsContainer}>
            <div className={s.tableHeader}>
                <div className={s.tableHeaderText}>Name</div>
                <div className={s.tableHeaderText}>Cards</div>
                <div className={s.tableHeaderText}>Last Updated</div>
                <div className={s.tableHeaderText}>Created by</div>
                <div className={s.tableHeaderText}>Actions</div>
            </div>
            <div className={s.packBody}>
                <div>{props.name}</div>
                <div>{props.cards}</div>
                <div>{props.lastUpdated}</div>
                <div>{props.userName}</div>
                <div>{props.actions}</div>
            </div>
        </div>

    )
}