import React, { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';

type SuperCheckBoxType = {
    isDone: boolean
    changeTaskStatus: (isDone: boolean) => void
}

const SuperCheckBox: FC<SuperCheckBoxType> = ({isDone, changeTaskStatus}) => {

    const onChangeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(e.currentTarget.checked)
    }

    return (
            <Checkbox onChange={onChangeTaskStatusHandler} checked={isDone}/>
    );
};

export default SuperCheckBox;