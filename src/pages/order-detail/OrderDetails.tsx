import { Box, Typography, Tab, Container, Button } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import './order-details.css'
import { useState } from 'react'
import { Order } from '../../domain/order'
import { orderService } from '../../services/orderService'
import { useOnInit } from '../../customHooks/useOnInit'
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard'
import { useNavigate } from 'react-router-dom'
import { userService } from '../../services/UserService'
import { Toast } from '../../components/Toast/ToastContainer'
import { useToast } from '../../components/Toast/useToast'
import { getErrorMessage } from '../../domain/errorHandler'

function OrderDetails () {
  const [orders, setOrders] = useState<Order[]>([])
  const { toast, showToast } = useToast()
  const [state, setState] = useState('PENDIENTE')
  const navigate = useNavigate()

  const handleStateChange = (newState: string) => {
    setState(newState)
    getOrders(newState) 
  }

  const getOrders = async (newState: string) => {
    try {
        const newOrders = await orderService.getFilteredUserOrders(newState)
        setOrders(newOrders)
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      showToast('Error al cargar las ordenes. ' + errorMessage, 'error')
    }
  }

  const cancelOrder = async (id: number) => {
    try {
      userService.cancelOrder(id)
      setOrders(prev => prev.filter(order => order.id != id))
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      showToast('Error al cancelar la orden. ' + errorMessage, 'error')
    }
  }

  const showOrders = () => {
    return orders.map(order => 
      <Box className="order-card-wrapper" key={order.id} data-testid={`restaurant-card-${order.local.id}-${order.id}`}>
        <RestaurantCard 
          src={order.local.storeURL} 
          alt='Imagen de local' 
          name={order.local.name} 
          detail={'Total: $' + order.precioTotal().toFixed(2)}
          detail2={order.fechaCreacionString + ' · ' + order.platos.length + ' productos'}
          icon={order.estado == 'CANCELADO' ? '' : <Button color="error" className='cancel-order-button' data-testid={`cancel-btn-${order.id}`}>Cancelar</Button>}
          cardOnClickFunction={() => navigate('/order-checkout', {state: {id: order.local.id, isNew: false, orderId: order.id}})}
          buttonOnClickFunction={() => cancelOrder(order.id)}
          id={order.id}
        />
      </Box>
    )
  }

  useOnInit(() => handleStateChange(state))

  return (
    <Box className="order-details-container">
      {/* ==================== Header ==================== */}
      <Box className="order-details-header">
        <Typography variant='h5' className="order-details-title">
          Pedidos
        </Typography>
      </Box>

      {/* ==================== Tabs ==================== */}
      <Box className="order-tabs-section">
        <TabContext value={state}>
          <Box className="tabs-container">
            <TabList 
              onChange={(_, value) => handleStateChange(value)} 
              aria-label='Tab-list' 
              variant='scrollable'
              scrollButtons="auto"
            >
              <Tab label='Pendientes' value='PENDIENTE'/>
              <Tab label='Confirmados' value='CONFIRMADO'/>
              <Tab label='Completados' value='PREPARADO'/>
              <Tab label='Cancelados' value='CANCELADO'/>
            </TabList>
          </Box>

          {/* ==================== Orders List ==================== */}
          <TabPanel value={state} className="orders-tab-panel">
            {orders.length != 0 ? (
              <Box className="orders-list">
                {showOrders()}
              </Box>
            ) : (
              <Typography variant='subtitle1' className="empty-orders-text">
                No hay pedidos para mostrar
              </Typography>
            )}
          </TabPanel>
        </TabContext>
      </Box>

      {/* ==================== Toast ==================== */}
      <div id="toast-container" data-testid='toast-orders-test'>
        <Toast toast={toast} />
      </div>
    </Box>
  )
}

export default OrderDetails