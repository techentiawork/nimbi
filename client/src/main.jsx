import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <App/>
  </Provider>
)
