import { useGetItemsQuery } from "./itemsApiSlice"
import Item from "./Item"

const ItemsList = () => {
    const {
        data: items,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetItemsQuery('itemsList', { pollingInterval: 15000, refetchOnFocus: true, refetchOnMountOrArgChange: true})

    let content

    if (isLoading) content = <p>"Loading"</p>

    if (isError) content = <p className="errmsg">{error?.data?.message}</p>

    if (isSuccess) {
        const {ids, entities} = items

        const inventory = ids?.length && ids.map(itemId => <Item key={itemId} itemId={itemId}/>)

        content = (
            <section className="inventory-grid">
                {inventory}
            </section>
        )
    }

    return content
}

export default ItemsList