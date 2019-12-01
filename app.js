var express = require("express");
var app = express();
var mongoose = require("mongoose");
//var bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.use(express.static("./public"));


mongoose.connection.once("open", function () { console.log("//////") });


mongoose.connect("mongodb+srv://boss:ABCabc123@cluster0-iiqnu.azure.mongodb.net/DB1?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
        console.log("DataBase Connected");

console.log(mongoose.connections.length);

        var todo = mongoose.model("todos", new mongoose.Schema(
           
            { item: { type: String, minlength: 1 } },
            { timestamps: true }
        ));






        app.get("/", function (req, res) {


            todo.find({}, function (err, docs) {
                //  console.log(docs);


                res.render("index", { docs: docs.reverse() })

            });





        })
       
        app.post("/",  express.urlencoded({extended:true}), function (req, res) {
            //console.log(req.body.item);

            todo.create({ item: decodeURIComponent(req.body.item) })
                .then(function (doc) {
                    console.log({ item: decodeURIComponent(req.body.item) });
                    res.json({ item: decodeURIComponent(req.body.item) })

                }).catch(function (err) {
                    throw err;
                });


        })

        app.delete("/:item", function (req, res) {
            console.log(req.url);
            console.log((req.params.item));


            //Note: req.params.item is auto decoded, no need to   decordeURIComponent(req.params.item )
            todo.find({ item: req.params.item }).deleteMany(function (err) {


                res.send(req.params.item)
 
            });



        });












    })





app.listen(process.env.PORT || 80);