export function dateToString(date: Date) {
  let year = date.getFullYear();
  let month = two(date.getMonth() + 1);
  let day = two(date.getDate());
  let hour = two(date.getHours());
  let min = two(date.getMinutes());
  let sec = two(date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

export function toValue(str: string, len: number) {
  let strLen = str.length;
  if (strLen <= len) {
    while (str.length < len) {
      str = "0" + str;
    }
    return `0.${str}`;
  } else {
    return `${str.substr(0, strLen - len)}.${str.substr(strLen - len)}`;
  }
}

export function average(data: { rtime: string; hr: number }[], lastHours: number) {
  let now = new Date();
  now.setHours(now.getHours() - lastHours);

  let list = data.filter(m => {
    return new Date(m.rtime) > now;
  });
  let total = 0;
  list.map(m => {
    total += m.hr || 0;
  });
  return (total / list.length).toFixed(2);
}

function two(value: number) {
  if (value < 10) {
    return `0${value}`;
  }
  return value.toString();
}
