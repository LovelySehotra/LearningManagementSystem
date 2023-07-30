import path from "path";
import multer from "multer";

const upload = multer({
    dest:"uploads/",
    limits:{fileSize:50*1024*1024},
    storage:multer.diskStorage({
        destination:"uploads/",
        filename:(_req,file,cb)=>{
            cb(null,file.originalname);
        },
    }),
    fileFilter:(_req,file,cb)=>{
        let ext = path.extreme(file.originalname);
        // console.log('Filter>',file);
        if(
            ext!==".jpg" &&
            ext!==".jpeg" &&
            ext!==".webp" &&
            ext!==".png" &&
            ext!==".mp4" 
        ){
            cb (new Error(`Unsuppored file type ! ${ext}`),false);
            return;
        }
        cb(null,true);
    },
});
export default upload;