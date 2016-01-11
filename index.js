var express = require('express'),
    app = express(), // init express
    fs = require('fs'), // file handler
    path = require('path'), // path tools
    busboy = require('connect-busboy'), // file upload middleware
    uploadDir = path.join(__dirname, 'upload')
    ;

app
    .use('/public', express.static('public'))
    .use('/upload', express.static('upload'))
    .use(busboy())
    .set('view engine', 'ejs')
    ;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/uploadFile', function(req, res) {
    if (req.busboy) {
        /**
         * If the request get a file, we have an event.
         */
        req.busboy.on('file', function(fieldName, fileStream, fileName, encoding, mimeType) {
            /**
             * Make secure filenames and place time tag.
             * @type {string}
             */
            fileName = Number(new Date()) + '_' + fileName.replace(/[^a-z0-9.]/gi, '_');
            var writeStream = fs.createWriteStream(path.join(uploadDir, fileName));
            fileStream.pipe(writeStream);
            writeStream.on('close', function() {
                console.log("Upload Finished of " + fileName);
                /**
                 * The response will be a json, where we say success is true.
                 */
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ success: true }));
            });
        });
        return req.pipe(req.busboy);
    }
    console.error('busboy was not loaded');
});

app.get('/list_files', function (req, res) {
    var fileItems = [],
        listDone = 0,
        renderClock = null,
        renderDone = function() {
            if (renderClock) {
                clearTimeout(renderClock);
            }
            /**
             * Render main view "index.ejs" with "fileItems".
             * It will show if empty too.
             */
            res.render('index', {
                uploadFiles: fileItems
            });
        };
    /**
     * The "fs.readdir" give back the filenames.
     */
    fs.readdir(uploadDir, function(err, fileNames) {
        if (err) {
            console.error(err);
        }
        if (!fileNames.length) {
            return renderDone();
        }
        for (var i = 0; i < fileNames.length; i++) {
            var fileName = fileNames[i],
                fileRelPath = path.join('upload', fileName),
                fileAbsPath = path.join(uploadDir, fileName);
            /**
             * The "fs.stat" give back the details of one file.
             */
            fs.stat(fileAbsPath, function(fName, frPath, faPath) {
                return function(err, stats) {
                    stats.fileName = fName;
                    stats.filePath = frPath;
                    fileItems.push(stats);
                    listDone++;
                    /**
                     * If we have all details, it's time to render.
                     */
                    if (listDone == fileNames.length) {
                        renderDone();
                    }
                }
            }(fileName, fileRelPath, fileAbsPath));
        }
    });
    /**
     * File list timeout.
     * If the process is longer than time (ms), render without list.
     */
    renderClock = setTimeout(renderDone, 3000);
});

app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});
