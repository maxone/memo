var mongoose = require('mongoose') ;     // 定义使用组件
var Schema = mongoose.Schema ;  // 创建模式

var MemoSchema = new Schema({
	content :String
});
exports.Memo = mongoose.model('Memo',MemoSchema);
