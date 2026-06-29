import { useParams, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons"

import { useGetItemsQuery, useUpdateItemMutation, useDeleteItemMutation } from "./itemsApiSlice"
import useAuth from '../../hooks/useAuth'
import useTitle from "../../hooks/useTitle"

const EditItem = () => {
    const { id: itemId } = useParams()
    const { userId } = useAuth()
    const { item } = useGetItemsQuery("itemsList", {
        selectFromResult: ({ data }) => ({
            item: data?.entities[itemId]
        })
    })

    const [name, setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)
    const [quantity, setQuantity] = useState(item.quantity)
    
    const [updateItem, { isLoading, isSuccess, isError, error }] = useUpdateItemMutation()
    const [deleteItem, {isSuccess: isDelSuccess, isError: isDelErrror,  error: delerror}] = useDeleteItemMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if(isSuccess || isDelSuccess) {
            setName('')
            setDescription('')
            setQuantity(0)
            navigate(isSuccess ? `/items/${itemId}` : `/inv`)
        }
        //eslint-disable-next-line
    }, [isSuccess, isDelSuccess, navigate])

    useTitle("Edit " + item.name)

    if(userId !== item.userId) {
        return (
            <p className="errmsg">This is not your item to manage.</p>
        )
    }

    const onNameChanged = e => setName(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onQuantityChanged = e => setQuantity(e.target.value)

    const canSave = !isLoading

    const onSaveItemClicked = async (e) => {
        e.preventDefault()
        if(canSave) {
            console.log(item)
            await updateItem({ id: item._id, name, description, quantity })
        }
    }

    const onDeleteItemClicked = async (e) => {
        await deleteItem({ id: item._id})
    }

    const errClass = isError || isDelErrror ? "errmsg" :"offscreen"

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    return (
      <div className="form detailed-item">
        <p className={errClass}>{errContent}</p>
        <div className="detailed-item__header">
            <input className="form__input" id="name" name="name" type="text" autoComplete="off" value={name} onChange={onNameChanged}/>
            <button className="icon-button" title="Save" disabled={!canSave} onClick={onSaveItemClicked}>
                <FontAwesomeIcon icon={faSave}/>
            </button>
            <button className="icon-button" title="Delete" disabled={!canSave} onClick={onDeleteItemClicked}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
        <main className="detailed-item">
            <section className="detailed-item__description">
                <h2>Description</h2>
                <textarea className="form__input" id="description" name="description" type="text" value={description} onChange={onDescriptionChanged}/>
            </section>
            <h2 className="detailed-item__quantity">Quantity: </h2>
            <input className="form__input" id="quantity" name="quantity" type="number" value={quantity} onChange={onQuantityChanged}/>
            <h2 className="detailed-item__id">Assigned UserId: {item.userId}</h2>
        </main>
        <footer>
          <Link to="/">Back to Home</Link>
        </footer>
      </div>
  )
}

export default EditItem