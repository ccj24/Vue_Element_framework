<template>
    <div class="app-container">
        <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" @click="handleDownload"
            :disabled="downloadDisabled">
            导出选定行
        </el-button>
        <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
            highlight-current-row @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" />
            <el-table-column align="center" label="Id" width="95">
                <template slot-scope="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column label="Title">
                <template slot-scope="scope">
                    {{ scope.row.title }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="PDate" width="220">
                <template slot-scope="scope">
                    <i class="el-icon-time" />
                    <span>{{ scope.row.display_time }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import {
        getList
    } from '@/api/table'
    export default {
        name: 'SelectExcel',
        data() {
            return {
                list: null,
                listLoading: true,
                multipleSelection: [],
                downloadLoading: false,
                downloadDisabled:true,
                filename: '导出选定行'
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                getList(this.listQuery).then(response => {
                    this.list = response.data.items
                    this.listLoading = false
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
                if(val.length){
                    this.downloadDisabled = false
                }else{
                     this.downloadDisabled = true
                }
            },
            handleDownload() {
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['Id', 'Title', 'Date']
                    const filterVal = ['id', 'title', 'display_time']
                    const list = this.multipleSelection
                    const data = this.formatJson(filterVal, list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename
                    })
                    this.$refs.multipleTable.clearSelection()
                    this.downloadLoading = false
                })

            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        }
    }
</script>