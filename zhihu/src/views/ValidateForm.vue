<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" :maxlength="11" show-word-limit clearable
          prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="field102">
        <el-input v-model="formData.field102" placeholder="请输入密码" clearable show-password
          :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="级联选择" prop="field101">
        <el-cascader v-model="formData.field101" :options="field101Options" :props="field101Props"
          :style="{width: '100%'}" placeholder="请选择级联选择" clearable></el-cascader>
      </el-form-item>
      <el-form-item label="评分" prop="field103">
        <el-rate v-model="formData.field103"></el-rate>
      </el-form-item>
      <el-form-item label="上传" prop="field104" required>
        <el-upload ref="field104" :file-list="field104fileList" :action="field104Action"
          :before-upload="field104BeforeUpload">
          <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="下拉选择" prop="field105">
        <el-select v-model="formData.field105" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in field105Options" :key="index" :label="item.label"
            :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        mobile: '',
        field102: undefined,
        field101: [1, 2],
        field103: 0,
        field104: null,
        field105: undefined,
      },
      rules: {
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        field102: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        field101: [{
          required: true,
          type: 'array',
          message: '请至少选择一个field101',
          trigger: 'change'
        }],
        field103: [{
          required: true,
          message: '评分不能为空',
          trigger: 'change'
        }],
        field105: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
      },
      field104Action: 'https://jsonplaceholder.typicode.com/posts/',
      field104fileList: [],
      field101Options: [],
      field105Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field101Props: {
        "multiple": false
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    getField101Options() {
      // TODO 发起请求获取数据
      this.field101Options
    },
    field104BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      return isRightSize
    },
  }
}

</script>
<style>
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

.el-upload__tip {
  line-height: 1.2;
}

</style>
