/**
 * 首页
 */
var router = require('../../routes/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LPL' });
});

