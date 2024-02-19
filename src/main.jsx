import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieList from './pages/MovieList.jsx'
import Movie from './pages/Movie.jsx'
import SearchList from './pages/SearchList.jsx'

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
        path:'/movie/search/:query',
        element:<SearchList />
      }
    ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
