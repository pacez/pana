var color = require('colorful'),
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
          uploadPath = ftpConfig.host + relativePath;

      console.log('upload ' +path+ ' to ' +uploadPath);
      console.log(color.green(dateFormat(new Date()))+" " + color.green('uploaded successfully!'));
      console.log("Watching... CTRl+C Stop");
    } else {
      console.log(color.red("Cann't found pana-config.json, Please Ctrl+C Stop!"));
    }
  });
};
