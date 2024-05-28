<template>
  <view class="my-container">
    <uni-list>
      <uni-list-item v-for="(item, index) in navList" @click="goPage(item.path)" :to="item.path"  link :key="index" :title="item.title"></uni-list-item>
    </uni-list>
    	<!-- /* 自定义颜色 */ -->
      sssr
    	<u-line color="red"></u-line>
      <u-divider text="分割线"></u-divider>
  </view>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          title: '消息通知',
          path: '/aaa'
        },
        {
          title: '账号设置',
          path: '/bbb'
        },
        {
          title: '学习记录',
          path: '/ccc'
        },
        {
          title: '我的订单',
          path: 'ddd'
        },
        {
          title: '帮助中心',
          path: '/aaa'
        },
        {
          title: '退出登录',
          path: '/pages/index/index '
        }
      ]
    };
  },
  methods: {
    goPage(path) {
      console.log(path);
    }
  }
};
</script>

<style lang="scss">
  page,.my-container {
    height: 100%;
  }
</style>