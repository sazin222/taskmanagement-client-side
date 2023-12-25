import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import TasksManager from "../pages/TasksManager/TasksManager";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import EditTask from "../pages/TasksManager/EditTask";
import TaskManagerHome from "../pages/TasksManager/TaskManagerHome";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/tasks-manager',
                element: <PrivateRoute>
                    <TaskManagerHome></TaskManagerHome>
                </PrivateRoute>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/tasks-manager/:id',
                element: <PrivateRoute><EditTask></EditTask></PrivateRoute>
            }
        ]
    }
])

export default router;