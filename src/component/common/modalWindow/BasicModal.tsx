import * as React from 'react';
import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type BasicModalType = {
    children: ReactNode
    open: boolean
    closeHandler: () => void
}


export const BasicModal = (props: BasicModalType) => {
    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.closeHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {props.children}
                </Box>
            </Modal>
        </div>
    );
}