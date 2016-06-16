var router = require('express').Router();
var AV = require('leanengine');
var Lesson = AV.Object.extend('Lesson');
var LessonRecord = AV.Object.extend('LessonRecord');
var url = require('url');
//通过express 创建router 路由
//    /meituan/deal/
router.get('/',function(req,res,next) {
    res.render('lesson/index',{});
});

router.get('/list',function(req,res,next) {

    res.render('lesson/list',{});
});

router.get('/detail/:id',function(req,res,next) {
    var query = new AV.Query(AV.User);
    var id = req.params.id;
    query.find().then(function(users) {
        return users;
    }).then(function(users) {
        var recordQuery = new AV.Query(LessonRecord);
        recordQuery.equalTo('lid',id);
        recordQuery.include('user');
        recordQuery.include('lesson');
        recordQuery.find({
            success: function(records) {

                var data = [];
                for(var i = 0; i < users.length; i++) {
                    var item = {name:users[i].get('truename'),status:0,id:users[i].id};
                    for(var j = 0; j < records.length; j++) {
                        // console.log();
                        // console.log(i + '  ' + j + records[j].get('user').get('truename') );
                        // console.log(users[i].get('truename'));
                        if( records[j].get('user').get('truename') == users[i].get('truename')) {
                            // console.log(records[j].get('status'));
                            item.status = records[j].get('status');
                        }

                        // console.log(record.get('user'));

                        // if(users[i] == record.get('user')) {
                        //     item.status = record.get('status');
                        // }
                    }

                    data.push(item);
                    
                }

                res.render('lesson/detail',{data:data,id:id});
            }
        });


    })

});

router.get('/add',function(req,res,next) {
    res.render('lesson/add',{});
});

router.post('/add',function(req,res,next) {
    // console.log(req.body);
    var lesson = new Lesson();
    lesson.set('title',req.body.title);
    lesson.set('cat',parseInt(req.body.cat));
    lesson.save().then(function(o) {
        res.redirect('/lesson/list');
    },function(error) {

    });
});

router.get('/api/list', function(req,res,next) {
    var query = new AV.Query(Lesson);
    query.find().then(function(lessons) {
        var data = {"status":"ok",list:[]};
        for(var i = 0; i < lessons.length; i++) {
            var item = lessons[i];
            data['list'].push({title:item.get('title'),id:item.id});
        }
        // console.log(data);
        res.json(data);
    }, function(error) {

    });
})

router.get('/api/saveLessonRecord', function(req,res,next) {
    var arg = url.parse(req.url, true).query;
    var lid = arg.lid;
    var uid = arg.uid;
    var query = new AV.Query(AV.User);
      query.get(uid).then(function (user) {
        return user;
      }, function (error) {
        // 失败了
    }).then(function(user) {
        var lessonQuery = new AV.Query(Lesson);
        lessonQuery.get(lid).then(function(lesson) {
            console.log(user);
            console.log(lesson);
            var record = new LessonRecord();
            record.set('user',user);
            record.set('lesson',lesson);
            record.set('lid',lid);
            record.set('status',2);
            record.save().then(function() {
                res.json({'status':'ok'});
            });
        }, function(error) {

        });
    })

})
module.exports = router;  // 告知外界调用
