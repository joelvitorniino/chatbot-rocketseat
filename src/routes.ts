import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { ChatController } from "./controllers/ChatController";
import { RegisterController } from "./controllers/RegisterController";
import authMiddleware from "./middleware/authMiddleware";

const router = Router();
const registerController = new RegisterController();
const authController = new AuthController();
const chatController = new ChatController();

router.get('/api/v1/register', registerController.index);
router.post('/api/v1/register', registerController.store);
router.post('/api/v1/auth', authController.authenticate);
router.get('/api/v1/token', authMiddleware, chatController.verifyToken);
router.delete('/api/v1/register/:id_chat', registerController.deleteById);

export default router;