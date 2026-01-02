import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { addUser } from '../redux/usersAction';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Chip,
  Stack
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const skillsList = ["JavaScript", "React", "Node.js", "Python", "CSS", "HTML"];

export default function ProfileModal({ open, editIndex, onClose, user, onSubmit}) {

  //this part
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.users?.list);

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: editIndex ? users[editIndex]?.name : "",
      description: editIndex ? users[editIndex]?.description : "",
      skills: editIndex ? users[editIndex]?.skills : [],
      profile: editIndex ? users[editIndex]?.profile : ""
    }
  });

  const emptyForm = {
  name: "",
  description: "",
  skills: [],
  profile: ""
};


  useEffect(() => {
    
    //Auto reflecting User Data
    if(user){
      reset({
        name: user.name,
      description: user.description,
      skills: user.skills,
      profile: user.profile
      });
    }
    else{
      reset({
        name: "",
      description: "",
      skills: [],
      profile: ""
      });
    }

  }, [user, reset])

  const handleForm = handleSubmit(data => {
    console.log(`FormData $data`, data);
    const normalizedData = {
      id: user?.id || Date.now(), // Use existing user's id when editing, or create new id when adding
      name: data.name,
      description: data.description,
      skills: Array.isArray(data.skills) ? data.skills : [],
      profile:
  data.profile instanceof File
    ? URL.createObjectURL(data.profile)
    : user?.profile || null,
 // Keep existing profile if no new file uploaded
      source: user?.source || "local", // Preserve existing source or set to "local"
    };
    onSubmit(normalizedData);
    console.log("User saved to Redux:", normalizedData);
    onClose();
    reset();
  });


  const closeModal = () => {
    onClose();
    reset(emptyForm)

  }

  function handleClose(){
    onClose();
    reset(emptyForm)
  }


  return (
    <div >
      
      <Modal open={open} onClose={closeModal}   >
        
        <Box sx={style}>
          <Typography variant="h6" component="h2" mb={2}>
            Profile Form
          </Typography>
          <form onSubmit={handleForm}>
            {/* Profile Image */}
            <Controller
              name="profile"
              control={control}
              render={({ field }) => (
                <TextField
                  type="file"
                  fullWidth
                  margin="normal"
                  onChange={(e) => field.onChange(e.target.files[0])}
                  error={!!errors.profile}
                  helperText={errors.profile?.message}
                />
              )}
            />

            {/* Name */}
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              {...register('name', { required: "Name is required", maxLength: { value: 30, message: "Max length is 50" } })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            {/* Description */}
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={4}
              {...register('description', { required: "Description is required", maxLength: { value: 200, message: "Max length is 200" } })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            {/* Skills */}
            <Controller
              name="skills"
              control={control}
              rules={{ required: "Select at least one skill" }}
              render={({ field }) => (
                <Box mt={2} mb={2}>
                  <Typography variant="subtitle1">Skills</Typography>
                  <Stack direction="row" spacing={1} mb={2} mt={1} flexWrap="wrap">
                    {skillsList.map(skill => (
                      <Chip
                        key={skill}
                        label={skill}
                        clickable
                        color={field?.value?.includes(skill) ? "primary" : "default"}
                        onClick={() => {
                          const newSkills = field?.value?.includes(skill)
                            ? field?.value?.filter(s => s !== skill)
                            : [...field?.value, skill];
                          field?.onChange(newSkills);
                        }}
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Stack>
                  {errors.skills && (
                    <Typography variant="caption" color="error">{errors.skills.message}</Typography>
                  )}
                </Box>
              )}
            />

            <Stack direction="row"
  spacing={1.5}
  justifyContent="center"
  mt={2}>
              <Button variant="contained" type="submit" fullWidth >
              Submit
            </Button>
            <Button variant="contained" onClick={handleClose} fullWidth >
              Close
            </Button>
            </Stack>

            
          </form>
        </Box>
      </Modal>
    </div>
  );
}
