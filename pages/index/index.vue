<template>
  <view class="container">
    <view class="usv-iferinfo">
      绑定平台用户
      <block>
        <!-- :rules="rules" -->
   <!--     	<u--form
        				labelPosition="left"
        				:model="model1"
        				:rules="rules"
        				ref="uForm"
        		>
        			<u-form-item
        					label="姓名"
        					prop="userInfo.name"
        					borderBottom
        					ref="item1"
        			>
        				<u--input
        						v-model="model1.userInfo.name"
        						border="none"
        				></u--input>
        			</u-form-item>
        			<u-form-item
        					label="性别"
        					prop="userInfo.sex"
        					borderBottom
        					ref="item1"
        			>
        				<u--input
        						v-model="model1.userInfo.sex"
        						disabledColor="#ffffff"
        						placeholder="请选择性别"
        						border="none"
        				></u--input>
        			</u-form-item>
        		</u--form> -->
       <u--form labelPosition="left" :model="form"  ref="uForm">
          <u-form-item label="账号" prop="userInfo.username" borderBottom ref="item1">
            <u--input v-model="form.userInfo.username" border="none"></u--input>
          </u-form-item>
          <u-form-item label="密码" prop="userInfo.password" borderBottom ref="item2">
            <u--input v-model="form.userInfo.password" border="none"></u--input>
          </u-form-item>
        </u--form>
        <u-button @click="submit">提交</u-button>
      </block>
    </view>
  </view>
</template>

<script>
import { bandUser } from '../../api/common';
import store from '../../store';
// import { appId, secret } from '../../utils/config.js'
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
export default {
  data() {
    return {
      form: {
        userInfo: {
          username: '',
          password: ''
        }
      },
      // model1: {
      // 				userInfo: {
      // 					name: '',
      // 					sex: '',
      // 				},
      // 			},
      // rules: {
      // 				'userInfo.name': {
      // 					type: 'string',
      // 					required: true,
      // 					message: '请填写姓名',
      // 					trigger: ['blur', 'change']
      // 				},
      // 				'userInfo.sex': {
      // 					type: 'string',
      // 					required: true,
      // 					message: '请选择男或女',
      // 					trigger: ['blur', 'change']
      // 				},
      // 			},
      rules: {
        'userInfo.username': {
          type: 'string',
          required: true,
          message: '请填写用户名',
          trigger: ['blur', 'change']
        },
        'userInfo.password': {
          type: 'string',
          required: true,
          message: '请填写密码',
          trigger: ['blur', 'change']
        },
      },
      hasUserInfo: false,
      canIUseGetUserProfile: wx.canIUse('getUserProfile')
    };
  },
  computed: {
    openId() {
      return store.getters.openId;
    }
  },
  onLoad() {
    console.log('ssss',store,this.openId);
    this.loginUser();
    
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    loginUser() {
      store.dispatch('user/loginUser').then((res) => {
        // console.log(res);
        if (!res.bindFlag) {
          uni.$customAPI('showToast', {
            icon: 'error',
            title: '请绑定平台用户',
            duration: 2000
          });
        } else {
          uni.switchTab({
            url: '/pages/unitAssignment/unitAssignment'
          });
        }
      });
    },
    submit() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          const data = {
            openId: this.openId, //  微信open_id
            unionId: '', // 微信union_id
            username: this.form.userInfo.username, // 用户名
            password: this.form.userInfo.password //  用户密码
          };
          console.log(data);
          bandUser(data).then(res => {
            console.log(res);
          })
        })
        .catch((errors) => {
          uni.$u.toast('校验失败');
        });
    },
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res);
          this.userInfo = res.userInfo;
          this.hasUserInfo = true;
          // this.setData({
          //   userInfo: res.userInfo,
          //   hasUserInfo: true
          // });
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
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  color: black;
}

.nickname-label {
  width: 105px;
}

.nickname-input {
  flex: 1;
}
</style>
