// import Cookies from "js-cookie";

let urlQueue = {};
export const baseUrl = "http://192.168.5.75:8080";
export function http(config = {}) {
    //  做一些请求的相关配置 url、data、header、method、
  // let token = Cookies.get("TOKEN");
  // let token = '';
  let app = getApp();
  const url = config.url;
  const data = config.data;
  // const header = Object.assign({ token: token }, config.header || {});
  const header = config.header || {};
  const method = config.method ? config.method.toUpperCase() : "GET";
  let map_h5_url = "";
  // if(process.env.NODE_ENV === 'development'){
  // 	baseUrl = url.indexOf('/') === 0 ? 'http://122.227.101.151:8087' : '';
  // }else{
  // 	baseUrl = url.indexOf('/') === 0 ? 'http://122.227.101.151:8087' : '';
  // }

  app.globalData.uploadUrl = baseUrl;
  app.globalData.map_h5_url = map_h5_url;
  if (config.showLoading) {
    if (Object.keys(urlQueue).length === 0) {
      uni.showLoading({
        title: "加载中..",
      });
    }
    urlQueue[url] = true;
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      data,
      header,
      method,
      success: (res) => resolve(res.data.data),
      fail: reject,
      complete: (res) => {
        if (urlQueue[url]) {
          delete urlQueue[url];
          //  保证所有请求请求完后再隐藏加载完成
          if (Object.keys(urlQueue).length === 0) {
            uni.hideLoading();
          }
        }
        let page = getCurrentPages();
        console.log('1000',res);
        if (res.statusCode === 200 && res.data.code !== 500) {
          return;
        }   // if (res.statusCode === 200) {
        //   return;
        // }
        if (!res.data) {
          customAPI("showToast", {
            icon: "none",
            title: res.errMsg,
            duration: 2000,
          });
        } else {
          if (res.data.code == 104 || res.data.code == 105) { // token 过期
            if (page[page.length - 1].route === "pages/my/index") return;
            customAPI("showModal", { title: res.data.msg }).then((result) => {
              if (result.confirm) {
                // uni.redirectTo({
                // 	url: '/packageB/authorize/authorize'
                // })
              }
            });
          } else {
            customAPI("showToast", {
              icon: "none",
              title: res.data.msg,
              duration: 2000,
            });
          }
        }
      },
    });
  });
}

// export function https(config = {}) {
//   // let token = uni.getStorageSync('token');
//   // let token = Cookies.getJSON("TOKEN");
//   let app = getApp();
//   const url = config.url;
//   const data = config.data;
//   // const header = Object.assign({ token: token }, config.header || {});
//   const header = config.header || {};
//   const method = config.method ? config.method.toUpperCase() : "GET";
//   let baseUrl = "";
//   baseUrl = "/api";
//   app.globalData.uploadUrl = baseUrl;
//   // 加载过度动画
//   if (config.showLoading) {
//     if (Object.keys(urlQueue).length === 0) {
//       uni.showLoading({
//         title: "加载中..",
//       });
//     }
//     urlQueue[url] = true;
//   }
//   return new Promise((resolve, reject) => {
//     uni.request({
//       url: baseUrl + url,
//       data,
//       header,
//       method,
//       success: resolve,
//       fail: reject,
//       complete: (res) => {
//         console.log('344',res)
//         if (urlQueue[url]) {
//           delete urlQueue[url];
//           if (Object.keys(urlQueue).length === 0) {
//             uni.hideLoading();
//           }
//         }
//         let page = getCurrentPages();
//         // if (res.statusCode === 200) return;
//         if (!res.data) {
//           customAPI("showToast", {
//             icon: "none",
//             title: res.errMsg,
//             duration: 2000,
//           });
//         } else {
//           console.log('344',res)
//           if (res.data.code == 104 || res.data.code == 105) {
//             if (page[page.length - 1].route === "pages/my/index") return;
//             customAPI("showModal", { title: res.data.msg }).then((result) => {
//               if (result.confirm) {
//                 uni.redirectTo({
//                   url: "/packageB/authorize/authorize",
//                 });
//               }
//             });
//           } else {
//             customAPI("showToast", {
//               icon: "none",
//               title: res.data.msg,
//               duration: 2000,
//             });
//           }
//         }
//       },
//     });
//   });
// }

export function customAPI(funcName, config = {}) {
  return new Promise((resolve, reject) => {
    uni[funcName]({
      ...config,
      success: resolve,
      fail: reject,
    });
  });
}
uni.$customAPI = customAPI
export function uploadFile(funcName, config = {}) {
  // let token = Cookies.get("TOKEN");
  const header = Object.assign({ token: token }, config.header || {});
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      ...config,
      header,
      name: "file",
      success: resolve,
      fail: reject,
    });
  });
}
