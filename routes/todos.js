var router = require('express').Router();
var AV = require('leanengine');
var Todo = AV.Object.extend('Todo');
router.get('/', function(req, res, next) {
    var query = new AV.Query(Todo);
    query.descending('createdAt');
    query.find({
        success: function(results) {
            console.log(results);
            res.render('todos', {
                title: 'TODO 列表',
                todos: results
            });
        },
        error: function(err) {

        }
    });

    
});

router.post('/', function(req, res, next) {
    var content = req.body.content;
    var todo = new Todo();
    todo.set('content',content);
    todo.save(null, {
        success: function(todo) {
            res.redirect('/todos');
        },
        error: function(err) {
            next(err);
        }
    });
});
module.exports = router;
