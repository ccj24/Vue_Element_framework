<template>
  <div class="component-table">
    <!-- 表格顶部按钮 -->
    <div>
      <el-button type="success" icon="el-icon-plus" size="small" v-if="add" @click="handleAdd">新增</el-button>
      <slot name="top-button"></slot>
      <el-button type="success" icon="el-icon-download" size="small" plain v-if="download" :loading="downloadLoading"
        @click="handleDownload" class="export-buttom">导出表格
      </el-button>
    </div> 
    <!-- 表格筛选条件 -->
    <div class="marginTop-5">
      <slot name="top-form"></slot>
    </div>
    <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" :border="border" fit
      highlight-current-row :row-class-name="rowClass" @selection-change="selectionChange" :cell-style="{padding:'1px'}"
      :header-cell-style="{background:'#f8f8f9',color:'#333','font-weight': '600'}">
      <el-table-column v-if="selection" type="selection" width="55"></el-table-column>
      <el-table-column v-for="i in columns" :prop="i.prop" :label="i.label" :width="i.width||'auto'"
        :align="i.align ||'center'" :type="i.type" :column-key="i.tip" show-overflow-tooltip
        :render-header="renderHeader">
        <template slot-scope="scope">
          <div v-if="i.type == 'renderHtml' || i.type == 'expand'">
            {{ renderToHtml(i, scope.row) }}
            <slot :name="i.renderName"></slot>
          </div>
          <span v-else>{{ scope.row[i.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="actionShow || edit || remove">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" class="edit-button" v-if="edit" @click="handleEdit(scope.row)">
            编辑</el-button>
          <slot name="action-button"></slot>
          <el-button type="text" icon="el-icon-delete" class="remove-button" v-if="remove"
            @click="handleRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" @size-change="sizeChange" @current-change="currentChange"
      :current-page="pagination.page_num" :page-size="pagination.page_size" :page-sizes="[10, 15, 20, 25]" background
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <el-dialog :title="dialogType==1? '新增词条' : '编辑词条'" :visible.sync="dialogVisible" width="500px">
      <fill-form ref="editForm" :form="editForm" :formItem="editFormItem" :rules="editFormRules" :inline="false">
      </fill-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="editSure" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    handleDate
  } from '@/utils/index.js'
  import FillForm from '@/components/FillForm/index.vue'
  export default {
    components: {
      FillForm
    },
    data() {
      return {
        pagination: { // 分页
          page_num: 1,
          page_size: 10
        },
        downloadLoading: false, // 导出按钮是否加载中
        dialogVisible: false, // 弹出框是否可见
        dialogType: 0, // 弹出框类型
      }
    },
    props: {
      // table
      columns: {
        type: Array
      },
      tableData: {
        type: Array
      },
      listLoading: {
        type: Boolean,
        default: false
      },
      total: {
        type: Number,
        default: 0
      },
      border: {
        type: Boolean,
        default: false
      },
      selection: {
        type: Boolean,
        default: false
      },
      tableName: {
        type: String,
        default: ''
      },

      // action
      add: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      },
      remove: {
        type: Boolean,
        default: false
      },
      download: {
        type: Boolean,
        default: false
      },

      // table function
      rowClass: {
        type: Function
      },
      renderHeader: {
        type: Function
      },
      exportFormat: {
        type: Function
      },

      // editForm
      editForm: {
        type: Object,
        default: () => {}
      },
      editFormItem: {
        type: Array,
        default: () => []
      },
      editFormRules: {
        type: Object,
        default: () => {}
      },
    },
    computed: {
      actionShow() { // action-button是否传入
        return this.$slots['action-button']
      }
    },
    mounted() {
      this.$emit('getList')
    },
    methods: {
      // 多选变化
      selectionChange(val) {
        this.$emit('selectionChange', val)
      },
      // 每页条数改变
      sizeChange(val) {
        this.pagination.page_size = val
        this.$emit('getList')
      },
      // 翻页
      currentChange(val) {
        this.pagination.page_num = val
        this.$emit('getList')
      },
      // 新增
      handleAdd() {
        this.dialogVisible = true
        this.dialogType = 1
        if(this.$refs['editForm']){
          this.$refs['editForm'].reset()
        }
      },
      // 编辑
      handleEdit(row) {
        this.dialogVisible = true
        this.dialogType = 2
        if(this.$refs['editForm']){
          this.$refs['editForm'].reset()
        }
        this.$emit('handleEdit', row)
      },
      // 确定
      editSure(){
        this.$refs['editForm'].validate().then((valid) => {
          console.log()
          if(valid) {
            this.dialogVisible = false
            this.$emit('editSure',this.dialogType)
          }
        }).catch(err => {});
      },
      // 删除
      handleRemove(row) {
        this.$confirm(`请确定是否删除？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          iconClass: 'el-icon-warning colorRed'
        }).then(() => {
          this.$emit('handleRemove', row.id)
        }).catch(err => {});
      },
      // 导出表格
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          let tHeader = []
          let filterVal = []
          for (let i = 0; i <= this.columns.length - 1; i++) {
            if (this.columns[i].prop != 'expand') {
              tHeader.push(this.columns[i].label)
              filterVal.push(this.columns[i].prop)
            }
          }

          const data = this.exportFormat(filterVal)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.tableName + handleDate(new Date()),
            autoWidth: true,
            bookType: 'xlsx'
          })
          setTimeout(() => {
            this.downloadLoading = false
          }, 2000);
        })
      },
      // render渲染
      renderToHtml(i, row) {
        if (typeof i.render === 'function') {
          this.$slots[i.renderName] = [i.render(row, this.$createElement)]
        }
      },
    }
  }
</script>
<style lang="scss">
  .component-table {}
</style>