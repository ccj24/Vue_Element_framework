<template>
  <draggable v-model="colors" @update="datadragEnd" :options="{animation:500}">
    <transition-group>
      <div v-for="(element,index) in colors" :key="element.text" class="drag-item">
        {{index}}-{{element.text}}
      </div>
    </transition-group>
  </draggable>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    data() {
      return {
        colors: [{
            text: "Aquamarine",
          },
          {
            text: "Hotpink",
          },
          {
            text: "Gold",
          },
          {
            text: "Crimson",
          },
          {
            text: "Blueviolet",
          },
          {
            text: "Lightblue",
          },
          {
            text: "Cornflowerblue",
          },
          {
            text: "Skyblue",
          },
          {
            text: "Burlywood",
          }
        ],
      }
    },
    components: {
      draggable
    },
    methods: {
      // 拖拽结束添加事件
      datadragEnd(evt) {
        evt.preventDefault();
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
        console.log(this.colors);
      }
    },
    mounted() {
      //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
      document.body.ondrop = function (event) {
        event.preventDefault();// 阻止默认事件
        event.stopPropagation();// 阻止冒泡
      }
    }
  }

</script>

<style lang="scss" scoped>
  .drag-item {
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin: auto;
    position: relative;
    background: #ddd;
    margin-top: 20px;
    text-align: center;
    cursor:move;
  }
</style>
