<template>
  <div class="container-user">
    <button @click="jump(1)">params的path传参</button>
    <button @click="jump(2)">params的name传参</button>
    <button @click="jump(3)">query的path传参</button>
    <button @click="jump(4)">query的name传参</button>
    <div class="user-box">
      <div class="user-avatar">
        <img :src="user.avatar" class="user-avatar">
      </div>
      <div class="user-greeting">
        <div>{{time}}好，<span class="user-name">{{ user.nickname }}</span>，</div>
        <div>欢迎登录b2-GS后台管理系统!</div>
      </div>
    </div>
    <div class="message">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="title">通知</div>
        </div>
        <div class="message-part">
          <div v-for="item in messageList" class="message-item">
            <div>
              <img :src="user.avatar" class="message-avatar">
            </div>
            <div class="message-text">
              <div class="message-title">{{item.title}}</div>
              <div class="message-content">{{item.content}}</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'Dashboard',
    computed: {
      time() {
        var now = new Date(),
          hour = now.getHours()
        if (hour < 6) {
          return "凌晨"
        } else if (hour < 12) {
          return "上午"
        } else if (hour < 14) {
          return "中午"
        } else if (hour < 18) {
          return "下午"
        } else if (hour < 19) {
          return "傍晚"
        } else {
          return "晚上"
        }
      }
    },
    data() {
      return {
        messageList: [{
            title: '反馈指南',
            content: 'WEB网站-通知反馈-反馈-新增反馈，填写相应信息'
          },
          {
            title: '欢迎',
            content: '欢迎使用b2-GS后台管理系统，具体操作请点击右上角问号'
          },
          {
            title: '反馈指南',
            content: 'WEB网站-通知反馈-反馈-新增反馈，填写相应信息'
          },
          {
            title: '欢迎',
            content: '欢迎使用b2-GS后台管理系统，具体操作请点击右上角问号'
          },
          {
            title: '反馈指南',
            content: 'WEB网站-通知反馈-反馈-新增反馈，填写相应信息'
          },
          {
            title: '欢迎',
            content: '欢迎使用b2-GS后台管理系统，具体操作请点击右上角问号'
          },
        ],
        user: {
          nickname: 'admin',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        }
      }
    },
    mounted() {
      //this.getUser()
    },
    methods: {
      //获取用户详情
      getUser() {
        getUser({
          with_permissions: 1
        }).then(res => {
          this.user = res.data
        })
      },
      jump(type) {
        let id = 1
        switch (type) {
          case 1:
            this.$router.push({ // 需要路由表配置/:id，刷新不会丢失
              path: `/common/params/${id}`
            })
            break
          case 2:
            this.$router.push({ // （可选）路由表配置/:id，配置时刷新不会丢失，没配置时刷新会丢失
              name: 'params',
              params: {
                id: id
              }
            })
            break
          case 3:
            this.$router.push({// 刷新不会丢失
              path: '/common/query',
              query: {
                id: id
              }
            })
            break
          case 4:
            this.$router.push({// 刷新不会丢失
              name: 'query',
              query: {
                id: id
              }
            })
            break
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container-user {
    padding: 20px;
    width: 60%;
  }

  .message {
    min-width: 500px;
    margin-top: 10px;
    background: #fff;

    .title {
      font-weight: 600;
      font-size: 18px !important;
    }

    .message-item {
      display: flex;
      border-bottom: 1px solid #e8eaec;
    }

    .message-avatar {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin-top: 10px;
    }

    .message-text {
      margin-left: 20px;
      padding: 10px 0;
    }

    .message-title {
      color: rgba(0, 0, 0, .75);
      font-size: 14px;
      line-height: 22px;
    }

    .message-content {
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }
  }

  .user-box {
    display: flex;
    width: 400px;
    padding: 10px;

    .user-avatar {
      border-radius: 50%;
      width: 80px;
      height: 80px;
    }

    .user-greeting {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 16px;
      color: #444;
    }

    .user-name {
      font-weight: 600;
      color: #409EFF
    }
  }
</style>