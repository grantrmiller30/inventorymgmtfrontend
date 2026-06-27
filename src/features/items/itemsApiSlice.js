import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const itemsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0: a.completed ? 1: -1
})

const initialState = itemsAdapter.getInitialState()

export const itemsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getItems: builder.query({
            query: () => ({url: '/items', 
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
            }}),
            transformResponse: responseData => {
                const loadedItems = responseData.map(item => {
                    return item
                })
                return itemsAdapter.setAll(initialState, loadedItems)
            },
            providestags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        {type: 'Item', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'Item', id}))
                    ]
                } else return [{ type: 'Item', id: 'List'}]
            }
        }),
    })
})

export const { useGetItemsQuery } = itemsApiSlice
export const selectItemsResult = itemsApiSlice.endpoints.getItems.select()

const selectItemsData = createSelector(selectItemsResult, itemsResult => itemsResult.data)

export const {
    selectAll: selectAllItems,
    selectById: selectItemById,
    selectIds: selectItemIds
} = itemsAdapter.getSelectors(state => selectItemsData(state) ?? initialState)