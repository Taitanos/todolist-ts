import React, {FC, useState} from 'react';

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

    return (
        <div>
            <input
                className={inputError ? 'input-error' : undefined}
                value={newTitle}
                onChange={onChangeSetNewTitle}
                onKeyDown={onKeyDownAddTask}
            />
            <button
                disabled={isAddBtnDisabled}
                onClick={onClickAddTask}
            >+
            </button>
            <div>
                {userMessage}
            </div>
        </div>
    )
}

export default AddItemForm;