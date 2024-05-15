<template>
  <view class="container">
    <view class="usv-iferinfo">
      <block v-if="canIUseNicknameComp && !hasUserInfo">
        <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <image class="avatar" :src="userInfo.avatarUrl"></image>
        </button>
        <view class="nickname-wrapper">
          <text class="nickname-label">昵称</text>
          <input type="nickname" class="nickname-input" placeholder="请输入昵称" @change="onInputChange" />
        </view>
      </block>
      <block v-else-if="!hasUserInfo">
        <button v-if="canIUseGetUserProfile" click="getUserProfile">获取头像昵称</button>
        <view v-else>请使用2.10.4及以上版本基础库</view>
      </block>
      <block v-else>
        <image @click="bindViewTap" class="userinfo-avatar" :src="userInfo.avatarUrl" mode="cover"></image>
        <text class="userinfo-nickname">{{ userInfo.nickName }}</text>
      </block>
    </view>
    <view class="usermotto">
      <text class="user-motto">{{ motto }}</text>
    </view>
  </view>
</template>

<script>
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
export default {
  data() {
    return {
      motto: 'Hello World',
      userInfo: {
        avatarUrl: defaultAvatarUrl,
        nickName: ''
      },
      hasUserInfo: false,
      canIUseGetUserProfile: wx.canIUse('getUserProfile'),
      canIUseNicknameComp: wx.canIUse('input.type.nickname')
    };
  },
  methods: {
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs'
      });
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail;
      const { nickName } = this.userInfo;
      this.userInfo.avatarUrl = avatarUrl;
      this.hasUserInfo = nickName && avatarUrl && avatarUrl !== defaultAvatarUrl;
      if (nickName && avatarUrl && avatarUrl !== defaultAvatarUrl) {
        wx.navigateTo({
          url: '/pages/unitAssignment/unitAssignment'
        });
      }
    },
    onInputChange(e) {
      const nickName = e.detail.value;
      const { avatarUrl } = this.userInfo;
      this.userInfo.nickName  = nickName;
     this.hasUserInfo =  nickName && avatarUrl && avatarUrl !== defaultAvatarUrl;
      if (nickName && avatarUrl && avatarUrl !== defaultAvatarUrl) {
        wx.navigateTo({
          url: '/pages/unitAssignment/unitAssignment'
        });
      }
    },
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
  font-size: 14px;
  line-height: 24px;
  
}
.scrollarea {
    flex: 1;
    overflow-y: hidden;
  }
  
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #aaa;
    width: 80%;
  }
  
  .userinfo-avatar {
    overflow: hidden;
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
  
  .usermotto {
    margin-top: 200px;
  }
  
  .avatar-wrapper {
    padding: 0;
    width: 56px !important;
    border-radius: 8px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  
  .avatar {
    display: block;
    width: 56px;
    height: 56px;
  }
  
  .nickname-wrapper {
    display: flex;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    border-top: .5px solid rgba(0, 0, 0, 0.1);
    border-bottom: .5px solid rgba(0, 0, 0, 0.1);
    color: black;
  }
  
  .nickname-label {
    width: 105px;
  }
  
  .nickname-input {
    flex: 1;
  }

</style>
