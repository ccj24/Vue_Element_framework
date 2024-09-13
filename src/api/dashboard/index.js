<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{$t('message.username')}}: {{ name }}</div>
    <button @click="switchLang">切换语言</button>
    <el-button>{{$t('message.el.colorpicker.confirm')}}</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods:{
    switchLang(){
      this.$i18n.locale=this.$i18n.locale=='zh'?'en':'zh';
      window.localStorage.setItem("lang",this.$i18n.locale);
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
