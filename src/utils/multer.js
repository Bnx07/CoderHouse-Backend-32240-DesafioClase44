import multer from 'multer';
import __dirname from './utils.js';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let route = 'documents';
        if (file.fieldname == 'thumbnail') route = 'profile';
        if (file.fieldname == 'image') route = 'images';
        console.log(route);
        cb(null, __dirname + `/public/userImages/${route}`);
        //cb(null, `./public/userImages/${route}`)
    },
    filename: function(req, file, cb) {
        let user = req.user;
        let filename = `${Date.now()}-${file.originalname}`
        if (file.fieldname != 'image' && file.fieldname != 'thumbnail') filename = `${user.email}-${file.fieldname}`
        
        let fileExtension = file.mimetype.split('/');

        cb(null, `${filename}.${fileExtension[1]}`);

        //const fileExtension = file.mimetype.split('/')[file.mimetype.split('/').length-1];
        //cb(null, `${req.user.email}-${file.fieldname}.${fileExtension}`);
    }
})

const uploader = multer({ storage: storage });

const saveDocs = uploader.fields([{name: 'thumbnail'}, {name: 'image'}, {name: 'location'}, {name: 'accState'}, {name: 'identification'}]);

const upload = multer();

export const reviewDocs = upload.fields([{name: 'thumbnail'}, {name: 'image'}, {name: 'location'}, {name: 'accState'}, {name: 'identification'}])

export default saveDocs;