var express  = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('servprodb', ['servprolist','cities']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/servprolist', function (req, res){
	console.log("I recieved a GET request");

    db.servprolist.find(function(err, docs){
        console.log(docs);
        res.json(docs);

    });


});

app.post('/servprolist', function (req, res){
    console.log(req.body);
    db.servprolist.insert(req.body, function (err, doc){
        res.json(doc);
    });
});


app.delete('/servprolist:id', function (req, res){
    var id = req.params.id;
    console.log(id);
    db.servprolist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
        res.json(doc);

    });
});
app.get('/servprolist/:id', function (req, res){
    var id = req.params.id;
    console.log(id);
    db.servprolist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
        res.json(doc);

    });
});

app.put('/servprolist/:id', function (req, res){
    var id = req.params.id;
    console.log(req.body.fname);
    db.servprolist.findAndModify({query:{_id: mongojs.ObjectId(id)},
        update: {$set: {fname: req.body.fname, lname: req.body.lname, phone: req.body.phone}},
            new: true}, function (err, doc){
                res.json(doc);
         });
});

app.get('/cities', function (req, res){
    console.log("I recieved a GET request2");
    var cityname = req.params.cityname;
    console.log(cityname);
    db.cities.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});

app.listen(3000);
console.log("Server running on port 3000");