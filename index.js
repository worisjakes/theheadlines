var express = require('express');
var app = express();
var path = require("path");
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var bodyParser = require("body-parser");
var Admin = require(__dirname + '/Model/Admin');
var World = require(__dirname + '/Model/world');
var Audio = require(__dirname + '/Model/audio');
var Order = require(__dirname + '/Model/Order');
var Witness = require(__dirname + '/Model/Witness')
var Headlines = require(__dirname + '/Model/headlines');
var mongoose = require('mongoose');
var paginate = require("mongoose-paginate");
mongoose.connect('mongodb://localhost:27017/headlines');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
app.set('view engine', 'pug');
app.set('views', './static/views');
app.use(express.static(path.join(__dirname, "/static")))
app.use(express.static(path.join(__dirname, "/uploads")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.get('/admin', (req,res)=>{
    res.render('admin.pug');
});
app.post('/adminlogin', (req,res)=>{
    if(req.body.username  && req.body.password){
        adminData ={
            username: req.body.username,
            password:req.body.password,
        }
        if(req.body.username != "" &&  req.body.password != ""){
            if(req.body.username == "worisj@gmail.com" && req.body.password == "1997JACOB"){
            Admin.create(adminData, (error, user)=>{
                if(error){
                    res.send("Error creating data");
                }else{
                    return res.redirect("/adminhome");
                }
            });
            }else{
                res.send("You are not authorised");
            }
        }else{
            res.send("Fields cannot be empty");
        }
    }

});

app.get('/adminhome', (req,res)=>{
    res.render("adminhome.pug");
});
var d = new Date();
var n = d.toLocaleDateString();
app.get('/home', (req,res)=>{
    Headlines.paginate({}, {page:1, limit:10, sort:{postdate: -1}}, (error,headline)=>{
        if(error){
            res.send(error)
        }else{
            World.find({postdate:n}, (error, result)=>{
        if(error){
            res.send(error)
        }
        else{
            Audio.find({}, (error,audresult)=>{
                 pages = [];
                        if(headline.page ==1){
                            for(var i = 1; i<=headline.pages; i++){
                                pages.push(i)
                            }
                        }
                        console.log(pages)
                if(error) res.send(error)
                res.render("home.pug", {audios:audresult,worldNews:result, headlines:headline.docs, pages:pages});
            });
        }
    });
        }
    });
});
app.get('/filter', (req,res)=>{
    var paper = req.query.paper;
    Headlines.paginate({papername:paper}, {page:1, limit:10, sort:{postdate: -1}}, (error,headline)=>{
        if(error){
            res.send(error)
        }else{
            if(headline.docs.length == 0){
                World.find({postdate:n}, (error, result)=>{
                if(error){
                    res.send(error)
                }
                else{
                    Audio.find({}, (error,audresult)=>{
                    if(error) {
                        res.send(error)
                    }else{
                    res.render("noresult.pug", {audios:audresult,worldNews:result, headlines:headline.docs, page:headline.page, pages:headline.pages});
                }
                    });
                }
        });
            }else{
            World.find({}, (error, result)=>{
                if(error){
                    res.send(error)
                }
                else{
                    Audio.find({}, (error,audresult)=>{
                    if(error) {
                        res.send(error)
                    }else{
                    res.render("home.pug", {audios:audresult,worldNews:result, headlines:headline.docs, page:headline.page, pages:headline.pages});
                }
                    });
                }
        });
    }}
    });
});
app.get("/:id([0-9])",  (req, res)=>{
    var id = req.params["id"];
      Headlines.paginate({}, {page:id, limit:10, sort:{postdate: -1}}, (error,headline)=>{
        if(error){
            res.send(error)
        }else{
            if(headline.docs.length == 0){
                World.find({postdate:n}, (error, result)=>{
                if(error){
                    res.send(error)
                }
                else{
                    Audio.find({}, (error,audresult)=>{
                    if(error) {
                        res.send(error)
                    }else{
                        
                    res.render("noresult.pug", {audios:audresult,worldNews:result, headlines:headline.docs, page:headline.page, pages:headline.pages});
                }
                    });
                }
        });
            }else{
            World.find({postdate:n}, (error, results)=>{
                if(error){
                    res.send(error)
                }else{
            Audio.find({}, (error, audresult)=>{
                if(error){
                    res.send(error)
                        res.send(error)
                    }else{
                        pages = [];
                        if(headline.page >1){
                            for(var i = 1; i<=headline.pages; i++){
                                pages.push(i)
                            }
                        }
                         res.render("home.pug", {audios: audresult, worldNews:results, headlines: headline.docs,pages:pages})
                    }
                })
        
                    
                }
            })
            }
            
        }
    });
});
app.get("/date", (req, res)=>{
    var date = req.query.date;
    Headlines.paginate({postdate:date}, {page:1, limit:10}, (error,headline)=>{
        if(error){
            res.send(error)
        }else{
            if(headline.docs.length == 0){
                World.find({postdate:n}, (error, result)=>{
                if(error){
                    res.send(error)
                }
                else{
                    Audio.find({}, (error,audresult)=>{
                    if(error) {
                        res.send(error)
                    }else{
                    res.render("noresult.pug", {audios:audresult,worldNews:result, headlines:headline.docs, page:headline.page, pages:headline.pages});
                }
                    });
                }
        });
            }
            else{
            World.find({postdate:n}, (error, results)=>{
                if(error){
                    res.send(error)
                }else{
                   Audio.find({}, (error, audresult)=>{
                if(error){
                    res.send(error)
                        res.send(error)
                    }else{
                         res.render("home.pug", {audios: audresult, worldNews:results, headlines: headline.docs, page:headline.page, pages: headline.pages})
                    }
                })
                }
            });
        }
        }
    })
});
app.get('/iwitness', (req,res)=>{
    World.find({postdate:n}, (error, result)=>{
        if(error){
            res.send(error);
        }else{
            Witness.find({}, (error, results)=>{
                if(error){
                    res.send(error);
                }else{
                 Headlines.find({}, (error, resul)=>{
                if(error){
                    res.send(error);
                }else{
                    res.render("iwitness.pug", {worldNews: result, headlines:resul, reports:results});
                }
            })
                }
            }
            )
        }
    });
    
});
app.post('/iwitness', upload.single("image"), (req,res)=>{
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
    if(req.body.email && req.body.name && req.body.location && req.body.report){
            var witnessdata={
                file:req.file.filename,
                name:req.body.name,
                email:req.body.email,
                location:req.body.location,
                report:req.body.report
            }
            Witness.create(witnessdata, (error, user)=>{
                if(error){
                    res.send(error)
                }else{
                    res.redirect("home", 200, {msg: "Uploaded successfully"})
                }
            })
        }
    
});
app.get('/orderNow', (req,res)=>{
    World.find({postdate:n}, (error, result)=>{
        if(error){
            res.send(error)
        }else{
            Headlines.find({}, (error, results)=>{
                if(error){
                    res.send(error);
                }else{
                    res.render("Order.pug", {worldNews: result, headlines:results});
                }
            })
            
        }
    });
});
app.post('/orderNow', (req,res)=>{
    var success = "Order taken success fully";
    var status = 200;
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
    if(req.body.name && req.body.tel && req.body.email && req.body.gender && req.body.papername && req.body.address && req.body.location ){
        var name = req.body.name;
        var tel = req.body.tel;
        var email = req.body.email;
        var gender = req.body.gender;
        var papername = req.body.papername;
        var address = req.body.address;
        var location = req.body.location;
        console.log(name);
        var orderdata = {
            address:address,
            name:name,
            papertype:papername,
            phonenum:tel,
            email:email,
            gender:gender,
            deliveryLocation:location
        }
        if(tel.length<11 || !re.test(email)){
            status = 401;
            success = "Phone or email not correct. Phone must be 11 and email must follow format example@mail.com"
        }else{
            Order.create(orderdata, (error, data)=>{
                if(error){
                    res.send({"error":error});
                }
                else{
                    res.send({"success" : success, "status":status})
                }
            })
        }
    }else{
        success = "All fields are required";
        status = 401;
    }
    
});

app.post('/addheadline', upload.single("imagestatus"), (req,res)=>{
    headlinedata ={
            news:req.body.headline,
            papername:req.body.papername,
            paperpage:req.body.paperpage,
            category:req.body.category,
            imagestatus:req.file.filename,
            postdate:n,
}
    Headlines.create(headlinedata,(error, headlines)=>{
        if(error){
            res.send(error)
        }else{
            res.send("Files uploaded successfully")
        }
    })
});
app.post(('/addaudio'), upload.single("audio"), (req,res)=>{
    audiodata = {
        audioname : req.file.filename,
        postdate:n
    }
     Audio.create(audiodata, (error, result)=>{
        if(error){
            res.send(error);
        }else{
            res.send("Audio uploaded succesffuly");
        }
    })
});
app.post(('/addworldnews'), upload.single("image"), (req,res)=>{
    worldnew = {
        worldnews: req.body.worldnews,
        images:req.file.filename,
        postdate: n,

    }
    World.create(worldnew, (error, worldnews)=>{
        if(error){
            res.send(error);
        }else{
            res.send("Worldnews uploaded succesffuly");
        }
    })
} );
app.listen(8080, ()=>{
   console.log("App listening on port 8080") 
});