const express = require('express')
const path = require('path')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const multer = require('multer')
const { error } = require('console')
const { stat } = require('fs')
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors({
    origin: "http://localhost:3000",
}))
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: "blogpage",
})

db.connect(err => {
    if (err) {
        console.log("Error")
    } else {
        console.log("Connected to sql")
    }

})

app.get('/', (req, res) => {
    db.query("SELECT * FROM blogs", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Databse Query Failed" })
            return;
        } else {
            res.json(results)
        }

    })


})


app.delete('/', (req, res) => {
    let id = req.query.id;
    db.query("DElETE FROM blogs WHERE id=" + id, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Query Failed" })
            return;
        } else {
            res.json(results)
        }
    })
})

app.post('/upload', upload.single('image'), async(req, res) => {
    let {title,desc,date,metatitle,metadesc,video_url,saveAs,tags} = await req.body;
    // let data = await req.body;
    let imageBuffer =await req.file.buffer;
    // image = image.replace(/\\/g, '\\\\'); 
    // return res.json({success:})
    if (!title || !desc || !date || !req.file || !metatitle || !metadesc || !video_url || !tags) {
        return res.status(400).json({ message: 'All fields are required' });
    }  
    let status=(saveAs==='true')?"publish":"draft";
    // return res.json([{image:data}])
    db.query(`INSERT INTO blogs (Title, Description, Date, image,meta_title,meta_description,video_url,status,tags) VALUES (?,?,?,?,?,?,?,?,?)`,[title, desc, date, imageBuffer,metatitle,metadesc,video_url,status,tags], (err, results) => {
        if (err) {
            res.status(500).json({ error: err })
            return;
        } else {
            res.json(results)
        }
    })
})


app.put("/edit",upload.single('image'), async (req, res) => {
    let { title, desc, date, id,metatitle,metadescription,video_url,tags} = await req.body;
    let imageBuffer;
    try{
        let tempBuffer=await req.file.buffer;
        imageBuffer=tempBuffer;
    }catch(err){
        imageBuffer = await new Promise((resolve, reject) => {
            db.query("select image from blogs where id=?", [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0].image);
                }
            });
        });
    }

    console.log(video_url)
    db.query("UPDATE blogs SET Title = ?, Description = ?, Date = ?, image = ?, meta_title= ? , meta_description = ?, video_url = ?, tags= ? WHERE id = ?",[title,desc,date,imageBuffer,metatitle,metadescription,video_url,tags,id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err })
        }
        else {
            // console.log("UPDATE blogs SET Title = ?, Description = ?, Date = ?, image = ?, meta_title= ? , meta_description = ?, video_url = ?, tags= ? WHERE id = ?",[title,desc,date,imageBuffer,id,metatitle,metadescription,video_url,tags])
            res.json(results)
        }
    })
})

app.get('/search',upload.single('image'),(req,res)=>{
    let id=req.query.id;
    db.query("select * from blogs where id=?",[id],(err,results)=>{
        if(err){
            return res.json({error:err})
        }
        else{
            return res.json(results)
        }
    })

})


app.get('/publish',(req,res)=>{
    let id= req.query.id;
    if(!id){
        return res.json({error:"Id is required"})
        
    } else{
        db.query("Update blogs set status='publish' where id=?",[id],(err,results)=>{
            if(err){
                return res.json({error:err})
            } else {
                return res.json({results})
            }
        })
    }
    
})
app.get('/draft',(req,res)=>{
    let id= req.query.id;
    if(!id){
        return res.json({error:"Id is required"})
        
    } else{
        db.query("Update blogs set status='draft' where id=?",[id],(err,results)=>{
            if(err){
                return res.json({error:err})
            } else {
                return res.json({results})
            }
        })
    }
    
})
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000")
})