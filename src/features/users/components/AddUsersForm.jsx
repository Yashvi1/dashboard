import React, { useState, useEffect,useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { addUser } from '../redux/usersAction';
import { useDispatch } from 'react-redux';
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

export default function ProfileModal({ open, setOpen }) {

  const dispatch = useDispatch();

  const { register, handleSubmit, control, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: {
      name: '',
      description: '',
      skills: [],
      profile: null
    }
  });













  const handleForm =handleSubmit( data => {
    const normalizedData = {
      id: Date.now(),
      name: data.name,
      description: data.description,
    skills: Array.isArray(data.skills) ? data.skills : [],
    profile: data.profile ? URL.createObjectURL(data.profile): null,
    source: "local",
  };
    dispatch(addUser(normalizedData));
    console.log("User saved to Redux:", normalizedData);
    setOpen(false);
    reset();
  });

  const closeModal = ()=>{
    setOpen(false)
    reset({})

  }

  // const handleSkillsClick = (skill, currentSkills, setValue) => {
  //   if (currentSkills.includes(skill)) {
  //     setValue('skills', currentSkills.filter(s => s !== skill));
  //   } else {
  //     setValue('skills', [...currentSkills, skill]);
  //   }
  // };

  return (
    <div >
      {/* <Button variant="contained" onClick={() => setOpen(true)}>Open Form</Button> */}
      <Modal open={open} onClose={ closeModal}   >
        <Box sx={style}>
          <Typography variant="h6" component="h2" mb={2}>
            Profile Form
          </Typography>
          <form onSubmit={handleForm}>
            {/* Profile Image */}
            <Controller
              name="profile"
              control={control}
              rules={{ required: "Profile image is required" }}
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
              {...register('name', { required: "Name is required", maxLength: { value: 50, message: "Max length is 50" } })}
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

            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
