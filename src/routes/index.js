import LayoutAdmin from "../layout/LayoutAdmin"
import Controller from "../pages/Controller";
import Dashboard from "../pages/Dashboard";
import Charts from "../pages/Charts";
import Weathers from "../pages/Weathers";
export const routes = [
    {
        children: [
            {
                path: "/",
                element: <LayoutAdmin />,
                children: [
                    {
                        path: "/admin",
                        element: <Dashboard />
                    },
                    {
                        path: "/controller",
                        element: <Controller />
                    },
                    {
                        path: "/charts",
                        element: <Charts />
                    },
                    {
                        path: "/weathers",
                        element: <Weathers />
                    }
                ]
            }
        ]
    }
];
