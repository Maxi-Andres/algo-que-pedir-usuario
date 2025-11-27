import SearchBar from '../../components/SearchBar/SearchBar'
import MediaCard from '../../components/LocalCard/Card'
import ColorCheckboxes from '../../components/Checkbox'
import { StoreType } from '../../domain/store'
import { storeService } from '../../services/LocalesService'
import { useState } from 'react'
import { useOnInit } from '../../customHooks/useOnInit'
import { Toast } from '../../components/Toast/ToastContainer'
import { useToast } from '../../components/Toast/useToast'
import { Box, Typography, Container } from '@mui/material'
import './home.css'

const Home = () => {
  const { toast, showToast } = useToast()
  const [searchValue, setSearchValue] = useState('')
  const [allStores, setAllStores] = useState<StoreType[]>([]) 
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  let stores: StoreType[]
  if (isChecked === true) {
    stores = allStores.filter((store: StoreType) => {
      return store.usuarioCercano === true
    })
  } else {
    stores = allStores
  }

  const buscarStores = async (textoBusquedaNuevo: string) => {
    try {
      setLoading(true)
      setSearchValue(textoBusquedaNuevo)
      const userId = localStorage.getItem('id')
      if (!userId) {
        throw new Error('Usuario no autenticado')
      }

      const nuevosStores = await storeService.getStores(textoBusquedaNuevo, userId)
      setAllStores(nuevosStores)
      
    } catch(error) {
      showToast((error as Error).message, 'error', 10000)
      setAllStores([])
    } finally {
      setLoading(false)
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked)
  }

  useOnInit(() => {
    buscarStores('')
  })

  return (
    <Box className="home-container" data-testid="home-container">
      {/* ==================== Header ==================== */}
      <Box className="home-header-container">
        <Typography variant="h5" className="home-title">
          Delivery
        </Typography>
      </Box>
      
      {/* ==================== Search Bar ==================== */}
      <Box className="search-bar-container" data-testid="search-container">
        <SearchBar onSearch={buscarStores} searchValue={searchValue} />
      </Box>
      
      {/* ==================== Content ==================== */}
      <Container className="home-content-container" data-testid="content-box">
        {loading && (
          <Typography className="loading-text">Cargando...</Typography>
        )}
        
        {/* ==================== Filter Checkbox ==================== */}
        <Box className="filter-container">
          <ColorCheckboxes 
            isChecked={isChecked}
            onCheckboxChange={handleCheckboxChange}
          />
        </Box>
        
        {/* ==================== Store Count ==================== */}
        {isChecked && (
          <Typography variant="body2" className="stores-count-text" data-testid="stores-count">
            Mostrando {stores.length} locales cercanos
          </Typography>
        )}
        
        {/* ==================== Store Cards ==================== */}
        <Box className="cards-grid-container" data-testid="cards-container">
          <MediaCard stores={stores} />
        </Box>
      </Container>

      {/* ==================== Toast ==================== */}
      <div id="toast-container" data-testid='toast-home-test'>
        <Toast toast={toast} />
      </div>
    </Box>
  )
}

export default Home