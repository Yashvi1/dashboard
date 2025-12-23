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
        Dashboard
      </Typography>

      {/* Example buttons */}
      <Button onClick={()=> setOpen(!open)} variant="contained" color="primary" sx={{ mb: 2 }}>
        Add User
      </Button>

      {/* Example summary cards */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">10</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Projects</Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ProfileModal open={open}  onClose={()=>setOpen(false)} user={null} onSubmit={(data) => dispatch(addUser({...data, id: Date.now(), source: "local"}))}/>
    </div>
  );
}
