import express from 'express'
import { authMiddleWare } from '../middleware/auth.middleware.js'; 
import { UserModel } from '../model/user.model.js';
const router = express.Router();

router.get('/', authMiddleWare, async (req, res) => { 
  try {
    const userData = await UserModel.findById(req.user._id).select('-password -verificationToken');
    res.json({
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      _id: userData._id,
      isVerified: userData.isVerified  
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;