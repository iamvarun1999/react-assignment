import React from 'react'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../hook';
import { updateToken } from '../Store/slices/LoginSlice';

interface IPROPS {
    children: React.ReactNode;
}


export const Sidebar: React.FC<IPROPS> = ({ children }) => {
    const dispatch = useAppDispatch()
     function logout(): void {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Are you sure you want to logout.",
                showConfirmButton: true,
                showDenyButton: true,
                confirmButtonText: 'Logout',
                denyButtonText: 'Close'
                // timer: 2000
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(updateToken({ token: null }))
                } else if (result.isDenied) {
    
                }
            });
        }
    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <NavLink to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline">Ecommerce</span>
                            </NavLink>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <NavLink to="/" className=" align-middle text-decoration-none px-0">
                                        <span className="ms-1 d-none d-sm-inline text-white">Back to home</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mt-4">
                                    <NavLink to="/admin/productList" className=" align-middle text-decoration-none px-0">
                                        <span className="ms-1 d-none d-sm-inline">Products</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <hr />
                            <div className="dropdown pb-4">
                                <div className='align-middle pointer' onClick={logout}>Logout</div>
                            </div>
                        </div>
                    </div>
                    <div className="col py-3 sidebar-content">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
