import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { ChatController } from "./controllers/ChatController";
import { RegisterController } from "./controllers/RegisterController";
import authMiddleware from "./middleware/authMiddleware";
import { GoogleService } from "./services/google/GoogleService";

const router = Router();
const registerController = new RegisterController();
const authController = new AuthController();
const chatController = new ChatController();
const passport = new GoogleService().createPassport();

router.get('/api/v1/register', registerController.index);
router.post('/api/v1/register', registerController.store);

router.post('/api/v1/email', registerController.sendEmail);
router.post('/api/v1/auth', authController.authenticate);

router.post('/api/v1/auth_google', authController.authenticateGoogle);

router.get('/api/v1/token', authMiddleware, chatController.verifyToken);

router.post('/api/v1/forgot_password', authController.forgotPassword);

router.post('/api/v1/reset_password', authController.resetPassword);
router.delete('/api/v1/register/:id_chat', registerController.deleteById);

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/auth_google',
    failureRedirect: '/auth/failure',
}));

router.post('/api/v1/email/login', authController.sendWarning);
router.post('/api/v1/find_name', authController.findNameByEmail);

router.post('/api/v1/find_name_google', authController.findNameByEmailGoogleAuth);
router.post('/api/v1/verify_author', chatController.verifyAuthor);

export default router;