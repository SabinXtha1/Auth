import express from 'express'
import { authUser,updateUserProfile,getUserProfile,logoutUser,registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/',authUser)
router.post('/auth',registerUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

export default router