export function formatTime(dateStr) {
  let now = Date.now();
  let target = new Date(dateStr).getTime();

  let timeBetween = Math.abs(now - target) / 1000;

  switch (true) {
    case timeBetween < 60:
      return "刚刚";
    case timeBetween < 3600:
      return parseInt(timeBetween / 60) + "分钟前";
    case timeBetween < 3600 * 24:
      return parseInt(timeBetween / 3600) + "小时前";
    default:
      return parseInt(timeBetween / (24 * 3600)) + "天前";
  }
}
