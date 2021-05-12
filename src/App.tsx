import {useState} from 'react'
import {useQuery} from 'react-query'
// Components
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'

// themes
import { Wrapper } from './app.styles'

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
  const {data, isLoading, error } = useQuery<CardItemType[]>('products', getProducts)
  console.log(data)

  const getTotalItems = () => null
  
  const handleAddToCart = () => null

  const handleRemoveFromCart = () => null

  if(isLoading) return <LinearProgress />
  if(error) return <div>Algo deu errado, tente novamento ou volte mais tarde...</div>

  return (
    <div className="App">
      <h1>Hello!</h1>
    </div>
  );
}

export default App;
