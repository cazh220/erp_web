<!-- 用户管理 -->
<!-- art-full-height 自动计算出页面剩余高度 -->
<!-- art-table-card 一个符合系统样式的 class，同时自动撑满剩余高度 -->
<!-- 如果你想使用 template 语法，请移步功能示例下面的高级表格示例 -->
<template>
  <div class="user-page art-full-height">
    <!-- 搜索栏 -->
    <!-- <UserSearch @reset="resetSearchParams" @search="getDataByPage" /> -->

    <ElCard class="art-table-card" shadow="never">
      <!-- 表格头部 -->
      <ArtTableHeader v-model:columns="columnChecks" @refresh="refresh">
        <template #left>
          <ElButton @click="showDialog('add')">新增客户</ElButton>
        </template>
      </ArtTableHeader>

      <!-- 表格 -->
      <ArtTable
        :loading="loading"
        :data="data"
        :columns="columns"
        :pagination="pagination"
        :table-config="{ rowKey: 'id' }"
        :layout="{ marginTop: 10 }"
        @row:selection-change="handleSelectionChange"
        @pagination:size-change="handleSizeChange"
        @pagination:current-change="handleCurrentChange"
      >
      </ArtTable>

      <!-- 客户弹窗 -->
      <CustomerDialog
        v-model:visible="dialogVisible"
        :type="dialogType"
        :user-data="currentUserData"
        @submit="handleDialogSubmit"
      />

      <!-- 客户详情弹窗 -->
      <CustomerDetail
        v-model:visible="detailVisible"
        :user-data="currentUserData"
        @close="detailVisible = false"
      />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import ArtButtonTable from '@/components/core/forms/art-button-table/index.vue'
  import { ACCOUNT_TABLE_DATA } from '@/mock/temp/formData'
  import { ElMessageBox, ElMessage, ElTag } from 'element-plus'
  import { useTable } from '@/composables/useTable'
  import { CustomerService } from '@/api/customerApi'
  //   import UserSearch from './modules/user-search.vue'
  import CustomerDialog from './modules/customer-dialog.vue'
  import CustomerDetail from './modules/customer-detail.vue'

  defineOptions({ name: 'User' })

  type UserListItem = Api.User.UserListItem
  const { width } = useWindowSize()
  const { getCustomerList } = CustomerService

  // 弹窗相关
  const dialogType = ref<Form.DialogType>('add')
  const dialogVisible = ref(false)
  // 详情弹窗相关
  const detailVisible = ref(false)
  const currentUserData = ref<Partial<UserListItem>>({})

  // 选中行
  const selectedRows = ref<UserListItem[]>([])

  // 用户状态配置
  const USER_STATUS_CONFIG = {
    '1': { type: 'success' as const, text: '在线' },
    '2': { type: 'info' as const, text: '离线' },
    '3': { type: 'warning' as const, text: '异常' },
    '4': { type: 'danger' as const, text: '注销' }
  } as const

  /**
   * 获取用户状态配置
   */
  const getUserStatusConfig = (status: string) => {
    return (
      USER_STATUS_CONFIG[status as keyof typeof USER_STATUS_CONFIG] || {
        type: 'info' as const,
        text: '未知'
      }
    )
  }

  const {
    columns,
    columnChecks,
    tableData: data,
    isLoading: loading,
    paginationState: pagination,
    // searchData: getDataByPage,
    // resetSearch: resetSearchParams,
    onPageSizeChange: handleSizeChange,
    onCurrentPageChange: handleCurrentChange,
    refreshAll: refresh,
    refreshAfterCreate: refreshAfterAdd,
    refreshAfterUpdate: refreshAfterEdit,
    refreshAfterRemove: refreshAfterDelete
  } = useTable<UserListItem>({
    // 核心配置
    core: {
      apiFn: getCustomerList,
      apiParams: {
        name: '示例客户',
        page: 1
      },
      columnsFactory: () => [
        { type: 'selection' }, // 勾选列
        { type: 'index', width: 60, label: '序号' }, // 序号
        // { type: 'expand' }, // 展开列
        {
          prop: 'avatar',
          label: '用户名',
          minWidth: width.value < 500 ? 220 : '',
          formatter: (row) => {
            console.log('row', row)
            return h('div', { class: 'user', style: 'display: flex; align-items: center' }, [
              h('img', { class: 'avatar', src: row.avatar }),
              h('div', {}, [
                h('p', { class: 'user-name' }, row.name),
                h('p', { class: 'email' }, row.contact_email || '暂无邮箱')
              ])
            ])
          }
        },
        {
          prop: 'company_name',
          label: '公司名称',
          minWidth: width.value < 500 ? 220 : '',
          formatter: (row) => row.company_name || '暂无公司'
        },
        {
          prop: 'country',
          label: '国家',
          minWidth: width.value < 500 ? 120 : '',
          formatter: (row) => row.country || '暂无国家'
        },
        {
          prop: 'city',
          label: '城市',
          minWidth: width.value < 500 ? 120 : '',
          formatter: (row) => row.city || '暂无城市'
        },
        {
          prop: 'follow_up_status',
          label: '跟进状态',
          formatter: (row) => row.follow_up_status
        },
        {
          prop: 'follow_up_frequency',
          label: '跟进频率',
          formatter: (row) => row.follow_up_frequency || '暂无跟进频率'
        },
        {
          prop: 'level',
          label: '客户等级',
          formatter: (row) => row.level
        },
        {
          prop: 'source',
          label: '客户来源',
          formatter: (row) => row.source
        },
        {
          prop: 'channel',
          label: '客户渠道',
          formatter: (row) => row.channel
        },
        {
          prop: 'benifit_evaluate',
          label: '客户收益评估',
          formatter: (row) => row.benifit_evaluate
        },
        {
          prop: 'contact_phone',
          label: '联系人手机号',
          formatter: (row) => row.contact_phone
        },
        {
          prop: 'telephone',
          label: '客户手机号',
          formatter: (row) => row.telephone
        },
        {
          prop: 'company_url',
          label: '公司网址',
          formatter: (row) => row.company_url
        },
        {
          prop: 'intended_product',
          label: '客户需求产品',
          formatter: (row) => row.intended_product
        },
        { prop: 'userGender', label: '性别', sortable: true, formatter: (row) => row.userGender },
        { prop: 'userPhone', label: '手机号' },
        {
          prop: 'status',
          label: '状态',
          formatter: (row) => {
            const statusConfig = getUserStatusConfig(row.status)
            return h(ElTag, { type: statusConfig.type }, () => statusConfig.text)
          }
        },
        {
          prop: 'createTime',
          label: '创建日期',
          sortable: true
        },
        {
          prop: 'operation',
          label: '操作',
          width: 120,
          fixed: 'right', // 固定列
          formatter: (row) =>
            h('div', [
              h(ArtButtonTable, {
                type: 'view',
                onClick: () => showDetailDialog('detail', row)
              }),
              h(ArtButtonTable, {
                type: 'edit',
                onClick: () => showDialog('edit', row)
              }),
              h(ArtButtonTable, {
                type: 'delete',
                onClick: () => deleteUser(row)
              })
            ])
        }
      ]
    },
    // 数据处理
    transform: {
      // 数据转换器 - 替换头像
      dataTransformer: (records: any) => {
        // 类型守卫检查
        if (!Array.isArray(records)) {
          console.warn('数据转换器: 期望数组类型，实际收到:', typeof records)
          return []
        }

        // 使用本地头像替换接口返回的头像
        return records.map((item: any, index: number) => {
          return {
            ...item,
            avatar: ACCOUNT_TABLE_DATA[index % ACCOUNT_TABLE_DATA.length].avatar
          }
        })
      }
    },
    // 性能优化
    performance: {
      enableCache: true, // 是否开启缓存
      cacheTime: 10 * 60 * 1000 // 缓存时间 10分钟
    },
    // 生命周期钩子
    hooks: {
      onError: (error) => ElMessage.error(error.message) // 错误处理
      // onSuccess: (data) => console.log('数据加载成功:', data), // 成功处理
      // onCacheHit: (data) => console.log('缓存命中:', data), // 缓存命中处理
      // resetFormCallback: () => console.log('重置表单')
    },
    // 调试配置
    debug: {
      enableLog: true // 是否开启日志
    }
  })

  /**
   * 显示用户弹窗
   */
  const showDialog = (type: Form.DialogType, row?: UserListItem): void => {
    console.log('打开弹窗:', { type, row })
    dialogType.value = type
    currentUserData.value = row || {}
    nextTick(() => {
      dialogVisible.value = true
    })
  }

  /**
   * 显示客户详情弹窗
   * @param type 
   * @param row 
   */
  const showDetailDialog = (type: Form.DialogType, row?: UserListItem): void => {
    console.log('打开弹窗:', { type, row })
    dialogType.value = type
    currentUserData.value = row || {}
    nextTick(() => {
      detailVisible.value = true
    })
  }

  /**
   * 删除用户
   */
  const deleteUser = (row: UserListItem): void => {
    console.log('删除用户:', row)
    ElMessageBox.confirm(`确定要注销该用户吗？`, '注销用户', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    }).then(() => {
      ElMessage.success('注销成功')
      refreshAfterDelete() // 智能删除后刷新
    })
  }

  /**
   * 处理弹窗提交事件
   */
  const handleDialogSubmit = async () => {
    try {
      dialogVisible.value = false
      await (dialogType.value === 'add' ? refreshAfterAdd() : refreshAfterEdit())
      currentUserData.value = {}
    } catch (error) {
      console.error('提交失败:', error)
    }
  }

  /**
   * 处理表格行选择变化
   */
  const handleSelectionChange = (selection: UserListItem[]): void => {
    selectedRows.value = selection
    console.log('选中行数据:', selectedRows.value)
  }
</script>

<style lang="scss" scoped>
  .user-page {
    :deep(.user) {
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 6px;
      }

      > div {
        margin-left: 10px;

        .user-name {
          font-weight: 500;
          color: var(--art-text-gray-800);
        }
      }
    }
  }
</style>
