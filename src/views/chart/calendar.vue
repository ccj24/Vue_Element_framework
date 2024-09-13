<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="calendar-pie" name="first">
        <pie v-if="pie" />
      </el-tab-pane>
      <el-tab-pane label="calendar-heatmap" name="second">
        <heatmap v-if="heatmap" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import pie from '@/components/Calendar/pie.vue'
  import heatmap from '@/components/Calendar/heatmap.vue'
  export default {
    components: {
      pie,
      heatmap
    },
    data() {
      return {
        activeName: 'first',
        pie: true,
        heatmap: false,
      }
    },
    methods: {
      handleClick(tab, event) {
        if (tab.name == 'first') {
          this.pie = true
          this.heatmap = false
        }else{
          this.pie = false
          this.heatmap = true
        }
      },
    }
  }

</script>
