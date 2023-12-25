import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//     baseURL: import.meta.env.VITE_SERVER_URL,
// })

// const useAxiosSecure = () => {
//     const navigate = useNavigate();
//     const { logOut } = useAuth();

//     /*--- request interceptor to add authorization header (for every secure call) ---*/
//     axiosSecure.interceptors.request.use(function (config) {
//         const token = localStorage.getItem('access-token')
//         config.headers.authorization = `Bearer ${token}`;
//         return config;
//     }, function (error) {
//         return Promise.reject(error);
//     });

//     /*--- intercepts 401 and 403 status ---*/
//     axiosSecure.interceptors.response.use(function (response) {
//         return response;
//     }, async (error) => {
//         const status = error.response.status;
//         if (status === 401 || status === 403) {
//             await logOut();
//             navigate('/login');
//         }
//         return Promise.reject(error);
//     })
//     return axiosSecure;
// };

// export default useAxiosSecure;



const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || 'default-server-url',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(
        async function (config) {
            try {
                const token = localStorage.getItem('access-token');

                if (!token) {
                    // Handle the case where the token is not present (e.g., redirect to login)
                    navigate('/login');
                }

                config.headers.authorization = `Bearer ${token}`;
                return config;
            } catch (error) {
                // Handle errors getting the token
                console.error('Error getting token:', error);
                return Promise.reject(error);
            }
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error) {
            const status = error.response?.status;

            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            } else {
                // Handle other errors
                console.error('Request error:', error);
            }

            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;