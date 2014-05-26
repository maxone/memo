var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') ;     // 导入组件
var Memo = require('../models').Memo;    
mongoose.connect('mongodb://localhost/memo') ;    // 连接数据库


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '备忘录' });
});


router.post('/save',function(req,res){
	var memo = new Memo({content:req.body.content});
	memo.save(function(err){
		if(err){
			console.log('err++++'+err);
			res.json({status:'err'});
		}else{
			res.json({status:'ok','memo':memo});
		}
		;		
	});
});

router.get('/list',function(req,res){
	Memo.find({}, null, {sort: {_id: -1}},function(err,memos){
		console.log('---'+memos);
		res.json(memos);
	});
	
});


router.post('/delete',function(req,res){
	
	/*
	//相应的，页面上使用 ids:val.join(),把数组格式化成 1,2,3 形式的字符串
	var ids = req.body.ids;
	console.log('>>>>ids:'+ids);
	
	Memo.remove({_id:{$in:ids.split(",")}},function(err){//还原成数组对象
		if(err){
			console.log("删除失败");
		}else{
			console.log("删除成功");
		}
	});
	
	
	*/
	//相应的，页面上使用 ids:JSON.stringify(val)，直接传递数据对象过来
	var ids = JSON.parse(req.body.ids);
	console.log('>>>>ids:'+ids);
	
	Memo.remove({_id:{$in:ids}},function(err){
		if(err){
			console.log("删除失败");
			res.json({status:'err'});
		}else{
			res.json({status:'ok'});
		}
	});
	
});

module.exports = router;
