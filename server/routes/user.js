
import express from 'express';
import multer from 'multer';
const router = express.Router();
import controller from '../controllers/user.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

router.get('/users', controller.getAllUsers);
router.get('/users/:id', controller.getUserById);
router.post('/users', upload.single('profile'), controller.createNewsUser);
router.put('/edituser/:id', upload.single('profile'), controller.editUser);
router.delete('/deleteuser/:id', controller.deleteUser);

export default router;