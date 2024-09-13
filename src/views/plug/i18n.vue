<template>
  <div class="i18n">
    {{$t('el.colorpicker.confirm')}}
    {{$t('login')}}
    <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name: 'i18n',
    data() {
      return {
        list: [{
          pid: 1,
          qq: '可可'
        }, {
          pid: 2,
          qq: '佳儿'
        }, {
          pid: 3,
          qq: '佳。'
        }],
         value1: '',
      }
    },
    computed: {
      num() {
        return (31241234.34356).toFixed(2)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>