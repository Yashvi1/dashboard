import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Stack,
  Button,
  Chip,
} from "@mui/material";

export default function UserCard({ user, onDelete, onEdit, setEditInto, index }) {

  return (
    <Card
      sx={{
        maxWidth: 320,
        minWidth: 250,
        mx: "auto",
        boxShadow: 3,
        borderRadius: 4,
        p: 3,
        textAlign: "center",
        bgcolor: "background.paper",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      {/* Avatar */}
      <Avatar
        src={user.profile || ""}
        alt={user.name}
        sx={{ width: 50, height: 50, mx: "auto", mb: 2, boxShadow: 2 }}
      >
        {!user.profile && user.name?.charAt(0)}
      </Avatar>

      {/* Name */}
      <Typography variant="h8" fontWeight="bold" gutterBottom>
        {user.name}
      </Typography>

      {/* Description / Experience */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 1, minHeight: 20 }}
      >
        {user.description || "No description provided"}
      </Typography>

      {/* Skills as chips */}
      <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          Skills
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill) => (
              <Chip key={skill} label={skill} size="small" color="primary" />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              None
            </Typography>
          )}
        </Stack>
      </Box>

      {/* Delete Button */}

      <Stack direction="row"
  spacing={1.5}
  justifyContent="center"
  mt={2}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(user.id)}
          size="small"
        >
          Delete
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={onEdit}
          size="small"
        >
          Edit
        </Button>
      </Stack>
      
      
      </div>

      
    </Card>
  );
}
