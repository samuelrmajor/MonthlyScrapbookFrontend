import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"
import store from './store'

ReactDOM.render(<Provider store={store}><Router><App /></Router> </Provider>, document.getElementById('root'))