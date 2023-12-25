import { Helmet } from "react-helmet-async";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from 'react-hot-toast';
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import InvalidFormMsg from "../../components/InvalidFormMsg/InvalidFormMsg";
import AOS from 'aos';
import { imageUpload } from "../../api/utils";
import GoogleSignIn from "../../components/GoogleSignIn/GoogleSignIn";
import { Button } from "@mui/material";


const Register = () => {
    useEffect(() => {
        AOS.init()
    }, [])
    const { registerUser, user, setLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const from = location?.state?.from?.pathname || '/';
    const axiosPublic = useAxiosPublic();

    if (user) {
        return <Navigate to={from} />;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        // ^[a-zA-Z ]{3,50}$
        /*-------- input validation -----------*/
        setErrorMsg(null)
        if (!/^[a-zA-Z ]{3,50}$/.test(userName)) {
            setErrorMsg("Name: only a-zA-Z and space allowed and contains 3-50 chars");
            return;
        }
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail)) {
            setErrorMsg("Please enter a valid email address");
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,64}$/.test(userPassword)) {
            setErrorMsg("Password must contains 1 lowercase, 1 uppercase, 1 special chars, range 6-64");
            return;
        }
        if (!imageFile) {
            setErrorMsg("Please select an image file");
            return;
        }
        if (imageFile) {
            const allowedExtensions = ['jpg', 'jpeg', 'png'];
            const fileNameParts = imageFile.name.split('.');
            const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                setErrorMsg("Please select an PNG or JPG/JPEG image.");
                return;
            }
        }

        setSubmitting(true);
        let photoURL = ''
        try {
            const imageData = await imageUpload(imageFile);
            photoURL = imageData?.data?.display_url;
        } catch (err) {
            setSubmitting(false)
        }

        const userData = {
            userName, userEmail, userPassword, photoURL, userRole: 'normal',
            status: 'Unverified', isSubscribed: 'no'
        };
        registerUser(userEmail, userPassword)
            .then(res => {
                toast.success("Registration successful");
                updateProfile(res.user, {
                    displayName: userName,
                    photoURL: photoURL,
                    reloadUserInfo: {
                        photoUrl: photoURL
                    }
                })
                axiosPublic.post('/users', userData)
                    .then(() => {
                        // console.log(res, 'inside handle register, /users put req');
                        setSubmitting(false);
                    })
                    .catch(() => {
                        // console.log(err, 'inside handle register, /users put req');
                        setSubmitting(false);
                    })
                navigate(from, { replace: true });
                setSubmitting(false);

            })
            .catch(err => {
                // console.log('inside register.jsx inside handeRegister', err.message);
                toast.error(err.message);
                setLoading(false)
                setSubmitting(false)
            })
    }

    return (
        <div className="w-[90%] md:w-full mx-auto" data-aos="zoom-in">
            <Helmet>
                <title>Register | TaskManager Pro</title>
            </Helmet>
            <div className="py-10 flex flex-col md:py-20 space-y-5">
                <h2 className="text-center text-3xl">Register Now</h2>

                <div className="w-full mx-auto flex flex-col items-center justify-center space-y-4 text-center">

                    <form onSubmit={handleRegister} className="mt-8 mb-2 w-[95%] md:w-[80%] lg:w-[60%]" autoComplete="off" >
                        <div className="mb-4 flex flex-col gap-6">
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input onChange={e => setUserName(e.target.value)} type="text" placeholder="User name" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                            </div>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input onChange={e => setUserEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                            </div>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input onChange={e => setUserPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                            </div>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input onChange={e => setImageFile(e.target.files[0])} type="file" accept='image/*' placeholder="Enter photo url" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                            </div>
                            <button type="submit" className="mt-6 flex items-center justify-center w-full btn btn-info py-3 px-6 text-center  text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit" data-ripple-light="true">
                                <span className="ml-3">Register Now</span>
                            </button>
                        </div>
                    </form>
                    {/* 
                    {submitting
                        ? <Button disabled variant="contained" size="large" sx={{ width: '100%' }}>
                            <span className="loading loading-bars loading-md text-acent"></span>
                            <span className="ml-1 font-bold">Creating</span>
                        </Button>
                        : <Button onClick={handleRegister} variant="contained" size="large" sx={{ width: '100%' }}>
                            <span className="ml-1 font-bold">Register Now</span>
                        </Button>
                    } */}

                    {errorMsg && <InvalidFormMsg>{errorMsg}</InvalidFormMsg>}

                    <div className="text-center text-blue-600 underline">
                        <Link to="/login">{"Already have an account? Login"}</Link>
                    </div>

                    <div className="flex items-center justify-center text-center">
                        <GoogleSignIn />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

