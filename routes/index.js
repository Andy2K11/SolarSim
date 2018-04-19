var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log('root');
});

router.get('/app', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../solar-app/dist/index.html'));
    console.log('app');
});

module.exports = router;
