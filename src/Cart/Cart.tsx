import CartItem from '../CartItem/CartItem'
import { Wrapper } from './Cart.styles'
import { CartItemType } from '../App'

type Props = {
    cartItems: CartItemType[]
    addToCart: (clickedItem: CartItemType) => void
    removeFromCart: (id: number) => void
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart}) =>  {
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((accumulator: number, item) => accumulator + item.amount * item.price, 0)

    return (
        <Wrapper>
            <h2>Seu carrinho</h2>
            {cartItems.length === 0 && <p>Carrinho vazio</p>}
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart
