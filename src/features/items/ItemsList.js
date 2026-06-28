import useAuth from "../../hooks/useAuth"
import { useGetItemsQuery } from "./itemsApiSlice"
import Item from "./Item"
import OwnedItem from "./OwnedItem"

const ItemsList = () => {
    const {
        data: items,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetItemsQuery('itemsList', { pollingInterval: 15000, refetchOnFocus: true, refetchOnMountOrArgChange: true})

    const { userId } = useAuth()

    let content

    if (isLoading) content = <p>"Loading"</p>

    if (isError) content = <p className="errmsg">{error?.data?.message}</p>

    if (isSuccess) {
        const {ids, entities} = items

        const userInventory = ids?.length && ids.filter(itemId => entities[itemId].userId === userId).map(itemId => <OwnedItem key={itemId} itemId={itemId}/>)
        const otherInventory = ids?.length && ids.filter(itemId => entities[itemId].userId !== userId).map(itemId => <Item key={itemId} itemId={itemId}/>) 

        content = (
            <div className="inventory-grid__container">
                <section className="inventory-grid__user">
                    {userInventory}
                </section>
                <section className="inventory-grid__other">
                    {otherInventory}
                </section>
            </div>
        )
    }

    return content
}

export default ItemsList