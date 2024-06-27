import express from 'express';
import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let router = express.Router();

//Route base/youtube
router.route('/getTitle').post(async (req, res) => {
    try {
        const videoUrl = req.body.link;
        if (!ytdl.validateURL(videoUrl)) return res.status(500).send('Invalid Url');
        const info = await ytdl.getInfo(videoUrl);
        const title = info.videoDetails.title;

        res.status(200).send(title);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.route('/downloadVideo').post(async (req, res) => {
    try {
        const videoUrl = req.body.link;
        if (!ytdl.validateURL(videoUrl)) return res.status(500).send('Invalid Url!');
        const options = {
            quality: 'highestaudio',
            filter: 'audioonly',
        };

        const info = await ytdl.getInfo(videoUrl); //Query youtube video
        const title = info.videoDetails.title;
        //May want to sanitize and check for illegal characters in url
        const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
        const __dirname = path.dirname(__filename); // get the name of the directory
        const videoPath = path.join(__dirname, 'temp', `${title}.mp3`);
        const videoWriteStream = fs.createWriteStream(videoPath);

        ytdl(videoUrl, options).pipe(videoWriteStream);
        videoWriteStream.on('finish', () => {
            res.download(videoPath, `${title}.mp3`, () => {
                fs.unlinkSync(videoPath); //Delete file once its downloaded
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

export default router;
