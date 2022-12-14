import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SchoolIcon from "@mui/icons-material/School";
import {PATH} from "../../../../../utils/path";
import {useNavigate} from "react-router-dom";
import {PacksModal} from "../../../../../common/ModalWindow/PackModalWindow/PacksModal";
import {DeleteModal} from "../../../../../common/ModalWindow/DeleteModal/DeleteModal";
import {deletePackTC, editPackTC} from "../../../../../bll/reducers/packsReducer";
import {useAppDispatch} from "../../../../../common/hook/hook";
import s from "./cardsSettings.module.scss"
import {EditAndDeleteIcon} from "../../../../../common/EditAndDeleteIcon/EditAndDeleteIcon";
import {CardType} from "../../../../../api/cardsAPI";


const ITEM_HEIGHT = 48;

type CardSettingsForPacksType = {
    packID: string
    userID: string
    name: string | undefined
    cards: CardType[]
}

export const CardSettingsForPacks = (props: CardSettingsForPacksType) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [title, setTitle] = useState(props.name)


    const openEdit = () => setIsEdit(true)
    const closeEdit = () => setIsEdit(false)
    const openDelete = () => setIsDelete(true)
    const closeDelete = () => setIsDelete(false)

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const changeNamePack = () => {
        dispatch(editPackTC(props.packID, title as string))
    }

    const deleteHandler = () => {
        dispatch(deletePackTC(props.packID))
        navigate(PATH.PACK)
    }

    const schoolHandler = () => {
        navigate(`${PATH.LEARN}/${props.packID}/${props.userID}/${props.name}`)
    }
    useEffect(() => {
        setTitle(props.name)
        window.history.replaceState(null, "New Page Title", `${PATH.CARD}/${props.packID}/${props.userID}/${props.name}`)
    }, [props.name])

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '6ch',
                    },
                }}
            >
                <div className={s.icons}>
                    <IconButton disabled={props.cards.length <= 0}>
                        <SchoolIcon onClick={schoolHandler} className={s.schoolIcon}/>
                    </IconButton>
                    <EditAndDeleteIcon openEdit={openEdit} openDelete={openDelete}/>
                </div>
            </Menu>

            <PacksModal
                nameModal={"EDIT PACK"}
                open={isEdit}
                closeHandler={closeEdit}
                thunkCallBack={changeNamePack}
                onChange={onChangeTitleHandler}
                title={title}
            />
            <DeleteModal
                nameModal={"DELETE PACK"}
                open={isDelete}
                closeHandler={closeDelete}
                thunkCallBack={deleteHandler}
                name={title}
            />
        </div>
    )
}