<template>
  <ElDialog
    v-model="dialogVisible"
    :title="dialogType === 'add' ? '添加客户' : '编辑客户'"
    width="30%"
    align-center
  >
    <ElForm ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <ElFormItem label="客户名" prop="name">
        <ElInput v-model="formData.name" />
      </ElFormItem>
      <ElFormItem label="城市" prop="city">
        <el-cascader placeholder="请选择城市" :options="cityOptions" filterable />
      </ElFormItem>
      <ElFormItem label="国家" prop="country">
        <ElInput v-model="formData.country" />
      </ElFormItem>
      <ElFormItem label="城市" prop="city">
        <ElInput v-model="formData.city" />
      </ElFormItem>
      <!-- <ElFormItem label="性别" prop="gender">
        <ElSelect v-model="formData.gender">
          <ElOption label="男" value="男" />
          <ElOption label="女" value="女" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="角色" prop="role">
        <ElSelect v-model="formData.role" multiple>
          <ElOption
            v-for="role in roleList"
            :key="role.roleCode"
            :value="role.roleCode"
            :label="role.roleName"
          />
        </ElSelect>
      </ElFormItem> -->
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="handleSubmit">提交</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import { ROLE_LIST_DATA } from '@/mock/temp/formData'
  import type { FormInstance, FormRules } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { CustomerService } from '@/api/customerApi'

  interface Props {
    visible: boolean
    type: string
    userData?: any
  }

  interface Emits {
    (e: 'update:visible', value: boolean): void
    (e: 'submit'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  // 角色列表数据
  const roleLicityOptionsst = ref(ROLE_LIST_DATA)
  const cityOptions = [
    {
      value: 'guide',
      label: 'Guide',
      children: [
        {
          value: 'disciplines',
          label: 'Disciplines',
          children: [
            {
              value: 'consistency',
              label: 'Consistency'
            },
            {
              value: 'feedback',
              label: 'Feedback'
            },
            {
              value: 'efficiency',
              label: 'Efficiency'
            },
            {
              value: 'controllability',
              label: 'Controllability'
            }
          ]
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'side nav',
              label: 'Side Navigation'
            },
            {
              value: 'top nav',
              label: 'Top Navigation'
            }
          ]
        }
      ]
    },
    {
      value: 'component',
      label: 'Component',
      children: [
        {
          value: 'basic',
          label: 'Basic',
          children: [
            {
              value: 'layout',
              label: 'Layout'
            },
            {
              value: 'color',
              label: 'Color'
            },
            {
              value: 'typography',
              label: 'Typography'
            },
            {
              value: 'icon',
              label: 'Icon'
            },
            {
              value: 'button',
              label: 'Button'
            }
          ]
        },
        {
          value: 'form',
          label: 'Form',
          children: [
            {
              value: 'radio',
              label: 'Radio'
            },
            {
              value: 'checkbox',
              label: 'Checkbox'
            },
            {
              value: 'input',
              label: 'Input'
            },
            {
              value: 'input-number',
              label: 'InputNumber'
            },
            {
              value: 'select',
              label: 'Select'
            },
            {
              value: 'cascader',
              label: 'Cascader'
            },
            {
              value: 'switch',
              label: 'Switch'
            },
            {
              value: 'slider',
              label: 'Slider'
            },
            {
              value: 'time-picker',
              label: 'TimePicker'
            },
            {
              value: 'date-picker',
              label: 'DatePicker'
            },
            {
              value: 'datetime-picker',
              label: 'DateTimePicker'
            },
            {
              value: 'upload',
              label: 'Upload'
            },
            {
              value: 'rate',
              label: 'Rate'
            },
            {
              value: 'form',
              label: 'Form'
            }
          ]
        },
        {
          value: 'data',
          label: 'Data',
          children: [
            {
              value: 'table',
              label: 'Table'
            },
            {
              value: 'tag',
              label: 'Tag'
            },
            {
              value: 'progress',
              label: 'Progress'
            },
            {
              value: 'tree',
              label: 'Tree'
            },
            {
              value: 'pagination',
              label: 'Pagination'
            },
            {
              value: 'badge',
              label: 'Badge'
            }
          ]
        },
        {
          value: 'notice',
          label: 'Notice',
          children: [
            {
              value: 'alert',
              label: 'Alert'
            },
            {
              value: 'loading',
              label: 'Loading'
            },
            {
              value: 'message',
              label: 'Message'
            },
            {
              value: 'message-box',
              label: 'MessageBox'
            },
            {
              value: 'notification',
              label: 'Notification'
            }
          ]
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'menu',
              label: 'Menu'
            },
            {
              value: 'tabs',
              label: 'Tabs'
            },
            {
              value: 'breadcrumb',
              label: 'Breadcrumb'
            },
            {
              value: 'dropdown',
              label: 'Dropdown'
            },
            {
              value: 'steps',
              label: 'Steps'
            }
          ]
        },
        {
          value: 'others',
          label: 'Others',
          children: [
            {
              value: 'dialog',
              label: 'Dialog'
            },
            {
              value: 'tooltip',
              label: 'Tooltip'
            },
            {
              value: 'popover',
              label: 'Popover'
            },
            {
              value: 'card',
              label: 'Card'
            },
            {
              value: 'carousel',
              label: 'Carousel'
            },
            {
              value: 'collapse',
              label: 'Collapse'
            }
          ]
        }
      ]
    },
    {
      value: 'resource',
      label: 'Resource',
      children: [
        {
          value: 'axure',
          label: 'Axure Components'
        },
        {
          value: 'sketch',
          label: 'Sketch Templates'
        },
        {
          value: 'docs',
          label: 'Design Documentation'
        }
      ]
    }
  ]

  // 对话框显示控制
  const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
  })

  const dialogType = computed(() => props.type)

  // 表单实例
  const formRef = ref<FormInstance>()

  // 表单数据
  const formData = reactive({
    name: '',
    country: '',
    city: '',
    company_name: '',
    follow_up_status: 0,
    follow_up_frequency: '',
    level: 0,
    source: 0,
    channel: 0,
    benifit_evaluate: 0,
    contact_email: '',
    contact_phone: '',
    telephone: '',
    company_url: '',
    company_desc: '',
    intended_product: '',
    social_media: '',
    social_media_contact: '',
    customer_situation: '',
    follow_up_time: '',
    remark: '',
    is_video_contact: 0,
    meeting_notes: ''
    // role: [] as string[]
  })

  // 表单验证规则
  const rules: FormRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
    ],
    gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
    role: [{ required: true, message: '请选择角色', trigger: 'blur' }]
  }

  // 初始化表单数据
  const initFormData = () => {
    const isEdit = props.type === 'edit' && props.userData
    const row = props.userData
    console.log('row', row.name)
    Object.assign(formData, {
      username: isEdit ? row.name || '' : '',
      country: isEdit ? row.country || '' : '',
      city: isEdit ? row.city || '' : ''
      // role: isEdit ? (Array.isArray(row.userRoles) ? row.userRoles : []) : []
    })
  }

  // 统一监听对话框状态变化
  watch(
    () => [props.visible, props.type, props.userData],
    ([visible]) => {
      if (visible) {
        initFormData()
        nextTick(() => {
          formRef.value?.clearValidate()
        })
      }
    },
    { immediate: true }
  )

  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return

    await formRef.value.validate((valid) => {
      if (valid) {
        // 模拟提交数据
        console.log('提交数据:', formData)
        // 这里可以调用 API 提交数据
        CustomerService.addOrUpdateCustomer(formData).then(() => {
          // 假设 API 返回成功
        })

        ElMessage.success(dialogType.value === 'add' ? '添加成功' : '更新成功')
        dialogVisible.value = false
        emit('submit')
      }
    })
  }
</script>
