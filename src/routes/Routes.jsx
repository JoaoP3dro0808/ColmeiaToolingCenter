import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home"
import SilverElectrode from "../pages/SilverElectrode";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/silverelectrode',
        element: <SilverElectrode/>
    }
]) 