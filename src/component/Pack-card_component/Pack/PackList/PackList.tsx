import { Button } from "@mui/material"
import { PackFilter } from "../PackFilter/PackFilter"
import s from "./pack-list.module.scss"

export const PackList = () => {
    return (
        <div className={s.PackListContainer}>
            <div className={s.PackListHeader}>
                <div className={s.PackListHeaderTitle}>
                    Pack list
                </div>
                <div className={s.PackListHeaderButton}>
                    <Button variant="contained">Add new pack</Button>
                </div>
            </div>
            <PackFilter/>
            <div>Pagination</div>
        </div>
    )
}