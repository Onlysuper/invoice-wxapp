export default {
 // 防抖
  _debounce(fn, delay) {
    var delay = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
  },
  // 节流
  _throttle(fn, interval) {
    var last;
    var timer;
    var interval2 = interval || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval2) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval2);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
  },
  accMul(arg1, arg2) {
      arg1 = arg1 || 0;
      var m = 0,
              s1 = arg1.toString(),
              s2 = arg2.toString();
      try {
              m += s1.split(".")[1].length
      } catch (e) { }
      try {
              m += s2.split(".")[1].length
      } catch (e) { }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  /**
   * 模拟一个数字订单编号 规则时随机数位数 + 时间戳
   * @param {随机数位数} frontLen
   */
  randomDateNow: function (frontLen) {
    frontLen = frontLen || 0;
    return 9 + Math.random().toString().substr(3, frontLen) + Date.now()
  },
  // 对象字典序
  sortByLetter(data = {}) {
    let resultdata = {};
    var _keys = Object.keys(data).sort();
    for (let index in _keys) {
            resultdata[_keys[index]] = data[_keys[index]]
    }
    return resultdata;
  }
}
