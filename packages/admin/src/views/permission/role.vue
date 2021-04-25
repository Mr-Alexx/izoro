<template>
  <div class="base-box table-box">
    <AppSearch :options="searchOptions" :action="fetchList" />

    <el-card class="base-box--top talent-list table-box__table">
      <div class="table-wrapper double-table-wrapper">
        <vxe-grid
          :loading="loading"
          :data="data"
          border="inner"
          size="small"
          align="center"
          height="100%"
          :columns="columns"
          :empty-render="{ name: 'Empty' }"
          @current-change="changeRole"
        />
        <vxe-grid
          ref="permissionTable"
          :loading="permissionTableLoading"
          :data="permissionData"
          border="inner"
          size="small"
          align="center"
          height="100%"
          :columns="permissionColumns"
          :empty-render="{ name: 'Empty' }"
          row-id="id"
          :tree-config="{
            children: 'children',
            iconOpen: 'el-icon-remove-outline',
            iconClose: 'el-icon-circle-plus-outline',
            indent: 10,
            reserve: true,
            expandAll: true
          }"
          :checkbox-config="{ labelField: 'name' }"
          @checkbox-all="hanldeCheckAll"
          @checkbox-change="changeCheckbox"
        />
      </div>
      <div class="button-wrapper">
        <div>
          <el-button style="float: left; margin-top: 10px; margin-right: 10px;" type="primary" @click="openDialog()">新增角色</el-button>
          <AppPagination v-model="pagination" layout="total, prev, pager, next" @update="fetchList" />
        </div>
        <div>
          <el-button type="primary" :loading="confirmLoading" @click="authorize">授权</el-button>
        </div>
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
import { FETCH_MENU_LIST, FETCH_ROLE_LIST, ADD_ROLE, EDIT_ROLE, DELETE_ROLE, AUTHORIZE_MENU_TO_ROLE } from '@/api/system'
const ROLE_STATUS_LIST = [
  { value: 0, label: '禁用' },
  { value: 1, label: '启用' }
]

export default {
  name: 'Role',
  data () {
    return {
      searchOptions: [
        { key: 'name', label: '角色', component: { name: 'input' }},
        { key: 'status', label: '状态', component: { name: 'select', options: ROLE_STATUS_LIST, clearable: true }}
      ],
      loading: false,
      data: [],
      columns: [
        { type: 'seq', title: '序号', width: 50 },
        { field: 'name', title: '角色名称', minWidth: 80 },
        { field: 'description', title: '描述', minWidth: 120, formatter: 'formatEmpty' },
        { field: 'status', title: '状态', minWidth: 60, slots: {
          default: ({ row }) => [
            <el-tag size='small' type={ row.status === 0 ? 'error' : 'success' }>{ ROLE_STATUS_LIST.filter(v => v.value === row.status)[0].label }</el-tag>
          ]
        }},
        { field: 'create_at', title: '创建时间', minWidth: 140, formatter: 'time' },
        { title: '操作', minWidth: 100, fixed: 'right', slots: {
          default: ({ row }) => {
            return [
              <div class='operation-wrapper'>
                <el-tooltip content='查看' placement='top'>
                  <i class='el-icon-view success' onClick={ this.openDialog.bind(this, 'view', row) }/>
                </el-tooltip>
                <el-divider direction='vertical'/>
                <el-tooltip content='编辑' placement='top'>
                  <i class='el-icon-edit-outline primary' onClick={ this.openDialog.bind(this, 'edit', row) }/>
                </el-tooltip>
                <el-divider direction='vertical'/>
                <el-popconfirm
                  icon='el-icon-info'
                  icon-color='red'
                  title='确定要删除该角色吗？'
                  onConfirm={ this.handleDelete.bind(this, row) }
                >
                  <el-tooltip content='删除' slot='reference' placement='top'>
                    <i class='el-icon-delete danger'/>
                  </el-tooltip>
                </el-popconfirm>
              </div>
            ]
          }
        }}
      ],
      permissionColumns: [
        { field: 'name', type: 'checkbox', title: '菜单', width: 180, fixed: 'left', treeNode: true, align: 'left' },
        { title: '权限', align: 'left', slots: {
          default: ({ row }) => {
            if (!row.permissions) {
              return []
            }
            return [
              <el-checkbox-group vModel={ row.checkedList } onChange={ this.changeChecked.bind(this, row) }>
                {
                  row.permissions.map(v => (<el-checkbox checked={ v.checked } label={ v.id } key={ v.id }>{ v.name }</el-checkbox>))
                }
              </el-checkbox-group>
            ]
          }
        }}
      ],
      permissionTableLoading: false,
      permissionData: [],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0
      },
      showDialog: false,
      confirmLoading: false,
      form: {},
      formOptions: [
        { key: 'name', label: '名称', span: 24, required: true, component: { name: 'input' }},
        { key: 'status', label: '状态', span: 24, required: true, component: { name: 'select', options: ROLE_STATUS_LIST }},
        { key: 'description', label: '描述', span: 24, component: { name: 'input', type: 'textarea' }}
      ],
      dialogTitle: '新增角色',
      actionType: 'create',
      currentRow: {}
    }
  },
  watch: {
    currentRow: {
      deep: true,
      async handler (newVal) {
        this.fetchMenuList(newVal.id)
      }
    }
  },
  created () {
    this.fetchList()
  },
  methods: {
    /**
     * @description 获取权限菜单
     */
    async fetchMenuList (role_id) {
      this.permissionTableLoading = true
      try {
        const data = await FETCH_MENU_LIST({ node_type: 'all', roleIds: role_id + '' })
        // 对数据进行改造，权限父菜单的children改为permissions，防止渲染成树形
        this.permissionData = this.formatPermissionData(data)
        // 设置默认选中
        const checkedRow = getCheckRow(this.permissionData)
        this.$refs.permissionTable.setCheckboxRow(checkedRow, true)
      } catch (err) {
        console.error(err)
      } finally {
        this.permissionTableLoading = false
      }

      function getCheckRow (data, checkedRow = []) {
        data.forEach(item => {
          item.checked && checkedRow.push(item)
          if (item.children) {
            getCheckRow(item.children, checkedRow)
          }
        })
        return checkedRow
      }
    },
    /**
     * @description 改造菜单数据
     * 如果菜单下是权限列表，则将 children键 改为 permissions键
     * @param { Array } data
     * @return { Array }
     */
    formatPermissionData (data) {
      data.forEach(item => {
        if (item.children) {
          if (item.children[0].node_type === 3) {
            item.permissions = JSON.parse(JSON.stringify(item.children))
            item.checkedList = []
            delete item.children
          } else {
            this.formatPermissionData(item.children)
          }
        }
      })
      return data
    },
    async fetchList (form) {
      this.loading = true
      try {
        const data = await FETCH_ROLE_LIST({
          page: this.pagination.page,
          limit: this.pagination.pageSize,
          ...form
        })
        this.data = data.list
        this.pagination.total = data.total
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    hanldeCheckAll ({ checked }) {
      this.checkAll(checked, this.permissionData)
    },
    checkAll (checked, data) {
      data.forEach(item => {
        if (item.children) {
          this.checkAll(checked, item.children)
        } else if (item.permissions) {
          item.checkedList = checked ? item.permissions.map(v => v.id) : []
        }
      })
    },
    changeCheckbox ({ records, ndeterminates, checked, row }) {
      this.permissionCheckAll(checked, row)
    },
    permissionCheckAll (checked, row) {
      if (row.children) {
        row.children.forEach(item => this.permissionCheckAll(checked, item))
      } else if (row.permissions) {
        this.$set(row, 'checkedList', checked ? row.permissions.map(v => v.id) : [])
      }
    },
    changeChecked (row, checkedList) {
      this.$refs.permissionTable.setCheckboxRow(row, checkedList.length > 0)
    },
    openDialog (type = 'create', row = {}) {
      this.actionType = type
      this.dialogTitle = type === 'create'
        ? '新增角色' : type === 'edit'
          ? `编辑角色-${row.name}` : `查看角色-${row.name}`
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs.form.form = row
        console.log(this.form)
      })
    },
    /**
     * @description 删除角色
     * @param { Object } row
     */
    async handleDelete (row) {
      try {
        await DELETE_ROLE(row.id)
        this.$message.success('删除成功！')
        this.fetchList()
      } catch (err) {
        this.$message.error(err)
      }
    },
    /**
     * @description 创建/编辑角色
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
          this.actionType === 'create' ? await ADD_ROLE(form) : await EDIT_ROLE(form.id, form)
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
    },
    /**
     * @description 切换角色
     * @param { Object } { row, $event, ... }
     */
    changeRole ({ row, $event }) {
      const className = $event.target.className
      if (className.indexOf('el-tooltip') > -1) { return }
      // 点击树形展开节点或者操作按钮，不操作
      // if (/i|button/ig.test(node)) {
      //   return
      // }

      this.currentRow = row
    },
    /**
     * @description 角色授权
     */
    async authorize () {
      if (!this.currentRow.id) {
        return this.$message.warning('请选择授权的角色！')
      }

      this.confirmLoading = true
      // this.$message.success('授权成功！')
      const records = this.$refs.permissionTable.getCheckboxRecords()
      const ids = []
      records.forEach(item => {
        ids.push(item.id)
        if (item.checkedList) {
          ids.push(...item.checkedList)
        }
      })

      try {
        const msg = await AUTHORIZE_MENU_TO_ROLE({ roleIds: [this.currentRow.id], menuIds: ids })
        this.$message.success(msg)
      } catch (err) {
        this.$message.error(err)
      }
      this.confirmLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  >>>.vxe-grid {
    &:first-child {
      width: 50%;
    }
    &:last-child {
      width: calc(50% - 20px);
    }
  }
}
.button-wrapper {
  display: flex;

  >>>.el-pagination {
    padding-top: 15px;
  }

  >div {
    flex-basis: 50%;

    &:last-child {
      padding-top: 10px;
      padding-left: 20px;
    }
  }
}

>>>.el-checkbox {
  margin-right: 15px;
}
</style>
