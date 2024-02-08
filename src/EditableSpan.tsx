import React, {FC, useState} from 'react';

type EditableSpanType = {
    onClick: (title: string) => void
    title: string
}

const EditableSpan: FC<EditableSpanType> = ({title, onClick}) => {

    const [newTitle, setNewTitle] = useState(title)
    const [edit, setEdit] = useState(false)
    const [inputError, setInputError] = useState(false)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            onClick(newTitle)
        }
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

    return (
        edit
        ? <input value={newTitle} onChange={onChangeSetNewTitle} onBlur={editHandler} autoFocus={true}/>
        : <span onDoubleClick={editHandler}>{title}</span>
    );
};

export default EditableSpan;