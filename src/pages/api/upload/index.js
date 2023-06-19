import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
   
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            // console.log(files);
            // console.log(req.body);
            var oldPath = files.file[0].filepath;
            var newPath = `./public/static/images/product-images/${files.file[0].originalFilename}`;
            console.log(newPath);
            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({ newPath })
        })
    })
    
}