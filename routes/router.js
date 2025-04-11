const { Router } = require("express");
const upload = require("../services/multer");
const { files } = require("../db");
const { io } = require("../services/socket");

const router = new Router();


router.post("/upload",upload.single('file'),(req,res)=>{

    if(!req.file){
        res.status(400).json({success:false,message:"No file uploaded."})
    }
    const newFile = {
        filename:req.file.originalname,
        path:req.file.path

    }

    files.push(newFile)

    res.status(200).json({success:true,message:"file uploaded successfully."})

    io().emit("updateFileList",files)

})
router.get("/download/:filename",(req,res)=>{
    const filename = req.params.filename;
    const filepath = "./uploads/"+filename;

    res.download(filepath,(err)=> {
        if(err){
            res.status(500).json({
                success:false,
                message:"Error downloading file."
            })
        }
    })
})

module.exports = router