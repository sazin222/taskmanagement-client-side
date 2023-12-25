import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {
    useQuery,
} from '@tanstack/react-query'
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import moment from "moment";
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "./../../hooks/useAxiosSecure";


export default function OngoingTask() {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const navigate = useNavigate();

    const { data: tasks, refetch } = useQuery({
        queryKey: ['get all task', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/tasks?email=${user?.email}`);
            const filtered = data.filter(task => task?.status == 'ongoing');
            console.log('task found', filtered);
            return filtered;
        }
    })

    const handleDelete = (id) => {
        // console.log(id, 'id');

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/task?id=${id}`)
                    .then(data => {
                        refetch();
                        console.log(data?.data);
                        toast.success('deleted successfully');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        });
    }

    const handleComplete = (id) => {
        axiosSecure.patch(`/update?id=${id}&email=${user?.email}`)
            .then(data => {
                refetch();
                console.log(data?.data);
                toast.success('Updated successfully');
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Task Title</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="right">Priority</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="right">Deadline</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Mark As</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Edit</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        !tasks ? <p className="text-3xl font-bold text-black">No tasks found</p> :
                            <>
                                {tasks?.map((task, i) => (
                                    <TableRow
                                        key={task?._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="task">
                                            #{i + 1}. {task?.title}
                                        </TableCell>
                                        <TableCell align="right">{task.priority == "1" ? "Low" : task?.priority == "2" ? "Moderate" : "High"}</TableCell>
                                        <TableCell align="right">{moment(task?.deadline).format("MMM Do YY")}</TableCell>
                                        <TableCell align="center">
                                            <span className="px-3 py-[2px] bg-orange-500 text-white rounded-full">{task?.status}</span>
                                        </TableCell>
                                        <TableCell align="center">
                                            <div className="flex  items-center justify-center">
                                                {
                                                    task?.status == 'ongoing' ? <IoIosCheckmarkCircleOutline
                                                        onClick={() => handleComplete(task?._id)}
                                                        className="text-3xl hover:cursor-pointer text-[blue] bg-[#ffa6005a] p-1 rounded-full"></IoIosCheckmarkCircleOutline> :
                                                        <IoIosCheckmarkCircle
                                                            className="text-3xl text-[blue] bg-[#ffa6005a] p-1 rounded-full"></IoIosCheckmarkCircle>
                                                }
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">
                                            <div className="flex  items-center justify-center">
                                                <FaEdit onClick={() => {
                                                    navigate(`/tasks-manager/${task?._id}`)
                                                }} className="bg-[#0000001a]  hover:cursor-pointer text-2xl text-[green] rounded-full p-1"></FaEdit>
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">
                                            <div className="flex items-center justify-center">
                                                <MdDelete onClick={() => handleDelete(task?._id)} className="text-[red] hover:cursor-pointer text-2xl  rounded-full bg-[#ff000031] p-1"></MdDelete>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                    }

                </TableBody>
                {
                    tasks?.length == 0 ? <p className="text-xl font-bold text-black my-3 ml-3">No tasks found</p> : ""
                }
            </Table>
        </TableContainer>
    );
}