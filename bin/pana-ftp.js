var color=require('colorful'),
    fs=require('fs');


module.exports = function(path) {
  fs.readFile('pana-config.json','utf8',function(error,data){
    if(!error){
      var ftpConfig=JSON.parse(data).ftpSync,

      //获取相对路径
      currentRoot=process.cwd(),
      relativePath=path.replace(currentRoot,'').replace(/\\/g,'/'),
      uploadPath=ftpConfig.host+relativePath;

      console.log('upload '+color.bold(path)+' to '+color.bold(uploadPath)+" -- "+color.green('success'));
    }else{
      console.log(color.red("Cann't found pana-config.json, Please Ctrl+C Stop!"));
    }
  });
};

