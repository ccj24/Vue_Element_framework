<template>
  <div class="fill-form">
    <el-form ref="fillForm" :model="form" :rules="rules" :label-width="labelWidth" :inline="inline"
      :label-position="labelPosition" size="small" label-suffix=":">
      <el-form-item v-for="item in formItem" :label="item.label" :prop="item.prop" :required="item.required || false"
        v-if="item.show==false ? false : true">

        <el-input v-if="item.type == 'input'" v-model="form[item.prop]" :placeholder="item.placeholder"
          :disabled="item.disabled || false" :show-password="item.showPassword" :type="item.textarea"
          :autosize="item.autosize" clearable></el-input>

        <el-input-number v-if="item.type == 'inputNum'" v-model="form[item.prop]" :min="item.min || -Infinity"
          :max="item.max || Infinity" :disabled="item.disabled || false"></el-input-number>

        <el-radio-group v-if="item.type == 'radio'" v-model="form[item.prop]" :disabled="item.disabled || false">
          <el-radio v-for="i in item.radioList" :label="i.value" :key="i.value">{{i.label}}</el-radio>
        </el-radio-group>

        <el-checkbox v-if="item.indeterminate" :indeterminate="item.isIM" v-model="item.checkAll"
          @change="item.allChange">全选</el-checkbox>
        <el-checkbox-group v-if="item.type == 'checkbox'" v-model="form[item.prop]" :disabled="item.disabled || false"
          @change="item.change">
          <el-checkbox v-for="i in item.checkboxList" :label="i.value" :key="i.value">{{i.label}}</el-checkbox>
        </el-checkbox-group>

        <el-select v-if="item.type == 'select'" v-model="form[item.prop]" :placeholder="item.placeholder"
          :disabled="item.disabled || false" :multiple="item.multiple || false" filterable clearable>
          <el-option v-for="i in item.selectList" :key="i.value" :label="i.label" :value="i.value">
          </el-option>
        </el-select>

        <el-switch v-if="item.type == 'switch'" v-model="form[item.prop]" :active-color="item.activeColor"
          :inactive-color="item.inactiveColor" :active-text="item.activeText" :inactive-text="item.inactiveText"
          :disabled="item.disabled || false">
        </el-switch>

        <el-date-picker v-if="item.type == 'datePicker'" v-model="form[item.prop]" :type="item.dateType || 'date'"
          :placeholder="item.placeholder" :range-separator="item.rangeSeparator || '至'"
          :start-placeholder="item.startPlaceholder || '开始日期'" :end-placeholder="item.endPlaceholder || '结束日期'"
          :disabled="item.disabled || false" value-format="yyyy-MM-dd" :picker-options="item.options"
          @change="item.change">
        </el-date-picker>

        <el-time-picker v-if="item.type == 'timePicker'" v-model="form[item.prop]"
          :placeholder="item.placeholder||'选择时间'" :is-range="item.isRange||false"
          :range-separator="item.rangeSeparator || '至'" :start-placeholder="item.startPlaceholder || '开始时间'"
          :end-placeholder="item.endPlaceholder || '结束时间'" :disabled="item.disabled || false">
        </el-time-picker>

        <el-date-picker v-if="item.type == 'dateTimerPicker'" v-model="form[item.prop]"
          :type="item.dateType || 'datetime'" :placeholder="item.placeholder"
          :range-separator="item.rangeSeparator || '至'" :start-placeholder="item.startPlaceholder || '开始日期'"
          :end-placeholder="item.endPlaceholder || '结束日期'" :disabled="item.disabled || false"
          value-format="yyyy-MM-dd HH:mm:ss" :picker-options="item.options">
        </el-date-picker>
      </el-form-item>
      <!-- 自定义内容--插槽 -->
      <slot></slot>
      <span v-if="selectButton">
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh-left" size="small" @click="reset">重置</el-button>
      </span>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      form: {
        type: Object,
        default: () => {}
      },
      rules: {
        type: Object,
        default: () => {}
      },
      labelWidth: {
        type: String,
        default: '70px'
      },
      inline: {
        type: Boolean,
        default: () => true
      },
      labelPosition: {
        type: String,
        default: 'right'
      },
      formItem: {
        type: Array,
        default: () => []
      },
      selectButton: {
        type: Boolean,
        default: () => false
      },
    },
    methods: {
      //查询
      search() {
        this.$emit('getList')
      },
      //重置
      reset() {
        this.$refs['fillForm'].resetFields()
      },
      //表单验证
      validate() {
        return this.$refs['fillForm'].validate()
      },
    }
  }
</script>