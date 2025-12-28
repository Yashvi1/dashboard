import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, removeUser, updateUser } from '../redux/usersAction';
import UserCard from '../components/UserCard';
import ProfileModal from '../components/AddUsersForm';


export default function UsersList() {
    const [open, setOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);

    const dispatch = useDispatch();
    // get the users list from Redux
    const users = useSelector((state) => state?.users?.list);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);

    // Delete handler
    const handleDelete = (id) => {
        dispatch(removeUser(id));
    };

    const handleEdit = (userId) => {
        const updateUser = users.find((u) => u.id === userId)
        setEditUser(updateUser)
        setOpen(true)
    }

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    if (loading) return <p>Loading Users...</p>
    if (error) return <p>Error: {error}</p>
    if (users.length === 0) {
        return <p>No users added yet.</p>;
    }

    return (
        <div>
            <h2>Users Page</h2>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                justifyContent: "center",
            }}>
                {users.map((u, index) => {
                    return (

                        <UserCard key={`USER${u.id}`} user={u} onDelete={handleDelete} onEdit={() => handleEdit(u.id)} index={index} />
                    )
                })}
            </div>

            <ProfileModal open={open} onClose={() => {
                setEditUser(null);
                setOpen(false);
            }} user={editUser} onSubmit={(updatedData) => {
                // Merge the updated fields with the existing user
                dispatch(updateUser({ ...editUser, ...updatedData }));
                setEditUser(null);
                setOpen(false);
            }} />

        </div>
    );
}
