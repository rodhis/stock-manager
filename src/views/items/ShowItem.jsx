import { Link, useParams } from "react-router-dom"
import useStock from "../../hooks/useStock"
import DeleteButton from "../../components/DeleteButton"

export default function ShowItem() {
    const { getItem } = useStock()
    const { id } = useParams()

    const item = getItem(id)

    const formatDate = (date) => {
        if (!date) return "Data inválida"
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
        const parsedDate = new Date(date)
        return isNaN(parsedDate) ? "Data inválida" : parsedDate.toLocaleDateString("pt-BR", options)
    }

    return (
        <div className="item">
            <h2>{item.name}</h2>
            <Link to={`/items/${item.id}/update`} className="button is-small">
                Atualizar
            </Link>
            <DeleteButton itemId={item.id} itemName={item.name} />
            <div className="row">
                <span>Categoria: {item.category}</span>
                <span>Quantidade em estoque: {item.quantity}</span>
                <span>Preço: R$ {item.price}</span>
            </div>
            <p>{item.description}</p>
            <div className="row">
                <p>Cadastrado em: {formatDate(item.createdAt)}</p>
                <p>Atualizado em: {formatDate(item.updatedAt)}</p>
            </div>
        </div>
    )
}
