import React from 'react';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

export default function UsersList() {
  // get the users list from Redux
  const users = useSelector((state) => state.users.list);

  if (users.length === 0) {
    return <p>No users added yet.</p>;
  }

  return (
    <div>
      <h2>Users List</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
        }}
      >
        {users.map((u) => (
          <UserCard key={u.id} user={u} onDelete={handleDelete} />
        ))}

      </div>
      {users.map((user, index) => (
        <div key={index} style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
        }}>
          
          <h3>{user.name}</h3>
          <p>{user.description}</p>
          <p>
            <strong>Skills:</strong> {user.skills.join(', ')}
          </p>
          {user.profile && (
            <img
              src={URL.createObjectURL(user.profile)}
              alt="Profile"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
