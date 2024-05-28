import { uploadFile, baseUrl, http } from "../utils/request.js";
// 单文件上传
export function fileUpload(formData, url) {
  return uploadFile("uploadFile", {
    url: baseUrl + `/api/applet/custom/file/upload/single`,
    method: "POST",
    showLoading: true,
    filePath: url,
    data: formData,
  });
}

// 小程序用户搜索
export function searchUser(data) {
  return http({
    url: `/api/applet/user/app/info`,
    method: "POST",
    showLoading: true,
    data,
  });
}


// 微信小程序登录接口
export function login(data) {
  return http({
    url: `/auth/wxLogin`,
    method: "POST",
    showLoading: true,
    data,
  });
}
// 微信小程序绑定系统用户
export function bandUser(data) {
  return http({
    url: `/auth/wechat/mini/app/bindWechatMiniAppUser`,
    method: "POST",
    showLoading: true,
    data,
  });
}
