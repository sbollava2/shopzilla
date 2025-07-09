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
router.get('/', getAllUsers);
router.put('/:id/admin', toggleAdminRole);
router.delete('/:id', deleteUserById);

export default router;
