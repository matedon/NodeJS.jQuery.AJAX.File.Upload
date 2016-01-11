var express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    multer = require('multer'),
    busboy = require('connect-busboy');

app
    .use('/public', express.static('public'))
    .use(busboy());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/upload', function(req, res) {
    if (req.busboy) {
        req.busboy.on('file', function(fieldName, fileStream, fileName, encoding, mimeType) {
            fileName = Number(new Date()) + '_' + fileName.replace(/[^a-z0-9]/gi, '_');
            var writeStream = fs.createWriteStream(path.join(__dirname, 'upload', fileName));
            fileStream.pipe(writeStream);
            writeStream.on('close', function() {
                console.log("Upload Finished of " + fileName);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ success: true }));
            });
        });
        return req.pipe(req.busboy);
    }
    console.error('busboy was not loaded');
});

app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});
