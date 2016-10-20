var express = require('express');
var router = express.Router();
const crypto = require('crypto');
/* GET home page. */
router.get('/wechat/hello', function(req, res, next) {
  res.render('index', { title: 'hello wechat !' });
});
const token = 'zhaoxudongs';
const handleWechatRequest = function(req,res,next){
	const { signature, timestamp, nonce, echostr } = req.query;
	if(!signature || !timestamp || !nonce ){
		return res.send('invalid request');
	}

	if(req.method === 'POST'){
		console.log('handleWechatRequest.post:',{body: req.body, query:req.query});
	}
	if(req.method === 'GET' ){
		console.log('handlWechatRequest.get:',{get:req.body});
		if(!echostr){
			return res.send('invalid request');
		}	
	}

	// token,timestamp,nonce zidianpaixu;
	const params = [token,timestamp,nonce];
	params.sort();
	
	const hash = crypto.createHash('sha1');
	const sign = hash.update(params.join('')).digest('hex');
	
	if(signature === sign){
		res.send(echostr);
	}else{
		res.send('invalid sign');
	}

};


router.get('/api/wechat',handleWechatRequest);
router.post('/api/wechat',handleWechatRequest);

module.exports = router;
