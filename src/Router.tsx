import React, { useEffect } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Login } from './Pages/Login'
import { Cart } from './Pages/Cart'
import { Header } from './Components/Header'
import { Footer } from './Components/Footer'
import { Loader } from './Components/Loader'
import { useAppDispatch } from './hook'
import { getAllProducts } from './Store/slices/ProductSlice'
import { ToastContainer } from 'react-toastify'
import { ProductViewPage } from './Pages/ProductViewPage'
import { Sidebar } from './Components/Sidebar'
import { ProductListing } from './Pages/Admin/ProductListing'
import { store } from './Store/store'

export const Router: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='' element={<WebsiteLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/productview/:id' element={<ProductViewPage />} />
                    <Route path='/cart' element={<Cart />} />
                </Route>
                <Route path='/admin' element={<SidebarLayout />}>
                    <Route path='productList' element={<ProductListing />} />
                </Route>
            </Routes>
            <Loader />
        </>
    )
}


const WebsiteLayout: React.FC = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
const SidebarLayout: React.FC = () => {
    
    return (
        <>
        {store?.getState()?.auth?.token?<Sidebar><Outlet /></Sidebar>:<Navigate to='/'/>}
        </>
    )
}
