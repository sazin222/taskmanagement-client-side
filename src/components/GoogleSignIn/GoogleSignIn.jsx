import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import auth from './../../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import { Button, Stack } from "@mui/material";


const GoogleSignIn = () => {
    const { googleSignIn, setLoading } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const from = location?.state?.from?.pathname || '/';


    const handleGoogleSignIn = () => {
        googleSignIn(auth)
            .then(res => {
                const user = res.user;
                const userData = {
                    userName: user?.displayName,
                    userEmail: user?.email?.toLowerCase(),
                    userPhoto: user?.photoURL,
                    userRole: 'normal',
                    status: 'Unverified',
                    isSubscribed: 'no'
                };
                // console.log(userData, 'userdata googlesignin.jsx', user);
                // saveUserData on database if user created on firebase successfully
                axiosPublic.post('/users', userData)
                    .then(res => {
                        console.log(res, 'inside handle register, /users put req');
                    })
                    .catch(err => {
                        console.log(err, 'inside handle register, /users put req');
                    })
                navigate(from);
                toast.success("Google Sign In Successful")

            })
            .catch(err => {
                // console.log('inside handleGoogleSignin', err);
                toast.success(err.message)
            })
            setLoading(false)
    }

    return (
        <Stack direction="row" spacing={10}>
            <Button onClick={handleGoogleSignIn} sx={{ borderRadius: '50px', minWidth: '300px', padding: '8px' }} variant="outlined" startIcon={<FcGoogle className="text-5xl"></FcGoogle>}>
                Sign In with Google
            </Button>
        </Stack>
    );
};

export default GoogleSignIn;