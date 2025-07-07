import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
  toggleAdminRole,
  deleteUserById
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.get('/', getAllUsers); // get all users
router.put('/:id/admin', toggleAdminRole); // toggle admin
router.delete('/:id', deleteUserById); // delete user

export default router;
