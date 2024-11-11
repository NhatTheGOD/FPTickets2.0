import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9999/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleSwitchChange = async (userId, currentStatus) => {
        try {
            // Find the user and update the active status
            const user = users.find(user => user.id === userId);
            const updatedUser = { ...user, active: !currentStatus };

            // Send PUT request with the updated user data
            const response = await axios.put(`http://localhost:9999/users/${userId}`, updatedUser);

            if (response.status === 200) {
                // Update the user state with the updated user data
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === userId ? updatedUser : user
                    )
                );
            }
            
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    const filteredUsers = users.filter(user => user.role === 'user');

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <>
            <Box sx={{ boxShadow: 3, borderRadius: 2, p: 2, bgcolor: 'background.paper' }}>
                <h2>Users List</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Full Name</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Phone Number</StyledTableCell>
                                <StyledTableCell>Date of Birth</StyledTableCell>
                                <StyledTableCell>Active</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <StyledTableRow key={user.id}>
                                    <StyledTableCell>{user.firstName + " " + user.lastName}</StyledTableCell>
                                    <StyledTableCell>{user.email}</StyledTableCell>
                                    <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                                    <StyledTableCell>{user.dateOfBirth}</StyledTableCell>
                                    <StyledTableCell className={user.active ? 'text-success' : 'text-danger'}>{user.active ? 'Yes' : 'No'}</StyledTableCell>
                                    <StyledTableCell>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={user.active}
                                                    onChange={() => handleSwitchChange(user.id, user.active)}
                                                />
                                            }
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default UsersList;
