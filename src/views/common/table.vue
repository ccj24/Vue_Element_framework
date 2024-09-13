<template>
  <div class="table">
    <Table ref="tableComponent" :columns="columns" :tableData="tableData" :listLoading="listLoading" :total="total"
      :border="tableProp.border" :selection="tableProp.selection" :tableName="tableProp.tableName" :add="actionProp.add"
      :edit="actionProp.edit" :remove="actionProp.remove" :download="actionProp.download" :rowClass="rowClass"
      :renderHeader="renderHeader" :exportFormat="exportFormat" @getList="getList" @selectionChange="selectionChange"
      @handleRemove="handleRemove" :editForm="editForm" :editFormItem="editFormItem" :editFormRules="editFormRules"
      @handleEdit="handleEdit" @editSure="editSure">
      <span slot="top-button">
        <el-button type="danger" icon="el-icon-delete" size="small" :disabled="batchRemoveDis" @click="batchRemove"
          class="marginLeft-10">批量删除</el-button>
      </span>
      <span slot="top-form">
        <fill-form :form="selectForm" :formItem="selectFormItem" labelPosition="left" labelWidth="60px"
          @getList="getList" selectButton>
        </fill-form>
      </span>
    </Table>
  </div>
</template>
<script>
  import Table from '@/components/Table/index.vue'
  import FillForm from '@/components/FillForm/index.vue'
  import {
    getList
  } from '@/api/table'
  import {
    parseTime
  } from '@/utils/index.js'
  const checkboxList = [{
    label: '是',
    value: 1
  }, {
    label: '否',
    value: 0
  }]
  export default {
    components: {
      Table,
      FillForm
    },
    data() {
      return {
        // table
        listLoading: false, // 表格是否加载
        tableData: [], // 表格数据
        tableProp: { // 表格属性
          border: true, // 表格是否加边框
          selection: true, // 表格是否支持多选
          tableName: '表格使用实例'
        },
        actionProp: { // 操作按钮属性（是否显示）
          add: true,
          edit: true,
          remove: true,
          download: true
        },
        total: 0, // 表格总数
        idStr: '', // 批量ID
        batchRemoveDis: true, // 批量删除按钮是否可用
        columns: [{
          prop: 'expand',
          type: 'expand',
          renderName: 'expand',
          render: (row, h) => {
            return h('div', [
              h('i', {
                class: 'el-icon-time'
              }),
              h('span', row.display_time + row.author)
            ])
          }
        }, {
          prop: 'title',
          label: '标题',
          width: '200',
          align: 'left',
          tip: '这是标题'
        }, {
          prop: 'author',
          label: '作者'
        }, {
          prop: 'status',
          label: '状态',
          type: 'renderHtml',
          renderName: 'status',
          render: (row, h) => {
            return h('el-tag', {
              props: {
                type: this.$options.filters.statusFilter(row.status)
              }
            }, this.$options.filters.statusFilter(row.status))
          }
        }, {
          prop: 'display_time',
          label: '创建时间',
          type: 'renderHtml',
          renderName: 'display_time',
          render: (row, h) => {
            return h('div', [
              h('i', {
                class: 'el-icon-time'
              }),
              h('span', row.display_time + row.author)
            ])
          }
        }],

        // selectForm
        selectForm: {
          name: '',
          password: '',
          // link: '',
          // radioType: '',
          // checkboxType: [],
          // num: 1,
          // select: '',
          // switch: true,
          // dayPicker: parseTime(new Date(new Date().setDate(new Date().getDate() + 5)), '{y}-{m}-{d}'),
          // dayTimkePicker: '',
          // dayTimkePicker1: '',
          // daysPicker: '',
          // timePicker: '',
          // timePicker1: '',
        },
        selectFormItem: [{
            label: '姓名',
            prop: 'name',
            type: 'input',
            disabled: true,
            placeholder: '111'
          }, {
            label: '密码',
            prop: 'password',
            type: 'input',
            showPassword: true
          },
          // {
          //   label: '链接',
          //   prop: 'link',
          //   type: 'input',
          //   textarea: 'textarea',
          //   autosize: {
          //     minRows: 2,
          //     maxRows: 4
          //   }
          // }, {
          //   label: '类型',
          //   prop: 'radioType',
          //   type: 'radio',
          //   radioList: [{
          //     label: '是',
          //     value: 1
          //   }, {
          //     label: '否',
          //     value: 0
          //   }]
          // }, {
          //   label: '类型多选',
          //   prop: 'checkboxType',
          //   type: 'checkbox',
          //   checkboxList: checkboxList,
          //   indeterminate: true,
          //   isIM: true,
          //   checkAll: false,
          //   change: this.checkboxTypeChange,
          //   allChange: this.checkboxAllChange
          // }, {
          //   label: '人数',
          //   prop: 'num',
          //   type: 'inputNum',
          //   min: 1,
          //   max: 5
          // },
          // {
          //   label: '选择器',
          //   prop: 'select',
          //   type: 'select',
          //   placeholder: '123',
          //   selectList: checkboxList,
          // }, 
          // {
          //   label: '开关',
          //   prop: 'switch',
          //   type: 'switch',
          //   activeColor: '#000',
          //   inactiveColor: '#ccc',
          //   activeText: '开了开了',
          //   inactiveText: '关了关了',
          // }, {
          //   label: '日期选择器',
          //   prop: 'dayPicker',
          //   type: 'datePicker',
          //   placeholder: '日期选择器',
          //   options: {
          //     disabledDate: time => {
          //       return time.getTime() > Date.now()
          //     }
          //   },
          //   change: () => {}
          // }, {
          //   label: '日期时间选择器',
          //   prop: 'dayTimkePicker',
          //   type: 'dateTimerPicker',
          // }, {
          //   label: '日期时间范围选择器',
          //   prop: 'dayTimkePicker1',
          //   type: 'dateTimerPicker',
          //   dateType: 'datetimerange',
          // },
          // {
          //   label: '日期范围选择器',
          //   prop: 'daysPicker',
          //   type: 'datePicker',
          //   dateType: 'daterange',
          //   rangeSeparator: '~',
          //   startPlaceholder: '开始',
          //   endPlaceholder: '结束',
          //   options: {
          //     onPick: ({
          //       maxDate,
          //       minDate
          //     }) => {
          //       this.minDate = minDate; //选中的时间较小的一个
          //     },
          //     disabledDate: (time) => {
          //       let curDate = new Date().getTime(); // 当前时间的时间戳
          //       let cutTime = 30 * 24 * 3600 * 1000; // 1个月前不可选
          //       let minTime = curDate - cutTime; // 最小时间的时间戳
          //       let month = 10 * 24 * 3600 * 1000; // 时间跨度不能大于10天
          //       let nowLast = new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 999))
          //         .getTime(); // 今天的23点59分59秒
          //       if (this.minDate) {
          //         // 判断
          //         // 1.遍历时间大于今天（23:59:59）会返回true
          //         // 2.遍历时间小于最小时间会返回true
          //         // 3.遍历时间大于 选中的时间较小的一个 加上 时间跨度 会返回true
          //         // 4.遍历时间小于 选中的时间较小的一个 减去 时间跨度 会返回true
          //         return (
          //           time.getTime() > nowLast ||
          //           time.getTime() < minTime ||
          //           time > new Date(this.minDate.getTime() + month) ||
          //           time < new Date(this.minDate.getTime() - month)
          //         );
          //       }
          //       return time.getTime() > Date.now() || time.getTime() < minTime;
          //     },
          //   },
          //   change: (val) => {
          //     if (!val) {
          //       this.minDate = ''
          //     }
          //   }
          // },
          // {
          //   label: '时间选择器',
          //   prop: 'timePicker',
          //   type: 'timePicker',
          //   placeholder: '日期选择器',
          // }, {
          //   label: '时间范围选择器',
          //   prop: 'timePicker2',
          //   type: 'timePicker',
          //   startPlaceholder: '111',
          //   isRange: true
          // },

        ],
        //minDate: "", // daterange选中的时间较小的一个

        // editForm
        editForm: {
          title: '',
          author: '',
        },
        editFormItem: [{
            label: '标题',
            prop: 'title',
            type: 'input',
            textarea: 'textarea',
            autosize: {
              minRows: 2,
              maxRows: 4
            },
            required: true
          },
          {
            label: '作者',
            prop: 'author',
            type: 'input',
          },
        ],
        editFormRules: {
          title: [{
            required: true,
            message: '请选择活动区域',
            trigger: 'change'
          }],
          author: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    mounted() {

    },
    methods: {
      // 获取数据列表
      getList() {
        this.listLoading = true
        let param = Object.assign(this.$refs.tableComponent.pagination, this.selectForm)
        getList(this.$refs.tableComponent.pagination).then(res => {
          this.tableData = res.data.items
          this.total = res.data.total
          this.listLoading = false
        })
      },
      // 编辑
      handleEdit(row) {
        this.editForm = Object.assign({}, row)
      },
      // 确定
      editSure(dialogType) {
        if (dialogType == 1) {
          console.log('新增')
        } else {
          console.log('编辑')
        }
      },
      // 删除
      handleRemove(id) {
        getList({
          id: id
        }).then(res => {
          this.$message({
            type: 'success',
            message: '成功!'
          });
          if (this.tableData.length == 1 && this.total != 1) {
            this.$refs.tableComponent.pagination.page_num--
          }
          this.getList()
        })
      },
      // 多选
      selectionChange(val) {
        this.idStr = ''
        let len = val.length
        for (let i = 0; i < len; i++) {
          this.idStr += val[i].id + ','
        }
        this.idStr = this.idStr.substring(0, this.idStr.length - 1)
        if (len < 2) {
          this.batchRemoveDis = true
        } else {
          this.batchRemoveDis = false
        }
      },
      // 行特殊渲染
      rowClass({
        row
      }) {
        if (row.status == 'deleted') {
          return 'warning-row'
        } else {
          return ''
        }
      },
      // 渲染表头
      renderHeader(h, {
        column
      }) {
        if (column.property == 'title') {
          return h(
            'div',
            [
              h('span', column.label),
              h('el-tooltip', {
                props: {
                  placement: 'top',
                  content: column.columnKey,
                  popperClass: 'atooltip'
                }
              }, [
                h('i', {
                  class: 'el-icon-question',
                  style: 'color:#958bc2;margin-left:5px;'
                })
              ])
            ]
          )
        } else {
          return h('div', column.label)
        }
      },
      // 批量删除
      batchRemove() {
        console.log(this.idStr)
      },
      // 导出格式化
      exportFormat(filterVal) {
        return this.tableData.map(v =>
          filterVal.map(j => {
            if (j == 'author') {
              return v.author + '无'
            }
            return v[j];
          })
        );
      },
      // 类型多选——全选改变
      checkboxAllChange(val) {
        if (this.selectFormItem[4].isIM) {
          this.selectFormItem[4].checkAll = false;
        }
        this.selectFormItem[4].isIM = false;
        if (this.selectFormItem[4].checkAll) {
          this.selectFormItem.checkboxType = []
          for (let i = 0; i < checkboxList.length; i++) {
            this.selectForm.checkboxType.push(checkboxList[i].value)
          }
        } else {
          this.selectForm.checkboxType = [];
        }
      },
      // 类型多选——选项改变
      checkboxTypeChange(val) {
        if (this.selectFormItem[4].indeterminate) {
          if (val.length === checkboxList.length) { // 全选
            this.selectFormItem[4].isIM = false;
            this.selectFormItem[4].checkAll = true;
          } else if (val.length > 0) { // 不全选
            this.selectFormItem[4].isIM = true;
            this.selectFormItem[4].checkAll = false;
          } else { // 不选
            this.selectFormItem[4].isIM = false;
            this.selectFormItem[4].checkAll = false;
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .table {
    .warning-row {
      color: #F56C6C;
    }
  }
</style>