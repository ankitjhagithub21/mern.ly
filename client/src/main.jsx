import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from "react-hot-toast"
import { store } from './redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster/>
  </Provider>,
)
