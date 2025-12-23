import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, removeUser } from '../redux/usersAction';
import UserCard from '../components/UserCard';


export default function UsersList() {
    const dispatch = useDispatch();
    // get the users list from Redux
    const users = useSelector((state) => state.users.list);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);

    // Delete handler
  const handleDelete = (id) => {
    dispatch(removeUser(id));
  };

    useEffect(()=>{
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
            {users.map((u) => (
                      <UserCard key={u.id} user={u} onDelete={handleDelete} />
                    ))}
        </div>
            
        </div>
    );
}
