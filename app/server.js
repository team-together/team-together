var express = require('express');
var app = express();
var fs = require("fs");

// app.all('', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

function addHeader(res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
}

//获取事件列表
app.get('/EventList', function (req, res) {
	addHeader(res);

	fs.readFile(__dirname + "/data/" + "events.json", 'utf8', function (err, data) {
		res.end(data);
	});
})

//获取事件详情
app.get('/GetEvent/:id', function (req, res) {
	addHeader(res);

	fs.readFile(__dirname + "/data/" + "events.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		var user = data[req.params.id];
		res.end(JSON.stringify(user));
	});
})

//添加新事件
app.get('/AddEvent', function (req, res) {
	addHeader(res);
	var fileName = __dirname + "/data/" + "events.json";

	fs.readFile(fileName, 'utf8', function (err, data) {

		data = JSON.parse(data);

		var newkey = 0;
		for(var i = 1; ;i++){
			var key = "event" + i;
			var obj = data[key];
			if(obj == null) {
				newkey = i;
				break;
			}
		}

		data["event" + newkey] = {
			"title": req.query.title,
			"description": req.query.description,
			"introduction": req.query.introduction,
			"time": req.query.time,
			"phone": req.query.phone,
			"email": req.query.email,
			"address": req.query.address,
			"image": "../../assets/event1.png",
		};

		var strData = JSON.stringify(data);
		res.end(strData);
		fs.writeFile(fileName, strData, null, function (err) {
			res.end("OK");
		});
	});
})

//添加的新用户数据
var user = {
	"user4": {
		"name": "mohit",
		"password": "password4",
		"profession": "teacher",
		"id": 4
	}
}

//添加新用户
app.get('/AddUser', function (req, res) {

	var fileName = __dirname + "/data/" + "users.json";

	fs.readFile(fileName, 'utf8', function (err, data) {
		data = JSON.parse(data);
		data["user4"] = user["user4"];
		var strData = JSON.stringify(data);
		fs.writeFile(fileName, strData, null, function (err) {
			//console.log(data);
			res.end(strData);
		});
	});
})

//删除用户
app.get('/User--', function (req, res) {
	fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		delete data["user" + 2];
		console.log(data);
		res.end(JSON.stringify(data));
	});
})

//显示用户详情
app.get('/:id', function (req, res) {
	fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		var user = data["user" + req.params.id];
		console.log(user);
		res.end(JSON.stringify(user));
	});
})

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().por;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
})

