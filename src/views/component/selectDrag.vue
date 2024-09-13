<template>
  <div class="select-drag">
    <el-drag-select v-model="fileName" style="width:60%;" multiple placeholder="请选择热更文件">
      <el-option v-for="item in commandList" :key="item.id" :label="item.name" :value="item.id" />
    </el-drag-select>
  </div>
</template>
<script>
  import ElDragSelect from '@/components/DragSelect'
  export default {
    components: {
      ElDragSelect
    },
    data() {
      return {
        fileName:[],
        commandList:[
          {
            id:1,
            name:'first'
          },
          {
            id:2,
            name:'second'
          },
          {
            id:3,
            name:'third'
          },
        ]
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>