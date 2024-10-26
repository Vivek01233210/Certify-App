import express from 'express';
import { protect } from '../middlewares/protect.js';
import multer from 'multer';
import { fileUpload } from '../controllers/fileController.js';

const router = express.Router();
// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB limit
// });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the destination directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Specify the filename
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), fileUpload);

// router.put('/resume', protect, upload.single('resume'), updateResume);
// router.put('/profile-pic', protect, upload.single('profilePic'), updateProfilePic);

export default router;