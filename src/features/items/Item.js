import { useGetItemsQuery } from "./itemsApiSlice"

const Item = ({itemId}) => {
    const { item } = useGetItemsQuery("itemsList", {
        selectFromResult: ({ data }) => ({
            item: data?.entities[itemId]
        })
    })

    if (item) {
        return (
            <div className="item">
                <h3 className="item__title">{item.name}</h3>
                <p className="item__description">{item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description}</p>
                <p className="item__quantity">{`Qty: ${item.quantity}`}</p>
            </div>
        )
    } else return null
}

export default Item