import CartItem from '../CartItem/CartItem'
import { Wrapper } from './Cart.styles'
import { CartItemType } from '../App'

type Props = {
    cartItems: CartItemType[]
    addToCart: (clickedItem: CartItemType) => void
    removeFromCart: (id: number) => void
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart}) =>  {
    return (
        <Wrapper>
            <h2>Seu carrinho</h2>
            {cartItems.length === 0 && <p>Carrinho vazio</p>}
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
            ))}
        </Wrapper>
    )
}

export default Cart
