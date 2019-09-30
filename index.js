const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
const port = 3000
var formidable = require('formidable');
var fs = require('fs');

app.get('/', (req, res) => res.sendFile(__dirname +'/index.html'))

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

app.post('/upload',(req,res) => {
    console.log("post called");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log(files);
      console.log(fields);
      base64_decode(fields.data, 'test.xlsx');

    //   var oldpath = files.filetoupload.path;
    //   var newpath = __dirname + "/" + files.filetoupload.name;
    //   fs.rename(oldpath, newpath, function (err) {
    //     if (err) throw err;
    //     res.write('File uploaded and moved!');
    //     res.end();
    //   });
})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))