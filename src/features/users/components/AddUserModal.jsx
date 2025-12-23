import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

export default function AddUserModal({ open, handleClose, handleAddUser }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    handleAddUser(data);
    reset();       // clear the form
    handleClose(); // close the modal
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New User</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField label="Name" {...register("name", { required: true })} fullWidth />
            <TextField label="Email" {...register("email", { required: true })} fullWidth />
            <TextField label="Role" {...register("role")} fullWidth />
            <TextField label="Experience (yrs)" type="number" {...register("experience")} fullWidth />
            <TextField label="Skills (comma separated)" {...register("skills")} fullWidth />
            <TextField label="Image URL" {...register("image")} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
