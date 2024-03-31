import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieList from './pages/MovieList.jsx'
import Movie from './pages/Movie.jsx'
import SearchList from './pages/SearchList.jsx'
import LoginForm from './pages/Login.jsx'
import SignUpForm from './pages/SignUp.jsx'
import store from './store/store.js'
import {Provider} from 'react-redux'
import WatchList from './pages/WatchList.jsx'

const router = createBrowserRouter([{
  path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path:'/movie',
        element:<MovieList />
      },
      {
        path:'/movie/:id',  
        element:<Movie />
      },
      {
        path:'/watchlist',  
        element:<WatchList />
      },
      {
        path:'/movie/search/:query',
        element:<SearchList />
      },
      {
        path:'/auth/login',
        element:<LoginForm />
      },
      {
        path:'/auth/signup',
        element:<SignUpForm />
      }
    ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store} >
      <RouterProvider router={router}></RouterProvider>
      </Provider>
  </React.StrictMode>,
)
