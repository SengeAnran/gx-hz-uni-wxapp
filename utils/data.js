/**
 * @desc 日期格式化
 * @param {string} format 例：yyyy-MM-dd
 * @param {string} date 日期
 * @return {string} 格式化后的日期
 */
export function formatDate(format, date) {
  console.log(date);

  date = date instanceof Date ? date : new Date(date);
  var o = {
    "M+": date.getMonth() + 1, // month
    "d+": date.getDate(), // day
    "h+": date.getHours(), // hour
    "m+": date.getMinutes(), // minute
    "s+": date.getSeconds(), // second
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
  };
  console.log(o, date);
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
}

/**
 * @desc 解析 url 参数
 * @param {string} urlStr url链接
 * @param {string} urlKey 需要解析的参数
 * @param {boolean} isHashMode 参数是否在hash里
 * @return {string} 匹配到的param值
 */
export function getUrlParam(urlStr, urlKey, isHashMode) {
  const url = new URL(urlStr);
  const reg = new RegExp("[?&]" + urlKey + "=([^&]*)(&?)", "i");
  const r = isHashMode ? url.hash.match(reg) : url.search.match(reg);
  return r ? r[1] : "";
}

/**
 * @desc 延迟执行函数
 * @param {number} time 毫秒
 * @return {void}
 */
export function delayExec(time = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
