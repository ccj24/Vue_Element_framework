<template>
  <countTo :startVal='startVal' :endVal='endVal' :duration='1000' :decimals="endVal | decimalsFormat" prefix="￥" suffix="rmb"  @mountedCallback="mountedCallback"></countTo>
</template>

<script>
  import countTo from 'vue-count-to';
  export default {
    components: {
      countTo
    },
    data() {
      return {
        startVal: 0,
        endVal: 2017.454
      }
    },
    filters: {
      decimalsFormat(arg1) {
        var y = String(arg1).indexOf(".") + 1; //获取小数点的位置
        var count = String(arg1).length - y; //获取小数点后的个数
        if (y > 0) {
          return count;
        } else {
          return 0;
        }
      },
    },
    methods: {
      mountedCallback(){
        console.log('mountedCallback')
      }
    }
  }

</script>
