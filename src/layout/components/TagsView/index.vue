<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" tag="span" class="tags-view-item"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <el-select v-model="actionType" @change="actionChanfge" size="mini" placeholder="标签">
      <el-option v-for="item in actionOptions" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script>
  import ScrollPane from './ScrollPane'
  import path from 'path'

  export default {
    components: {
      ScrollPane
    },
    data() {
      return {
        visible: false, // 菜单是否展示
        top: 0, // 菜单展示位置
        left: 0,
        selectedTag: {}, // 选中的标签
        affixTags: [], // 固定展示的标签

        actionType: '', // 标签操作类型
        actionOptions: [{
          value: 1,
          label: '刷新'
        }, {
          value: 2,
          label: '关闭当前'
        }, {
          value: 3,
          label: '关闭其他'
        }, {
          value: 4,
          label: '关闭全部'
        }],
      }
    },
    computed: {
      visitedViews() { // // 访问过的标签
        return this.$store.state.tagsView.visitedViews
      },
      routes() { // 路由表
        return this.$router.options.routes
      }
    },
    watch: {
      $route() { // 当访问新页面时
        this.addTags()
        this.moveToCurrentTag()
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      this.initTags()
      this.addTags()
    },
    methods: {
      // 判断当前标签是否正在访问
      isActive(route) {
        return route.path === this.$route.path
      },
      // 判断当前标签是否固定展示
      isAffix(tag) {
        return tag.meta && tag.meta.affix
      },
      // 过滤affix的路由（固定在标签页中，无法移除）
      filterAffixTags(routes, basePath = '/') {
        let tags = []
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: {
                ...route.meta
              }
            })
          }
          if (route.children) {
            const tempTags = this.filterAffixTags(route.children, route.path)
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags]
            }
          }
        })
        return tags
      },
      // 初始化标签(将固定展示的标签添加)
      initTags() {
        const affixTags = this.affixTags = this.filterAffixTags(this.routes)
        for (const tag of affixTags) {
          if (tag.name) {
            this.$store.dispatch('tagsView/addVisitedView', tag)
          }
        }
      },
      // 添加当前访问页面的标签
      addTags() {
        const {
          name
        } = this.$route
        if (name) {
          this.$store.dispatch('tagsView/addView', this.$route)
        }
        this.selectedTag = Object.assign({}, this.$route, {
          title: this.$route.meta.title || 'no-name'
        })
        return false
      },
      //scroll 移动到标签
      moveToCurrentTag() {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to.path === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag)
              if (tag.to.fullPath !== this.$route.fullPath) { // 如果query不同则更新展示的标签列表
                this.$store.dispatch('tagsView/updateVisitedView', this.$route)
              }
              break
            }
          }
        })
      },
      // 更新选中页面
      refreshSelectedTag(view) {
        this.$store.dispatch('tagsView/delCachedView', view).then(() => {
          const {
            fullPath
          } = view
          console.log(fullPath)
          this.$nextTick(() => {
            this.$router.replace({
              path: '/redirect' + fullPath
            })
          })
        })
      },
      // 关闭选中页面
      closeSelectedTag(view) {
        this.$store.dispatch('tagsView/delView', view).then(({
          visitedViews
        }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
      },
      // 关闭除选中外的页面
      closeOthersTags() {
        this.$router.push(this.selectedTag)
        this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
          this.moveToCurrentTag()
        })
      },
      // 关闭所有页面
      closeAllTags(view) {
        this.$store.dispatch('tagsView/delAllViews').then(({
          visitedViews
        }) => {
          if (this.affixTags.some(tag => tag.path === view.path)) {
            return
          }
          this.toLastView(visitedViews, view)
        })
      },
      // 当关闭标签后，打开前一个标签
      toLastView(visitedViews, view) {
        const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView.fullPath)
        } else { // 如果没有标签视图，默认是重定向到主页
          if (view.name === 'Dashboard') {
            this.$router.replace({
              path: '/redirect' + view.fullPath
            })
          } else {
            this.$router.push('/')
          }
        }
      },
      // 打开菜单
      openMenu(tag, e) {
        console.log(this.$el)
        const menuMinWidth = 105 // 预估菜单栏的宽度
        const offsetLeft = this.$el.getBoundingClientRect().left // 元素左边距离页面左边的距离
        const offsetWidth = this.$el.offsetWidth // 元素宽度
        const maxLeft = offsetWidth - menuMinWidth // 左边界
        const left = e.clientX - offsetLeft + 15 // 15: margin right

        if (left > maxLeft) {
          this.left = maxLeft
        } else {
          this.left = left
        }

        this.top = e.clientY
        this.visible = true
        this.selectedTag = tag
      },
      // 关闭菜单
      closeMenu() {
        this.visible = false
      },
      // 滚动时关闭菜单
      handleScroll() {
        this.closeMenu()
      },
      actionChanfge(val) {
        console.log(this.selectedTag)
        switch (val) {
          case 1:
            this.refreshSelectedTag(this.selectedTag)
            break;
          case 2:
            if (!this.isAffix(this.selectedTag)) {
              this.closeSelectedTag(this.selectedTag)
            }
            break;
          case 3:
            console.log(3)
            this.closeOthersTags()
            break;
          case 4:
            console.log(4)
            this.closeAllTags(this.selectedTag)
            break;
        }
        this.actionType = ''
      }
    }
  }
</script>
<style lang="scss">
  @import "~@/styles/element-variables.scss";

  .tags-view-container {
    .el-select--mini {
      float: right;
      width: 80px;
      margin-top: 3px;
      margin-right:10px;
    }

    .el-select__caret {
      color: #fff !important;
    }

    input {
      background-color: $colorPrimary;
    }

    input::-webkit-input-placeholder {
      color: #fff;
    }
  }
</style>
<style lang="scss" scoped>
  @import "~@/styles/element-variables.scss";

  .tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    display: flex;

    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;

        &:first-of-type {
          margin-left: 15px;
        }

        &:last-of-type {
          margin-right: 15px;
        }

        &.active {
          background-color: $colorPrimary;
          color: #fff;
          border-color: $colorPrimary;
          /* &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        } */
        }
      }
    }

    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;

        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;

        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>