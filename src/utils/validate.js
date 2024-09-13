// 验证纯数字
export function isValidNum(num) {
  var reg = /^[0-9]*$/
  return reg.test(num);
} 

// 验证仅包含数字和字母
export function isValidNumAndLetter(val) {
  var reg = /^[a-zA-Z0-9]*$/
  return reg.test(val);
} 

// 验证IP地址
export function isValidIP(ip) {
  var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip);
} 

// 验证url地址
export function isValidUrl(val) {
  var reg = /^(http|https):\/\/[\S]+$/
  return reg.test(val);
} 


