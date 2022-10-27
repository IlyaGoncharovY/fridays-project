import { Button } from "@mui/material"
import { PackFilter } from "../PackFilter/PackFilter"
import s from "./pack-list.module.scss"
import {Settings} from "../../../Settings/Settings";
import { PaginationButtons } from "../../../common/Pagination/Pagination";

export const PackList = () => {
    return (
        <div className={s.PackListContainer}>
            <div className={s.PackListHeader}>
                <div className={s.PackListHeaderTitle}>
                    <Settings/>
                </div>
                <div className={s.PackListHeaderButton}>
                    <Button variant="contained">Add new pack</Button>
                </div>
            </div>
            <PackFilter/>
            <PaginationButtons/>
        </div>
    )
}