import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser } from '../redux/userSlice';
import Swal from 'sweetalert2';
import { Table, Button, Modal, Form, Card, Spinner, Pagination } from 'react-bootstrap';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', dob: '', contact_no: '', password: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleShow = (user = { id: '', name: '', email: '', dob: '', contact_no: '' }) => {
    setFormData(user);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.contact_no || !formData.dob) {
      Swal.fire('Validation Error', 'Name, Email, Contact Number, and Date of Birth are required fields.', 'error');
      return;
    }
  
    if (formData.id) {
      dispatch(updateUser(formData));
      Swal.fire('Updated!', 'User updated successfully.', 'success');
    } else {
      if (!formData.password) {
        Swal.fire('Validation Error', 'Password is required for adding a new user.', 'error');
        return;
      }
      dispatch(addUser(formData));
      Swal.fire('Added!', 'User added successfully.', 'success');
    }
    setShow(false);
  };
  

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    });
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h1>User Management</h1>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h1>User Management</h1>
        <p className="text-danger">Error: {error}</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="container mt-5">
        <h1>User Management</h1>
        <p>No data available</p>
      </div>
    );
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="container mt-5">
      <h1 className='text-center'>User Dashboard</h1>
      <Card className="shadow">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-center">User Management</h5>
          <Button variant="primary" onClick={() => handleShow()}>
            Add User
          </Button>
        </Card.Header>
        <Card.Body>
          <Table responsive striped bordered hover className="shadow">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Contact No</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id || 'N/A'}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.dob}</td>
                  <td>{user.contact_no}</td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => handleShow(user)}>
                      Edit
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Card.Body>
      </Card>

      {/* Modal for Add/Edit */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContact">
              <Form.Label>Contact No</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact no"
                value={formData.contact_no}
                onChange={(e) => setFormData({ ...formData, contact_no: e.target.value })}
              />
            </Form.Group>
            {!formData.id && (
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;
