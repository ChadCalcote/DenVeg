const { singleMulterUpload, singlePublicFileUpload } = require('../awsS3')
const express = require('express');
const router = express.Router();

router.use(express.json({ limit: "200mb" }));
router.use(express.urlencoded({ limit: "200mb", extended: true }));

router.post('/',
    singleMulterUpload("bubblebop"),
    async (req, res, next) => {
        try {
            const urlOnS3 = await singlePublicFileUpload(req.file);
            console.log(urlOnS3); // Put it in the database
            res.json({ message: "hi" });
        } catch(e) {
            next(e);
        }
});

module.exports = router;