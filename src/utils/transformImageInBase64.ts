export const transformImageInBase64 = (file : File,cb : Function) => {
  const  OneMegabyte = 1000000
  const reader = new FileReader();
  reader.readAsDataURL(file);
  if(file.size > OneMegabyte){
    alert("More then 1 Megabyte")
    return ""
  }
  reader.onload = function () {
    console.log(reader.result);
    cb(reader.result)

  };


}
