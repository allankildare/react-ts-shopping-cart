import Button from '@material-ui/core/Button'
import { Wrapper } from './CartItem.styles'
import { CartItemType } from '../App'

type Props = {
    item: CartItemType
    addToCart: (clickedItem: CartItemType) => void
    removeFromCart: (id: number) => void
}
const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className="info">
                <p>Preço: ${item.price}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p>

            </div>
            <div className="buttons">
                <Button size="small" disableElevation variant="contained"
                    onClick={() => removeFromCart(item.id)}>
                        -
                </Button>

                <Button size="small" disableElevation variant="contained"
                onClick={() => addToCart(item)}>
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title} />
    </Wrapper>
)

export default CartItem