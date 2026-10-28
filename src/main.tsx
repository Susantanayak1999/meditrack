import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Appointments from './pages/Appointments'
import App from './App' // <-- Added the Login Page
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // The login screen goes here (as the default landing page)
      { path: "/", element: <App /> },
      { path: "/login", element: <App /> },
      
      // These are the enterprise dashboard pages (inside the Layout)
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/patients", element: <Patients /> },
      { path: "/appointments", element: <Appointments /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)