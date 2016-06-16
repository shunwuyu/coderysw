var router = require('express').Router();
var AV = require('leanengine');
router.get('/rechargeData', function(req,res,next) {
    res.json({status:'ok'});
});
router.get('/recharge', function(req,res,next) {
    var query = new AV.Query(AV.User);
    query.find({
        success: function(users) {

            res.render('fee/recharge',{users:users});
        },
        error: function(err) {

        }
    });

});


router.get('/cost_list', function(req,res,next) {
	res.render('fee/cost_list',{});
});

router.get('/cost_list_data', function(req, res, next) {
	res.json({
		results:[
			{
				title:'矿泉水1元',
				date:'2016-3-2 10:10:10'
			},
            {
				title:'可乐2元',
				date:'2016-3-2 10:10:10'
			}
		]
	});
})
module.exports = router;
