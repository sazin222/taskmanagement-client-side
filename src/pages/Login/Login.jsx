import { Helmet } from "react-helmet-async";
// import { Button } from '@mui/material';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useEffect, useState } from "react";
import InvalidFormMsg from "../../components/InvalidFormMsg/InvalidFormMsg";
import AOS from 'aos';
import useAuth from "../../hooks/useAuth";
import GoogleSignIn from "../../components/GoogleSignIn/GoogleSignIn";
// import LoginIcon from '@mui/icons-material/Login';
import { CiLogin } from "react-icons/ci";
import { Button } from "@mui/material";

const Login = () => {

    const {loading} = useAuth();

    useEffect(() => {
        AOS.init()
    }, [])

    const navigate = useNavigate();
    const location = useLocation();
    const { loginUser, user, setLoading } = useAuth();
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const from = location?.state?.from?.pathname || '/';
    console.log(from, 'aldkfja daflk adlfk aldfkj');

    if (loading) return "loading..."
    if (user) {
        if (from == '/dashboard') {
            return <Navigate to="/" />
        }
        return <Navigate to={from} />
    }

    const handleLogin = () => {

        setErrorMsg(null)
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail)) {
            setErrorMsg("Please enter a valid email address");
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,64}$/.test(userPassword)) {
            setErrorMsg("Password must contains 1 lowercase, 1 uppercase, 1 special chars, range 6-64");
            return;
        }

        setSubmitting(true)
        loginUser(userEmail, userPassword)
            .then(res => {
                setSubmitting(false)
                // console.log('inside handle login', res);
                toast.success('Login successful')
                navigate(from);
                console.log(from, 'from...');
            })
            .catch(err => {
                // console.log('inside handle login', err);
                toast.error('Wrong email/password')
                setLoading(false);
                setSubmitting(false)
            })
    }

    return (
        <div className=" md:w-full" data-aos="zoom-in">
            <Helmet>
                <title>Login | TaskManager Pro</title>
            </Helmet>
            <div className="py-10 md:py-20 space-y-5">
                <h2 className="text-center text-3xl">Login Now</h2>
                <form onSubmit={handleLogin} className="mt-8 mb-2 mx-auto w-[95%] md:w-[80%] lg:w-[60%]" autoComplete="off" >
                    <div className="mb-4 flex flex-col gap-6">
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input onChange={e => setUserEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input onChange={e => setUserPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                        </div>
                    </div>
                    <div className="inline-flex items-center">
                        <label className="cursor-pointer label">
                            <input type="checkbox" className="checkbox checkbox-secondary" required />
                            <span className="label-text ml-3">Accept terms & conditions</span>
                        </label>
                    </div>
                    <button className="mt-6 flex items-center justify-center w-full btn btn-info py-3 px-6 text-center  text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit" data-ripple-light="true">
                        <CiLogin className="text-xl"></CiLogin>
                        <span className="ml-3">Login Now</span>
                    </button>

                    {
                        errorMsg ? <h2 className="text-center text-red-700 text-sm mt-2">{errorMsg}</h2> : ""
                    }

                    <div className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                        <span className="mr-2">Don not have an account?</span>
                        <Link to="/register"
                            className="font-medium text-[#db332a] transition-colors hover:underline hover:text-blue-700">
                            Register now
                        </Link>
                    </div>
                </form>
                {/* {submitting ? (
                        <Button disabled variant="contained" size="large" sx={{ width: '100%' }}>
                            <span className="loading loading-bars loading-md text-acent"></span>
                            <span className="ml-1 font-bold">Validating</span>
                        </Button>
                    ) : (
                        <Button onClick={handleLogin} variant="contained" size="large" sx={{ width: '100%' }}>
                            <span className="ml-1 font-bold">Login</span>
                        </Button>
                    )}

                    {errorMsg && <InvalidFormMsg>{errorMsg}</InvalidFormMsg>}

                    <div className="text-center text-blue-600 underline">
                        <Link to="/register">{"Don't have an account? Register"}</Link>
                    </div> */}

                    <div className="flex items-center justify-center text-center">
                        <GoogleSignIn />
                    </div>
            </div>
        </div>
    );
};

export default Login;


// import React from 'react';

// const Login = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default Login;