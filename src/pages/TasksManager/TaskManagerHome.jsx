import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import TasksManager from "./TasksManager";
import OngoingTask from "./OngoingTask";
import CompletedTask from "./CompletedTask";
import useAuth from "../../hooks/useAuth";
import Todo from "./Todo";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TaskManagerHome() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
  }


  return (

    <div className="max-w-[1280px] w-[95%] mx-auto py-4">
      <div>
        <h2 className="text-2xl font-bold my-4">My Dashboard</h2>
      </div>
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Todo" {...a11yProps(1)} />
            <Tab label="Ongoing" {...a11yProps(2)} />
            <Tab label="Completed" {...a11yProps(3)} />
            <Tab label="Profile" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TasksManager></TasksManager>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* <OngoingTask></OngoingTask> */}
          <Todo></Todo>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <OngoingTask></OngoingTask>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <CompletedTask></CompletedTask>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <div>
            <h2>My Profile</h2>
            <div>
              <img className="rounded-full" src={user?.photoURL} alt="photo" />
              <h2>Name:{user?.displayName}</h2>
              <h2>Email:{user?.email}</h2>
              <button className="btn btn-info text-white" onClick={() => handleLogout()}>Logout</button>
            </div>
          </div>
        </CustomTabPanel>
      </Box>


    </div>
  );
}