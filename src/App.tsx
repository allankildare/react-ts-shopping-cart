import {useState} from 'react'
import {useQuery} from 'react-query'
// Components
import Item from './Item/Item'
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'

// themes
import { Wrapper, StyledButton } from './app.styles'

// Types
export type CardItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async (): Promise<CardItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json()

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CardItemType[])

  const {data, isLoading, error } = useQuery<CardItemType[]>('products', getProducts)
  console.log(data)

  const getTotalItems = (items: CardItemType[]) => null
  
  const handleAddToCart = (clickedItem: CardItemType) => null

  const handleRemoveFromCart = () => null

  if(isLoading) return <LinearProgress />
  if(error) return <div>Algo deu errado, tente novamente ou volte mais tarde...</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={ cartOpen } onClose={ () => setCartOpen(false) }>
        Itens do carrinho
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
