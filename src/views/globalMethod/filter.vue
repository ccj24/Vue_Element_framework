<template>
  <div class="filter">
    <p>{{ '15602215864' | formatPhone }}</p>
    <p>{{'*'|repeat(3)}}</p>
    <p>{{'starta'|replace('a','**')}}</p>
    <p>{{'15602215864'|secretPhone}}</p>
    <p>{{new Date()|formatDate}}</p>
    <p>{{3|change(list,'pid','qq')}}</p>
    <p>{{num | thousands}}</p>
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
        },{
          pid: 2,
          qq: '佳儿'
        },{
          pid: 3,
          qq: '佳。'
        },]
      }
    },
    computed:{
      num(){
        return (31241234.34356).toFixed(2)
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>
