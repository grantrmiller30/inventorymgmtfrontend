import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

import { useGetItemsQuery } from "./itemsApiSlice"

const EditableItem = ({ itemId }) => {
    const { item } = useGetItemsQuery("itemsList", {
        selectFromResult: ({ data }) => ({
            item: data?.entities[itemId]
        })
    })
    const navigate = useNavigate()

    const onButtonClicked = () => navigate(`/items/edit/${itemId}`)

    if (item) {
        return (
            <div className="editable-item">
                <h3 className="item__title">{item.name} </h3>
                <p className="item__description">{item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description}</p>
                <section className="item__bottom">
                    <p className="item__quantity">{`Qty: ${item.quantity}`}</p>
                    <button className="item__button" onClick={onButtonClicked}><FontAwesomeIcon icon={faPenToSquare}/></button>
                </section>
            </div>
        )
    } else return null
}

export default EditableItem