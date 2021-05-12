import {useState} from 'react'
import {useQuery} from 'react-query'
// Components
import Item from './Item/Item'
import Cart from './Cart/Cart'
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'

// themes
import { Wrapper, StyledButton } from './app.styles'

// Types
export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json()

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const {data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)
  console.log(data)

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((accumulator: number, item) => accumulator + item.amount, 0)
  
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // o item ja foi adicionado ao carrinho?
      const alreadyExistItem = prev.find(item => item.id === clickedItem.id)
      if(alreadyExistItem) {
        return prev.map(item => (
          item.id === clickedItem.id ?
          { ...item, amount: item.amount +1 } 
          : item
        ))
      }

      // item sendo adicionado pela primeira vez
      return [...prev, { ...clickedItem, amount: 1}]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((accumulator, item) => {
        if( item.id === id) {
          if( item.amount === 1) return accumulator
          return [ ...accumulator, { ...item, amount: item.amount - 1 }]
        } else {
          return [ ...accumulator, item ]
        }
      }, [] as CartItemType[])
    ))
  }

  if(isLoading) return <LinearProgress />
  if(error) return <div>Algo deu errado, tente novamente ou volte mais tarde...</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={ cartOpen } onClose={ () => setCartOpen(false) }>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={ item.id } xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>

  );
}

export default App;
