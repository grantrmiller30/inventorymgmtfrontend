import { useParams } from "react-router-dom"

import { useGetItemsQuery } from "./itemsApiSlice"
import useAuth from '../../hooks/useAuth'

const DetailedItem = () => {
    const { id: itemId } = useParams()
    const { userId } = useAuth()
    const { item } = useGetItemsQuery("itemsList", {
        selectFromResult: ({ data }) => ({
            item: data?.entities[itemId]
        })
    })

    return (
      <>
      <h1 className="detailed-item__name">{item.name}</h1>
      {userId === item.userId ? <p>editable</p> : <p>not yours</p>}
      <main className="detailed-item">
        <section className="detailed-item__description">
          <h2 className="detailed-item__description">Description</h2>
          <p className="detailed-item__description">{item.description}</p>
        </section>
        <h2 className="detailed-item__quantity">Quantity:</h2>
        <h2 className="detailed-item__id">Assigned UserId:</h2>
      </main>
      </>
  )
}

export default DetailedItem