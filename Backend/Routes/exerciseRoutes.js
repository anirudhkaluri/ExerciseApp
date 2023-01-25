const User=require('../Models/user');
const Exercise=require('../Models/Exercises');
const exController=require('../Controllers/exController');
const express=require('express');
const router=express.Router();

//check if cookie is there
router.get('/checkCookie',exController.check_cookie);

//for logout functionality
router.get('/logout',exController.logout_user);

//modify exercise
router.put('/modifyExercise',exController.modify_exercise);

//delete a particular record from the Exercise collections
router.delete('/delete/:id',exController.delete_exercise);

//return list of exercises of a particular category for a user
router.get('/exlist/:category',exController.send_exercises);

//store an exercise of a particular category for a particular user
router.post('/exlist/:category',exController.save_exercise);

//to login a user
router.post('/login',exController.login_user);

module.exports=router;