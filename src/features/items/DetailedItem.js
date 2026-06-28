import { useParams, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"

import { useGetItemsQuery } from "./itemsApiSlice"
import useAuth from '../../hooks/useAuth'
import useTitle from "../../hooks/useTitle"

const DetailedItem = () => {
    const { id: itemId } = useParams()
    const { userId } = useAuth()
    const { item } = useGetItemsQuery("itemsList", {
        selectFromResult: ({ data }) => ({
            item: data?.entities[itemId]
        })
    })

    const navigate = useNavigate()

    useTitle(item.name)

    const onClick = () => navigate(`/items/edit/${itemId}`)

    return (
      <>
      <h1 className="detailed-item__name">{item.name}</h1>
      {userId === item.userId ? <button onClick={onClick}>
        <FontAwesomeIcon icon={faPenToSquare}/>
      </button> : null}
      <main className="detailed-item">
        <section className="detailed-item__description">
          <h2 className="detailed-item__description">Description</h2>
          <p className="detailed-item__description">{item.description}</p>
        </section>
        <h2 className="detailed-item__quantity">Quantity: {item.quantity}</h2>
        <h2 className="detailed-item__id">Assigned UserId: {item.userId}</h2>
      </main>
      </>
  )
}

export default DetailedItem