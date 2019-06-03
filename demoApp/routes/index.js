var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// router.get('/api/showData', function(req, res) {
//         var db = mongoose.connect('mongodb://localhost:27017/hbdbdemo' ,{ useNewUrlParser: true });
//         //var modelVarObj = new modelVar();
//         // use mongoose to get all todos in the database
//         modelVar.find(function(err, data) {
//             // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//             if (err)
//                 res.send(err)
//             console.log(data);
//             res.json(data); // return all todos in JSON format
//         });
//     });
