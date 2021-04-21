<template>
  <div class="base-box table-box">
    <el-card class="wrapper">
      <div class="tree-wrapper">
        <div class="tree-wrapper__title">目录结构</div>
        <el-tree :data="data" :expand-on-click-node="false" :props="{ children: 'children', label: 'name' }" @node-click="handleTreeItemClick" />
      </div>
      <div class="table-wrapper">
        <div class="table-wrapper__header">
          <el-button type="primary" size="medium" :disabled="!currentRow.id" icon="el-icon-circle-plus-outline">{{ !currentRow.id ? '新增权限' : `新增${currentRow.name}权限` }}</el-button>
        </div>
        <vxe-grid
          :loading="loading"
          :data="tableData"
          border="inner"
          size="small"
          align="center"
          height="100%"
          width="100%"
          :columns="columns"
          :empty-render="{ name: 'Empty' }"
        />
      </div>
    </el-card>

    <el-dialog width="500px" :visible.sync="showDialog" :title="dialogTitle">
      <AppForm
        ref="form"
        v-model="form"
        :options="formOptions"
        label-width="60px"
        show-button
        :loading="confirmLoading"
        :disabled="actionType === 'view'"
        @cancel="showDialog = false"
        @confirm="handleSubmit"
      />
    </el-dialog>
  </div>
</template>

<script>
import { FETCH_MENU_LIST, FETCH_PERMISSION_LIST_BY_MENU_ID, ADD_MENU, EDIT_MENU, DELETE_MENU } from '@/api/system'
const MENU_STATUS_LIST = [
  { value: 0, label: '禁用' },
  { value: 1, label: '启用' }
]

export default {
  name: 'Menu',
  data () {
    return {
      loading: false,
      data: [],
      tableData: [],
      currentRow: {},
      columns: [
        { type: 'seq', title: '序号', width: 50 },
        { field: 'name', title: '权限名称', minWidth: 120 },
        { field: 'menu_code', title: '权限编码', minWidth: 120 },
        { field: 'status', title: '状态', minWidth: 80, slots: {
          default: ({ row }) => [
            <el-tag type={ row.status === 0 ? 'error' : 'success' }>{ MENU_STATUS_LIST.filter(v => v.value === row.status)[0].label }</el-tag>
          ]
        }},
        { field: 'description', title: '权限描述', minWidth: 120, formatter: 'formatEmpty' },
        { title: '操作', minWidth: 160, fixed: 'right', slots: {
          default: ({ row }) => {
            return [
              <el-button size='mini' type='success' icon='el-icon-view' onClick={ this.openDialog.bind(this, 'view', row) }></el-button>,
              <el-button size='mini' type='primary' icon='el-icon-edit' onClick={ this.openDialog.bind(this, 'edit', row) }></el-button>,
              <el-popconfirm
                icon='el-icon-info'
                icon-color='red'
                title='确定要删除该菜单吗？'
                onConfirm={ this.handleDelete.bind(this, row) }
              >
                <el-button slot='reference' size='mini' type='danger' style='margin-left: 5px' icon='el-icon-delete'></el-button>
              </el-popconfirm>
            ]
          }
        }}
      ],
      showDialog: false,
      confirmLoading: false,
      form: {},
      formOptions: [
        { key: 'name', label: '名称', span: 24, required: true, component: { name: 'input' }},
        { key: 'status', label: '状态', span: 24, required: true, component: { name: 'select', options: MENU_STATUS_LIST }},
        { key: 'description', label: '描述', span: 24, component: { name: 'input', type: 'textarea' }}
      ],
      dialogTitle: '新增菜单',
      actionType: 'create'
    }
  },
  created () {
    this.fetchList()
  },
  methods: {
    async fetchList () {
      this.loading = true
      try {
        this.data = await FETCH_MENU_LIST()
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    openDialog (type = 'create', row = {}) {
      this.actionType = type
      this.dialogTitle = type === 'create'
        ? '新增菜单' : type === 'edit'
          ? `编辑菜单-${row.name}` : `查看菜单-${row.name}`
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs.form.form = row
        console.log(this.form)
      })
    },
    async handleTreeItemClick (item) {
      this.loading = true
      try {
        this.currentRow = item
        const data = await FETCH_PERMISSION_LIST_BY_MENU_ID(item.id)
        this.tableData = data
      } catch (err) {
        this.$message.error(err)
      } finally {
        this.loading = false
      }
    },
    /**
     * @description 删除菜单
     * @param { Object } row
     */
    async handleDelete (row) {
      try {
        await DELETE_MENU(row.id)
        this.$message.success('删除成功！')
        this.fetchList()
      } catch (err) {
        this.$message.error(err)
      }
    },
    /**
     * @description 创建/编辑菜单
     * @param { Object } form
     */
    handleSubmit (form) {
      if (this.actionType === 'view') {
        this.showDialog = false
        return
      }

      this.$refs.form.validate().then(async () => {
        this.confirmLoading = true
        try {
          this.actionType === 'create' ? await ADD_MENU(form) : await EDIT_MENU(form.id, form)
          this.$message.success(this.actionType === 'edit' ? '编辑成功！' : '新增成功！')
          this.showDialog = false
          this.fetchList()
        } catch (err) {
          this.$message({
            type: 'error',
            message: err
          })
        } finally {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$border: 1px solid #f0f0f0;

.wrapper {
  height: 100%;

  >>>.el-card__body {
    height: 100%;
    display: flex;
  }

  .tree-wrapper {
    width: 300px;
    flex-shrink: 0;
    border: $border;
    margin-right: $main-space;

    &__title {
      padding: 15px;
      border-bottom: $border;
      font-size: 16px;
    }

    >>>.el-tree {
      padding-top: 15px;
    }
  }

  .table-wrapper {
    flex: 1;
    border: $border;

    &__header {
      padding: 10px;
    }
  }
}
</style>
