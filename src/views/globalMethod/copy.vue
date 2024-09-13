<template>
  <div class="app-container">
    <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard  directly" name="directly">
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">
          copy
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary"
          icon="el-icon-document">
          copy
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="by createElement" name="table">
        <el-button @click="copy(inputData)" type="primary" icon="el-icon-document">
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import clip from '@/utils/clipboard' // use clipboard directly
  import clipboard from '@/directives/clipboard/index.js' // use clipboard by v-directive

  export default {
    name: 'ClipboardDemo',
    directives: {
      clipboard
    },
    data() {
      return {
        activeName: 'directly',
        inputData: '111',
      }
    },
    methods: {
      handleCopy(text, event) {
        clip(text, event)
      },
      clipboardSuccess() {
        this.$message({
          message: 'Copy successfully',
          type: 'success',
          duration: 1500
        })
      },
      copy(text) {
        var input = document.createElement('input')
        input.value = text;
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        this.$message.success('CDN链接复制成功!')
        document.body.removeChild(input)
      }
    }
  }
</script>