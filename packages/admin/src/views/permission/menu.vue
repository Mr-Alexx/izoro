<template>
  <div class="base-box table-box">
    <el-card class="talent-list table-box__table">
      <div class="button-wrapper">
        <div>
          <el-button
            style="margin-bottom: 5px;"
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click="openDialog()"
          >新增菜单</el-button>
        </div>

        <div>
          <el-button
            style="margin-bottom: 5px;"
            type="primary"
            size="medium"
            icon="el-icon-plus"
            :disabled="!currentMenu.id"
            @click="openPermissionDialog"
          >新增{{ currentMenu.name || '' }}权限</el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <!-- tree-config配置reserve属性才能使更新表格时保持展开状态，还需配置row-id属性 -->
        <vxe-grid
          :loading="loading"
          :data="data"
          border="inner"
          size="small"
          align="center"
          height="100%"
          row-id="id"
          :columns="columns"
          :empty-render="{ name: 'Empty' }"
          :tree-config="{
            children: 'children',
            iconOpen: 'el-icon-remove-outline',
            iconClose: 'el-icon-circle-plus-outline',
            indent: 10,
            reserve: true,
            expandAll: true
          }"
          @cell-click="changeMenu"
        />

        <vxe-grid
          :loading="permissionTableLoading"
          :data="permissionData"
          border="inner"
          size="small"
          align="center"
          height="100%"
          :columns="permissionColumns"
          :empty-render="{ name: 'Empty' }"
        />
      </div>
    </el-card>

    <!-- 目录/菜单表单 -->
    <el-dialog :visible.sync="showDialog" :title="dialogTitle">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="170px"
        size="small"
        :disabled="actionType === 'view'"
      >
        <el-row :gutter="20">
          <el-col :sm="24" :md="12">
            <el-form-item label="菜单名称(title)" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="菜单编码(name)" prop="menu_code">
              <el-input v-model="form.menu_code" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="路由地址(path)" prop="url">
              <el-input v-model="form.url" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="组件路径(component)" prop="component">
              <el-input v-model="form.component" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="重定向(redirect)">
              <el-input v-model="form.redirect" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="图标(icon)">
              <el-select v-model="form.icon" filterable>
                <el-option v-for="icon in EL_ICONS" :key="icon" :value="icon">
                  <i :class="icon"></i>
                  {{ icon }}
                </el-option>
              </el-select>
              <i v-show="form.icon" style="margin-left: 10px; font-size: 18px;" :class="form.icon"></i>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="是否隐藏(hidden)">
              <el-switch
                v-model="form.hidden"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="是否缓存(cache)">
              <el-switch
                v-model="form.cache"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="面包屑(breadcrumb)">
              <el-switch
                v-model="form.breadcrumb"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="固定在标签页(affix)">
              <el-switch
                v-model="form.affix"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="上级菜单">
              <el-cascader
                v-model="form.parentIds"
                :options="[{ id: 0, name: '根菜单' }, ...data]"
                :props="{ value: 'id', label: 'name', checkStrictly: true }"
                filterable
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="排序">
              <el-input-number v-model="form.sort" controls-position="right" :min="1" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="text-center">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="handleSubmit('form')">确定</el-button>
      </div>
    </el-dialog>

    <!-- 权限表单 -->
    <el-dialog :visible.sync="showPermissionDialog" :title="!currentPermissionRow.id ? `新增${currentMenu.name}权限` : `编辑${currentMenu.name}权限-${currentPermissionRow.name}`">
      <el-form ref="permissionForm" :model="permissionForm" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12">
            <el-form-item label="权限名称" prop="name">
              <el-select v-model="permissionForm.name" filterable @change="changeAction">
                <el-option v-for="item in actionTypes" :key="item.code" :value="`${currentMenu.name}-${item.name}`" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="权限编码" prop="menu_code">
              <el-input v-model="permissionForm.menu_code" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="排序">
              <el-input v-model="permissionForm.sort" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="text-center">
        <el-button @click="showPermissionDialog = false">取消</el-button>
        <el-button :loading="confirmLoading" type="primary" @click="handleSubmit('permissionForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { FETCH_MENU_LIST, FETCH_PERMISSION_LIST_BY_MENU_ID, ADD_MENU, EDIT_MENU, DELETE_MENU } from '@/api/system'
import EL_ICONS from './el-icon'
const MENU_STATUS_LIST = [
  { value: 0, label: '隐藏' },
  { value: 1, label: '显示' }
]

export default {
  name: 'Menu',
  data () {
    return {
      EL_ICONS,
      loading: false,
      data: [],
      currentRow: {},
      columns: [
        { field: 'name', treeNode: true, title: '菜单名称', minWidth: 120, align: 'left', fixed: 'left' },
        { field: 'icon', title: '图标', width: 50, slots: {
          default: ({ row }) => [
            row.icon ? <span class={ row.icon }></span> : <span>-</span>
          ]
        }},
        // { field: 'menu_code', title: '编码', minWidth: 100 },
        { field: 'url', title: '路由地址', minWidth: 100, formatter: 'formatEmpty' },
        { field: 'component', title: '组件路径', minWidth: 200, formatter: 'formatEmpty' },
        { field: 'status', title: '状态', minWidth: 80, slots: {
          default: ({ row }) => [
            <el-tag size='small' type={ row.status === 0 ? 'error' : 'success' }>{ MENU_STATUS_LIST.filter(v => v.value === row.status)[0].label }</el-tag>
          ]
        }},
        { field: 'sort', title: '排序', width: 50 },
        { field: 'cache', title: '缓存', width: 50, formatter: 'boolean' },
        { field: 'hidden', title: '隐藏', width: 50, formatter: 'boolean' },
        { title: '操作', width: 130, fixed: 'right', slots: {
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
                <el-tooltip content='新增子菜单' placement='top'>
                  <i class='el-icon-plus warning' onClick={ this.openDialog.bind(this, 'create', row) }/>
                </el-tooltip>
                <el-divider direction='vertical'/>
                <el-popconfirm
                  icon='el-icon-info'
                  icon-color='red'
                  title='确定要删除该菜单及子菜单吗？'
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
      permissionTableLoading: false,
      permissionData: [],
      permissionColumns: [
        { type: 'seq', title: '序号', width: 50 },
        { field: 'name', title: '权限名称', minWidth: 120 },
        { field: 'menu_code', title: '权限编码', minWidth: 120 },
        { field: 'sort', title: '排序', width: 50 },
        { title: '操作', width: 80, fixed: 'right', slots: {
          default: ({ row }) => {
            return [
              <div class='operation-wrapper'>
                <el-tooltip content='编辑' placement='top'>
                  <i class='el-icon-edit-outline primary' onClick={ this.openPermissionDialog.bind(this, 'edit', row) }/>
                </el-tooltip>
                <el-divider direction='vertical'/>
                <el-popconfirm
                  icon='el-icon-info'
                  icon-color='red'
                  title='确定要删除该权限吗？'
                  onConfirm={ this.handleDelete.bind(this, row, 'permission') }
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
      showDialog: false,
      showPermissionDialog: false,
      confirmLoading: false,
      form: {
        parentIds: [0],
        hidden: false,
        cache: false,
        breadcrumb: true,
        affix: false,
        sort: 1
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '菜单名称不能为空' }],
        menu_code: [{ required: true, trigger: 'blur', message: '菜单编码不能为空' }]
        // url: [{ required: true, trigger: 'blur', message: '路由地址不能为空' }],
        // component: [{ required: true, trigger: 'blur', message: '组件路径不能为空' }]
      },
      dialogTitle: '新增菜单',
      actionType: 'create',
      currentMenu: {},
      currentPermissionRow: {},
      permissionForm: {},
      actionTypes: [
        { code: 'add', name: '新增' },
        { code: 'del', name: '删除' },
        { code: 'edit', name: '修改' },
        { code: 'list', name: '列表' },
        { code: 'detail', name: '详情' }
      ]
    }
  },
  watch: {
    currentMenu: {
      deep: true,
      async handler (newVal) {
        this.fetchPermissionList(newVal.id)
      }
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
    async fetchPermissionList (id) {
      id = id || this.currentMenu.id
      this.permissionTableLoading = true
      try {
        this.permissionData = await FETCH_PERMISSION_LIST_BY_MENU_ID(id)
      } catch (err) {
        this.$message(err)
      } finally {
        this.permissionTableLoading = false
      }
    },
    changeMenu ({ row, $event }) {
      const node = $event.target.nodeName
      // 点击树形展开节点或者操作按钮，不操作
      if (/i|button/ig.test(node)) {
        return
      }

      this.currentMenu = row
    },
    openDialog (type = 'create', row = {}) {
      this.actionType = type
      this.dialogTitle = type === 'create'
        ? '新增菜单' : type === 'edit'
          ? `编辑菜单-${row.name}` : `查看菜单-${row.name}`

      this.showDialog = true
      const parentIds = row.path ? row.path.split(',').map(Number) : [0]

      if (type === 'create') {
        this.form = {
          hidden: false,
          cache: false,
          breadcrumb: true,
          affix: false,
          sort: 1,
          parentIds
        }
      } else {
        this.form = {
          ...row,
          parentIds
        }
      }
    },
    openPermissionDialog (type = 'create', row = {}) {
      this.actionType = type
      this.currentPermissionRow = row
      this.permissionForm = { ...row, node_type: 3, pid: this.currentMenu.id }
      this.showPermissionDialog = true
    },
    /**
     * @description 删除菜单
     * @param { Object } row
     * @param { string } type menu/permission
     */
    async handleDelete (row, type = 'menu') {
      try {
        await DELETE_MENU(row.id)
        this.$message.success('删除成功！')
        type === 'menu' ? this.fetchList() : this.fetchPermissionList()
      } catch (err) {
        this.$message.error(err)
      }
    },
    /**
     * @description 切换权限操作类型，自动补充权限代码
     * @param { string } name 权限名称
     */
    changeAction (name) {
      const item = this.actionTypes.filter(v => name.indexOf(v.name) > -1)[0]
      this.permissionForm.menu_code = `${this.currentMenu.menu_code}:${item.code}`
    },
    /**
     * @description 创建/编辑 菜单/权限
     * @param { string } formName form/permissionForm
     */
    handleSubmit (formName = 'form') {
      const isMenu = formName === 'form'
      if (this.actionType === 'view') {
        isMenu ? (this.showDialog = false) : (this.showPermissionDialog = false)
        return
      }
      this.$refs[formName].validate(async () => {
        this.confirmLoading = true
        if (this[formName]['parentIds']) {
          this[formName]['pid'] = this[formName]['parentIds'].reverse()[0]
        }
        try {
          this.actionType === 'create' ? await ADD_MENU(this[formName]) : await EDIT_MENU(this[formName]['id'], this[formName])
          this.$message.success(this.actionType === 'edit' ? '编辑成功！' : '新增成功！')

          if (isMenu) {
            this.showDialog = false
            this.fetchList()
          } else {
            this.showPermissionDialog = false
            this.fetchPermissionList()
          }
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
.button-wrapper {
  display: flex;

  >div {
    &:first-child {
      width: 60%;
    }
    &:last-child {
      padding-left: 20px;
    }
  }
}
.table-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  >>>.vxe-grid {
    border: 1px solid #F0F0F0;

    &:first-child {
      width: 60%;
    }
    &:last-child {
      width: calc(40% - 20px);
    }
  }
}

.operation-wrapper {
  [class *= el-icon] {
    cursor: pointer;
  }
}
>>>.el-select {
  width: 100%;
  .el-input__inner {
    width: 100%;
  }
}
</style>
