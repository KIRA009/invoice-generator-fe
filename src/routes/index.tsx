import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { AddCustomer } from "../pages/AddCustomer";
import { AddInvoice } from "../pages/AddInvoice";
import { Home } from "../pages/Home";
import { RouteInterface } from "../types/route";


const routes: RouteInterface[] = [
    {
        url: '/',
        component: Home
    },
    {
        url: '/invoice/add/',
        component: AddInvoice
    },
    {
        url: '/customer/add/',
        component: AddCustomer
    },
]


export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(route => (
                    <Route path={route.url} key={route.url} element={<route.component />} />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

