<template>
  <div class="base-box table-box">
    <el-card class="base-box--top talent-list table-box__table">
      <div>
        <el-button
          style="margin-bottom: 5px;"
          type="primary"
          size="medium"
          icon="el-icon-plus"
          @click="openDialog()"
        >新增菜单</el-button>
      </div>
      <div class="table-wrapper">
        <vxe-grid
          :loading="loading"
          :data="data"
          border="inner"
          size="small"
          align="center"
          height="100%"
          width="100%"
          :columns="columns"
          :empty-render="{ name: 'Empty' }"
          :tree-config="{ children: 'children', iconOpen: 'el-icon-remove-outline', iconClose: 'el-icon-circle-plus-outline', indent: 10 }"
        />
      </div>
    </el-card>
    <el-dialog width="550px" :visible.sync="showDialog" :title="dialogTitle">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="170px"
        size="small"
        :disabled="actionType === 'view'"
      >
        <el-form-item label="菜单名称(title)" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="菜单编码(name)" prop="menu_code">
          <el-input v-model="form.menu_code" />
        </el-form-item>
        <el-form-item label="页面路径(path)" prop="url">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="组件路径(component)" prop="component">
          <el-input v-model="form.component" />
        </el-form-item>
        <el-form-item label="重定向(redirect)">
          <el-input v-model="form.redirect" />
        </el-form-item>
        <el-form-item label="图标(icon)">
          <el-select v-model="form.icon" filterable>
            <el-option v-for="icon in EL_ICONS" :key="icon" :value="icon">
              <i :class="icon"></i>
              {{ icon }}
            </el-option>
          </el-select>
          <i v-show="form.icon" style="margin-left: 10px; font-size: 18px;" :class="form.icon"></i>
        </el-form-item>
        <el-form-item label="是否隐藏(hidden)">
          <el-switch
            v-model="form.hidden"
          />
        </el-form-item>
        <el-form-item label="是否缓存(cache)">
          <el-switch
            v-model="form.cache"
          />
        </el-form-item>
        <el-form-item label="面包屑(breadcrumb)">
          <el-switch
            v-model="form.breadcrumb"
          />
        </el-form-item>
        <el-form-item label="固定菜单(affix)">
          <el-switch
            v-model="form.affix"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="text-center">
        <el-button>取消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { FETCH_MENU_LIST, ADD_MENU, EDIT_MENU, DELETE_MENU } from '@/api/system'
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
        { type: 'seq', title: '序号', treeNode: true, width: 80, align: 'left' },
        { field: 'name', title: '菜单名称', minWidth: 120 },
        { field: 'icon', title: '图标', width: 50, slots: {
          default: ({ row }) => [
            row.icon ? <i class={ row.icon }></i> : <i>-</i>
          ]
        }},
        { field: 'url', title: '页面路径', minWidth: 140, formatter: 'formatEmpty' },
        { field: 'component', title: '组件路径', minWidth: 180, formatter: 'formatEmpty' },
        { field: 'status', title: '状态', minWidth: 80, slots: {
          default: ({ row }) => [
            <el-tag type={ row.status === 0 ? 'error' : 'success' }>{ MENU_STATUS_LIST.filter(v => v.value === row.status)[0].label }</el-tag>
          ]
        }},
        { field: 'sort', title: '排序', width: 50 },
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
      form: {
        hidden: false,
        cache: false,
        breadcrumb: true,
        affix: false
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '菜单名称不能为空' }],
        menu_code: [{ required: true, trigger: 'blur', message: '菜单编码不能为空' }]
        // url: [{ required: true, trigger: 'blur', message: '页面路径不能为空' }],
        // component: [{ required: true, trigger: 'blur', message: '组件路径不能为空' }]
      },
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
        console.log(this.data)
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
      this.form = type === 'create' ? { hidden: false, cache: false, breadcrumb: true, affix: false } : row
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
     */
    handleSubmit () {
      if (this.actionType === 'view') {
        this.showDialog = false
        return
      }

      this.$refs.form.validate(async () => {
        this.confirmLoading = true
        try {
          this.actionType === 'create' ? await ADD_MENU(this.form) : await EDIT_MENU(this.form.id, this.form)
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
