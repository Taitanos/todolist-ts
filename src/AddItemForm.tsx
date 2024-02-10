import React, {FC, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


type AddItemFormType = {
    onClick: (title: string) => void
}

const AddItemForm: FC<AddItemFormType> = ({onClick}) => {

    const [newTitle, setNewTitle] = useState('')
    const [inputError, setInputError] = useState(false)

    const onClickAddTask = () => {
        onClick(newTitle)
        setNewTitle('')
    }

    const onChangeSetNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const trimmedTitle = e.target.value.trim()
        if (trimmedTitle || e.target.value.length === 0) {
            inputError && setInputError(false)
            setNewTitle(trimmedTitle)
        } else {
            setInputError(true)
        }
    }

    const onKeyDownAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    const isAddBtnDisabled = !newTitle || newTitle.length >= 15

    const userMessage = inputError
        ? <span style={{color: 'red'}}>Your title is too empty</span>
        : newTitle.length < 15
            ? <span>Enter new title</span>
            : <span style={{color: 'red'}}>Your title is too long</span>

    //Стили
    const styleButton = {
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        margin: '5px'
    }

    return (
        <div>
            <TextField
                error={inputError}
                label={userMessage}
                value={newTitle}
                onChange={onChangeSetNewTitle}
                onKeyDown={onKeyDownAddTask}
                size="small"
                id="standard-basic"
                variant="standard"
            />
            <Button disabled={isAddBtnDisabled} onClick={onClickAddTask} variant="contained"
                    style={styleButton}>+</Button>
        </div>
    )
}

export default AddItemForm;