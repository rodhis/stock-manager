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

    const stock = {
        items,
        addItem,
    }

    const addItem = (item) => {
        setItems(currentState => {
            const updatedItems = [item, ...currentState]
            localStorage.setItem("stock-items", JSON.stringify(updatedItems))
        })
    }

    return (
    <StockContext.Provider value={stock}>
        {children}
    </StockContext.Provider>
    )
}
