const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/stream/:name', (req, res, next) => {
    const name = req.params.name;
    const url = path.join(__dirname, '../public/videos/', name + '.mp4');

    console.log('URL: ' +url);

    fs.stat(url, (err, stats) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        let range = req.headers.range;
        if (!range) {
            return res.sendStatus(416);
        }

        var positions = range.replace(/bytes=/, "").split("-");
        var start = parseInt(positions[0], 10);
        var total = stats.size;
        var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        var chunksize = end - start + 1;

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${total}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4"
        });
        const stream = fs.createReadStream(url, {start, end})
            .on('open', () => {
                stream.pipe(res);
            }).on('error', (err) => {
                res.end(err);
            });
    });
});

module.exports = router;
