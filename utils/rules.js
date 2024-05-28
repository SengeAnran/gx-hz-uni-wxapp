const rules = {
  text: {
    type: "string",
    required: true,
    message: "请输入",
    trigger: ["blur", "change"],
  },
  number: {
    type: "number",
    required: true,
    message: "请输入",
    trigger: ["blur", "change"],
  },
  mobile: [
    {
      required: true,
      message: "请输入手机号",
      trigger: ["change", "blur"],
    },
    {
      // 自定义验证函数，见上说明
      validator: (rule, value, callback) => {
        // 上面有说，返回true表示校验通过，返回false表示不通过
        // uni.$u.test.mobile()就是返回true或者false的
        return uni.$u.test.mobile(value);
      },
      message: "手机号码不正确",
      // 触发器可以同时用blur和change
      trigger: ["change", "blur"],
    },
  ],
  time: {
    type: "string",
    required: true,
    message: "请选择",
    trigger: ["change", "blur"],
  },
  arr: {
    type: "array",
    min: 1,
    required: true,
    message: "至少新增一项数据",
    trigger: ["change"],
  },
  image: {
    type: "array",
    min: 1,
    required: true,
    message: "请上传图片",
    trigger: ["change"],
  },
};
export default rules;
