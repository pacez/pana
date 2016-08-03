var color = require('colorful'),
    client=require('ftp'),
    ftp=new client(),
    fs = require('fs');

var dateFormat=function(date){
  var fillZero=function(num){
    return num < 10 ? '0'+num: num;
  }
  return date.getFullYear()
  +"-"+fillZero(date.getMonth()+1)
  +"-"+date.getDate()
  +" "+date.getHours()
  +":"+date.getMinutes()
  +":"+fillZero(date.getSeconds());
};

module.exports = function(path) {
  fs.readFile('pana-config.json', 'utf8', function(error, data) {
    if (!error) {
      var ftpConfig = JSON.parse(data).ftpSync,
          currentRoot = process.cwd(),//获取相对路径
          relativePath = path.replace(currentRoot, '').replace(/\\/g, '/'),
          uploadPath = ftpConfig.host+':'+ftpConfig.port+ relativePath;

      var filesToString='upload ' +path+ ' to ' +uploadPath;

      ftp.on('ready', function() {
        console.log(color.blue('FTP uploading...'));
        ftp.put(path, relativePath, function(err) {
          if (err) throw err;
          ftp.end();
          console.log(color.green(filesToString+" "+dateFormat(new Date())+" " +'uploaded successfully!'));
          console.log("Watching... CTRl+C Stop");
        });
      });

      //ftp连接异常捕获
      ftp.on('error',function(err){
        console.log(color.red(err));
      });

      ftp.connect({
        host: ftpConfig.host,
        port: ftpConfig.port,
        user: '',
        password: ''
      });

    } else {
      console.log(color.red("Cann't found pana-config.json, Please Ctrl+C Stop!"));
    }
  });
};
