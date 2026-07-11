import express from 'express';
import { getUserById, getUserResumes, LoginUser, registerUser } from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';


const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post("/login", LoginUser)
userRouter.get("/data", protect, getUserById);
userRouter.get('/resumes',protect,getUserResumes)
export default userRouter;