<template>
  <div class="base-box table-box">
    <el-card class="table-box__table">
      <div style="margin-bottom: 10px;display: flex;justify-content: flex-end">
        <el-button type="primary" @click="handleClick('add', {})">新增一级分类</el-button>
      </div>
      <div class="table-wrapper">
        <vxe-table
          ref="table"
          :loading="tableLoading"
          :data="data"
          border="inner"
          size="small"
          align="center"
          height="100%"
          :tree-config="{ children: 'children' }"
          :empty-render="{ name: 'Empty' }"
        >
          <vxe-table-column field="name" title="分类名称" tree-node />
          <vxe-table-column field="id" title="分类ID" />
          <vxe-table-column field="level" title="分类级别" />
          <vxe-table-column field="updated_at" title="更新时间" />
          <vxe-table-column title="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClick('edit', scope)">编辑</el-button>
              <el-button v-if="scope.row.level !== 3" type="text" @click="handleClick('add', scope)">+新增{{ scope.row.level + 1 }}级分类</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <AppPagination v-model="pagination" @change="fetchList" />
    </el-card>

    <!-- 编辑/添加 -->
    <el-dialog :visible.sync="showDialog" :title="title">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :md="12" :xs="12">
            <el-form-item label="分类名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入分类名称" />
            </el-form-item>
          </el-col>
          <!-- <el-col :md="12" :xs="12">
            <el-form-item label="自动编码" prop="number">
              <el-input v-model="form.number" :disabled="type === 'edit'" placeholder="请输入自动编码" type="number" />
            </el-form-item>
          </el-col> -->
          <!-- <el-col :md="12" :xs="12">
            <el-form-item label="是否显示" prop="display">
              <el-radio-group v-model="form.display">
                <el-radio :label="true">显示</el-radio>
                <el-radio :label="false">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <el-col :md="12" :xs="12">
            <el-form-item label="排序">
              <el-input v-model="form.sort" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="text-center">
        <el-button :loading="loading" type="primary" :disabled="loading" @click="submit">提交保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { functionCategoryList, updateCategory } from '@/api/tiktok'
import { mapGetters } from 'vuex'

export default {
  name: 'TiktokCategoryList',
  data () {
    return {
      tableLoading: false,
      data: [],
      options: {
        border: true,
        highlightCurrentRow: true,
        rowKey: 'id'
      },
      showDialog: false,
      title: '',
      type: 'add',
      currentIndex: '',
      form: {
        name: '',
        number: '',
        display: true,
        sort: ''
      },
      rules: {
        name: [{ required: true, message: '请输入分类名称' }],
        number: [{ required: true, message: '请输入自动编码' }],
        display: [{ required: true, message: '请选择是否显示' }]
      },
      loading: false,
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'tableHeight', 'token'
    ])
  },
  created () {
    this.fetchList()
  },
  methods: {
    async fetchList () {
      this.tableLoading = true
      try {
        const data = await functionCategoryList(this.pagination)
        this.data = data.list
        this.pagination.total = (data.total || 0) * 1
        // console.log(this.data)
      } catch (err) {
        console.error(err)
      }
      this.tableLoading = false
    },
    /**
     * @date 2020/10/10 09:12
     * @description 处理按钮点击
     * @param { String } type add/edit
     * @param { Object } scope
     */
    handleClick (type, scope) {
      this.type = type
      this.currentIndex = scope.rowIndex
      const row = scope.row || {}
      const isEdit = type === 'edit'

      this.title = isEdit ? `编辑${row.level}级分类：${row.name}` : `新增${row.level + 1}级分类`
      this.form.id = isEdit ? row.id : ''
      this.form.name = isEdit ? row.name : ''
      this.form.number = isEdit ? row.number : ''
      this.form.display = isEdit ? row.display : true
      this.form.sort = isEdit ? row.sort : ''
      this.form.parent_id = isEdit ? row.parent_id : (row.id || 0)

      this.showDialog = true
    },
    /**
     * @date 2020/10/10 09:35
     * @description 新增/编辑分类
     */
    submit () {
      this.loading = true
      console.log(this.form)
      // debugger
      this.$refs.form.validate(async valid => {
        if (valid) {
          updateCategory(this.form).then(() => {
            setTimeout(() => {
              const isEdit = this.type === 'edit'
              this.$message({
                type: 'success',
                message: `${isEdit ? '编辑成功' : '新增成功'}`
              })
              this.loading = false
              this.showDialog = false
              if (isEdit) {
                console.log(this.currentIndex)
                // 有问题，这种只能修改以及分类
                this.$set(this.data, this.currentIndex, {
                  ...this.data[this.currentIndex],
                  ...this.form
                })
              }
              this.fetchList()
            }, 1500)
          }).catch(err => {
            this.loading = false
            console.error(err)
            this.$message(typeof err === 'object' ? err.message : err)
          })
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

