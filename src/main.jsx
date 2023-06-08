import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { AuthWrapper } from './context/auth.context.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeWrapper } from './context/theme.context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <ThemeWrapper>
    <BrowserRouter>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </BrowserRouter>
  </ThemeWrapper>

)