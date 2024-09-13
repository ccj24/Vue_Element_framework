<template>
    <div class="container">
 
        <div v-for="(obj,ind) in progerssList" :key="ind">
            <circle-progress :list='obj.progress' :jindu='obj.jindu'></circle-progress>
        </div>
 
    </div>
</template>
 
<script>
import circleProgress from '@/components/ring/index.vue'   // 组件路径
export default {
    components: {
        'circle-progress': circleProgress
    },
    data () {
		return {
            progerssList:[
                {"progress":100,"jindu":100},
                {"progress":20,"jindu":20},
                {"progress":30,"jindu":30},
                {"progress":35,"jindu":35},
                {"progress":40,"jindu":40},
                {"progress":0,"jindu":0}
            ]
    	}
    },
    created() {
 
    },
  	methods: {
 
  	}
}
</script>
 
<style scoped lang="less">
 
</style>