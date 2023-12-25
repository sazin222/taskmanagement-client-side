import { useState } from "react";
import { Backdrop, Button, CircularProgress } from "@mui/material";

export default function Loader() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
  
    return (
      <div>
        {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }