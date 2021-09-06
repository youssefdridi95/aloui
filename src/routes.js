const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');
const MessageController = require('./controllers/MessageController');
const CourseController = require('./controllers/CourseController');
const OrderController = require('./controllers/OrdersController');
const userMiddleware = require('./middlewares/auths/user');
const quizzContoller= require('./controllers/quizzController')
const userx = require('./models/UserModel');
const multer=require('multer');
let url = "";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});



const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};



const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



const middlewares = {
    user: userMiddleware
}


router.get('/', (req, res) => {
    return res.json({
        warn: "me",
    })
});



router.post('/auth', UserController.login);
router.post('/user', UserController.create);
router.get('/users', UserController.getUsers);
router.get('/userprofile', [middlewares.user], UserController.getUserProfile);
router.get('/userprofilebyemail/:email', UserController.getUserProfilebyemail);
router.post('/modifyuser', UserController.modify);
router.post('/ChangePassword',UserController.ChangePassword);
router.delete('/users/delete/:id',UserController.delete);  
router.delete('/courses/delete/:id',CourseController.delete); 
router.post('/verifyemail/:email/:nb',UserController.verifyemail);   
router.post('/addCourse',upload.single('image'), CourseController.addCourse);
router.post('/ModifyCourse',upload.single('image'), CourseController.modifyCourse);
router.get('/getCourse', CourseController.getcourse);
router.get('/getonecourse/:id', CourseController.getonecourse);
router.get('/getmycourses/:email', CourseController.getteachercourses);
router.get('/courses', [], CourseController.findCourseByCategory);
router.put('/courses/:id/rate', [], CourseController.rateCourse);
router.patch('/courses/:user/:course', [], CourseController.purchaseCourse);
router.post('/message', [middlewares.user], MessageController.send);
router.post('/courses/:id/invite-user', [], OrderController.createCourseEvent)
router.get('/message', [middlewares.user], MessageController.get);
router.delete('/message', [middlewares.user], MessageController.deleteReceivedMessages);
router.delete('/message/:id', [middlewares.user], MessageController.delete);
//Orders
router.post('/createOrder',OrderController.createOrder);
router.post('/fcm-token', [middlewares.user], UserController.saveFcmToken);
router.get('/getteacherorders/:email',OrderController.getteacherorders);
router.get('/getlearnerorders/:email',OrderController.getlearnerorders);
router.post('/orders/updatestatus',upload.none(),OrderController.updatestatus);
//quizz
router.post('/quizz/addQuizz',upload.single('image'), quizzContoller.addQuizz);
router.get('/quizz/getQuizz', quizzContoller.getquizz);
router.get('/quizz/getonequizz/:id', quizzContoller.getOneQuizz);


router.use('/uploads', express.static(__dirname +'/uploads'));


  
  
  router.post('/updateImg', upload.single('profilepic'), async(req, res, next) => {
 console.log('updating...')
    url = req.protocol + "://" + req.get("host"); 
    userx.findOneAndUpdate(
       { email: req.body.email },
       {
         $set: {
 
           profilepic: url + "/uploads/" + req.file.filename,
         },
       },
       { new: true },
       (err, userx) => {
         if (err) return res.status(500).send(err);
         const response = {
          
           data: userx.profilepic,
         };
         return res.status(200).send(response);
       }
     );
     
  });


module.exports = router;