import {useState} from "react"
import { Button, Typography, Grid, Card, CardContent } from "@mui/material";
import ProfileModal from "../features/users/components/AddUsersForm";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/redux/usersAction";

export default function DashboardPage() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>

      <Button onClick={()=> setOpen(!open)} variant="contained" color="primary" sx={{ mb: 2 }}>
        Add User
      </Button>

      
      <ProfileModal open={open}  onClose={()=>setOpen(false)} user={null} onSubmit={(data) => dispatch(addUser({...data, id: Date.now(), source: "local"}))}/>
    </div>
  );
}
