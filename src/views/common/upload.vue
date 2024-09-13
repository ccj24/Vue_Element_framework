<template>
  <div class="upload">
    <!-- 基础 -->
    <el-upload :action="action" :data="data" :headers="headers" :on-success="uploadSuccess" :show-file-list="false">
      <el-button type="success" icon="el-icon-upload" size="small">批量导入</el-button>
    </el-upload>

    <!-- 拖拽上传 -->
    <el-upload :action="action" drag multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <!-- 文件列表 -->
    <el-upload :action="action" multiple :limit="3" :on-exceed="handleExceed" :on-remove="handleRemove"
      :before-remove="beforeRemove" :file-list="fileList" accept=".jpg,.jpeg,.png" list-type="picture" :auto-upload="false">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <!-- 图片上传并回显 -->
    <el-upload class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 基础
        //action: process.env.VUE_APP_BASE_API + '/sensitive_word/import',
        action: "https://jsonplaceholder.typicode.com/posts/", // 上传路径
        data: { // 请求体
          type: 1,
          operating_type: 1
        },
        headers: { // 请求头
          "Authorization": 'abc'
        },

        // 文件列表
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],

        // 图片上传并回显
        imageUrl: ''
      }
    },
    mounted() {

    },
    methods: {
      uploadSuccess() {
        console.log('基础——文件上传成功！')
      },
      handleRemove(file, fileList) {
        console.log('文件列表——移除成功')
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>