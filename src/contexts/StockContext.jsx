import { createContext, useState } from "react"
import PropTypes from "prop-types"

export const StockContext = createContext({})

StockContextProvider.propTypes = {
    children: PropTypes.node,
}

export function StockContextProvider({ children }) {
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem("stock-items")
        if (!storedItems) return []
        const items = JSON.parse(storedItems)
        items.forEach((item) => {
            item.createdAt = new Date(item.createdAt)
            item.updatedAt = new Date(item.updatedAt)
        })
        return items
    })

    const addItem = (item) => {
        setItems((currentState) => {
            const updatedItems = [item, ...currentState]
            localStorage.setItem("stock-items", JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const getItem = (itemId) => {
        return items.find((item) => item.id === +itemId)
    }

    const updateItem = (itemId, newAtributes) => {
        setItems((currentState) => {
            const itemIndex = currentState.findIndex((item) => item.id === +itemId)
            const updatedItems = [...currentState]
            Object.assign(updatedItems[itemIndex], newAtributes, { updatedAt: new Date() })
            localStorage.setItem("stock-items", JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const deleteItem = (itemId) => {
        setItems((currentState) => {
            const updatedItems = currentState.filter((item) => item.id !== itemId)
            localStorage.setItem("stock-items", JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const stock = {
        items,
        addItem,
        getItem,
        updateItem,
        deleteItem,
    }

    return <StockContext.Provider value={stock}>{children}</StockContext.Provider>
}
