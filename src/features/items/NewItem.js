import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import { useAddNewItemMutation } from "./itemsApiSlice"
import useAuth from '../../hooks/useAuth'

const NewItem = () => {
    const [addNewItem, { isLoading, isSuccess, isError, error }] = useAddNewItemMutation()

    const navigate = useNavigate()
    const { username, userId } = useAuth()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        if(isSuccess) {
            setName('')
            setDescription('')
            setQuantity(0)
            navigate('/inv')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onQuantityChanged = e => setQuantity(e.target.value)

    const canSave = !isLoading

    const onSaveItemClicked = async (e) => {
        e.preventDefault()
        if(canSave) {
            await addNewItem({ name, description, quantity, userId })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"

    if(!userId) {
        return <p>Error: Unauthorized</p>
    }

    const content = (
        <>
        <p className={errClass}>{error?.data?.message}</p> 
        <form className="form" onSubmit={onSaveItemClicked}>
            <div className="form__title-row">
                <h2>New Note</h2>
                <div className="form__action-buttons">
                    <button className="icon-button" title="Save" disabled={!canSave}>
                        Save
                    </button>
                </div>
            </div>
            <label className="form__label" htmlFor="name">Name:</label>
            <input className={`form__input`} id="name" name="name" type="text" autoComplete="off" value={name} onChange={onNameChanged}/>

            <label className="form__label" htmlFor="description">Description:</label>
            <input className={`form__input`} id="description" name="description" type="text" value={description} onChange={onDescriptionChanged}/>
            
            <label className="form__label" htmlFor="qunatity">Quantity:</label>
            <input className={`form__input`} id="quantity" name="quantity" type="number" value={quantity} onChange={onQuantityChanged}/>
        </form>
        </>
    )

    return content
}

export default NewItem