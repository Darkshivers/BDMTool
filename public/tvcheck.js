function checktv(dspvalue) {

  var tv;

  if (dspvalue >= 2500 && dspvalue < 3500){
    tv = '32"';
    return tv;
}

if (dspvalue >= 3500 && dspvalue < 4200 ){
   tv = '43" and under'
   return tv;
}

if (dspvalue >= 4200 && dspvalue < 6400){
   tv = '49" and under '
   return tv;
}

if (dspvalue >= 6400){
   tv = '55" and under '
   return tv;
}

else if (dspvalue < 2500){
   tv = 2500 - dspvalue + " " + "Points Required";
   return tv;
}
  
  

}