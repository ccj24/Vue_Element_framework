<template>
  <div class="input">
    <div>全局指令处理输入 @/src/directives/InputFilter.js</div>
    <input v-input-filter:integerLetter v-model="testValue">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        testValue: '',
      }
    },
    filters: {

    },
    methods: {
    }
  }

</script>
<style lang="scss" scoped>
  /* 普通IE浏览器 样式清除(数字加减) */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  /* 火狐浏览器样式清除 */
  input[type="number"] {
    -moz-appearance: textfield;
  }

</style>
