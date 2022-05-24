
  const dayjs = require("dayjs");

  
  var now = dayjs();
  var time = now.format();


time = time.slice(0,16).split('T').join(' ')



