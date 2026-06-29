import { useParams, useNavigate, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"

import { useGetItemsQuery } from "./itemsApiSlice"
import useAuth from '../../hooks/useAuth'
import useTitle from "../../hooks/useTitle"
import PulseLoader from "react-spinners/PulseLoader"

const DetailedItem = () => {
    const { id: itemId } = useParams()
    const { userId } = useAuth()
    const { item } = useGetItemsQuery("itemsList", {
        selectFromResult: ({ data }) => ({
            item: data?.entities[itemId]
        })
    })

    const navigate = useNavigate()

    const title = item ? item.name : "Loading"

    useTitle(title)

    if(!item) return <PulseLoader color="white"/>

    const onClick = () => navigate(`/items/edit/${itemId}`)

    return (
      <div className="form detailed-item">
        <div className="detailed-item__header">
          <h1 className="detailed-item__name">{item.name}</h1>
          {userId === item.userId ? <button className="icon-button" onClick={onClick}>
            <FontAwesomeIcon icon={faPenToSquare}/>
          </button> : null}
        </div>
        <main>
          <section className="detailed-item__description">
            <h2 className="detailed-item__description">Description</h2>
            <p className="detailed-item__description">{item.description}</p>
          </section>
          <h2 className="detailed-item__quantity">Quantity: {item.quantity}</h2>
          <h2 className="detailed-item__id">Assigned UserId: {item.userId}</h2>
        </main>
        <footer>
          <Link to="/">Back to Home</Link>
        </footer>
      </div>
  )
}

export default DetailedItem