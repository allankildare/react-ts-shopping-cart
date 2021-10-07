import Button from '@material-ui/core/Button'

// Types
import { CartItemType } from '../App'

// Styles
import { Wrapper } from './Item.styles'

type Props = {
    item: CartItemType
    handleAddToCart: (clickedItem: CartItemType) => void
}


const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
    return (<Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>{(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Adicionar ao carrinho</Button>
    </Wrapper>)
}

export default Item