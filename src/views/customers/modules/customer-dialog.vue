<template>
  <ElDialog
    v-model="dialogVisible"
    :title="dialogType === 'add' ? '添加客户' : '编辑客户'"
    width="70%"
    align-center
  >
    <ElForm ref="formRef" :model="formData" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <ElFormItem label="客户名" prop="name">
            <ElInput v-model="formData.name" />
          </ElFormItem>
          <ElFormItem label="城市" prop="city">
            <el-cascader placeholder="请选择城市" :options="cityOptions" filterable />
          </ElFormItem>
          <ElFormItem label="公司名称" prop="company_name">
            <ElInput v-model="formData.company_name" />
          </ElFormItem>
          <ElFormItem label="跟进状态" prop="follow_up_status">
            <ElSelect v-model="formData.follow_up_status">
              <ElOption label="跟进中" value="1" />
              <ElOption label="已跟进" value="2" />
              <ElOption label="未跟进" value="0" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="跟进频率" prop="follow_up_frequency">
            <ElSelect v-model="formData.follow_up_frequency">
              <ElOption label="不跟进" value="0" />
              <ElOption label="每天" value="1" />
              <ElOption label="每周" value="2" />
              <ElOption label="每月" value="3" />
              <ElOption label="每季度" value="4" />
              <ElOption label="每年" value="5" />
              <ElOption label="自定义" value="6" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="客户等级" prop="level">
            <ElSelect v-model="formData.level">
              <ElOption label="普通客户" value="1" />
              <ElOption label="重要客户" value="2" />
              <ElOption label="VIP客户" value="3" />
              <ElOption label="战略客户" value="4" />
              <ElOption label="其他" value="5" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="客户来源" prop="source">
            <ElSelect v-model="formData.source">
              <ElOption label="广告" value="5" />
              <ElOption label="活动" value="6" />
              <ElOption label="社交媒体" value="7" />
              <ElOption label="搜索引擎" value="8" />
              <ElOption label="口碑" value="9" />
              <ElOption label="其他" value="10" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="公司网址" prop="company_url">
            <ElInput v-model="formData.company_url" />
          </ElFormItem>
          <ElFormItem label="公司描述" prop="company_desc">
            <ElInput v-model="formData.company_desc" />
          </ElFormItem>
        </el-col>
        <el-col :span="12">
          <ElFormItem label="客户渠道" prop="channel">
            <ElSelect v-model="formData.channel">
              <ElOption label="线上渠道" value="1" />
              <ElOption label="线下渠道" value="2" />
              <ElOption label="推荐" value="3" />
              <ElOption label="其他" value="4" />
              <ElOption label="合作" value="5" />
              <ElOption label="直销" value="6" />
              <ElOption label="分销" value="7" />
              <ElOption label="代理" value="8" />
              <ElOption label="加盟" value="9" />
              <ElOption label="批发" value="10" />
              <ElOption label="零售" value="11" />
              <ElOption label="电商" value="12" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="客户收益评估" prop="benifit_evaluate">
            <ElSelect v-model="formData.benifit_evaluate">
              <ElOption label="低" value="1" />
              <ElOption label="中" value="2" />
              <ElOption label="高" value="3" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="联系邮箱" prop="contact_email">
            <ElInput v-model="formData.contact_email" />
          </ElFormItem>
          <ElFormItem label="联系手机号" prop="contact_phone">
            <ElInput v-model="formData.contact_phone" />
          </ElFormItem>
          <ElFormItem label="固定电话" prop="telephone">
            <ElInput v-model="formData.telephone" />
          </ElFormItem>
          <ElFormItem label="公司网址" prop="company_url">
            <ElInput v-model="formData.company_url" />
          </ElFormItem>
          <ElFormItem label="客户意向产品" prop="intended_product">
            <ElInput v-model="formData.intended_product" />
          </ElFormItem>
          <ElFormItem label="社交媒体" prop="social_media">
            <ElInput v-model="formData.social_media" />
          </ElFormItem>
          <ElFormItem label="社媒联系" prop="social_media_contact">
            <ElInput v-model="formData.social_media_contact" />
          </ElFormItem>
        </el-col>
      </el-row>

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
      value: 'china',
      label: '中国',
      children: [
        {
          value: 'beijing',
          label: '北京'
        },
        {
          value: 'shanghai',
          label: '上海'
        },
        {
          value: 'guangzhou',
          label: '广州'
        },
        {
          value: 'shenzhen',
          label: '深圳'
        },
        {
          value: 'hangzhou',
          label: '杭州'
        },
        {
          value: 'chengdu',
          label: '成都'
        },
        {
          value: 'wuhan',
          label: '武汉'
        },
        {
          value: 'nanjing',
          label: '南京'
        },
        {
          value: 'chongqing',
          label: '重庆'
        },
        {
          value: 'tianjin',
          label: '天津'
        },
        {
          value: 'xi_an',
          label: '西安'
        },
        {
          value: 'suzhou',
          label: '苏州'
        },
        {
          value: 'qingdao',
          label: '青岛'
        },
        {
          value: 'dalian',
          label: '大连'
        },
        {
          value: 'shijiazhuang',
          label: '石家庄'
        },
        {
          value: 'zhengzhou',
          label: '郑州'
        },
        {
          value: 'changsha',
          label: '长沙'
        },
        {
          value: 'fuzhou',
          label: '福州'
        },
        {
          value: 'nanchang',
          label: '南昌'
        },
        {
          value: 'xiamen',
          label: '厦门'
        }
      ]
    },
    {
      value: 'usa',
      label: '美国',
      children: [
        {
          value: 'new_york',
          label: '纽约'
        },
        {
          value: 'los_angeles',
          label: '洛杉矶'
        },
        {
          value: 'chicago',
          label: '芝加哥'
        },
        {
          value: 'houston',
          label: '休斯顿'
        },
        {
          value: 'san_francisco',
          label: '旧金山'
        }
      ]
    },
    {
      value: 'uk',
      label: '英国',
      children: [
        {
          value: 'london',
          label: '伦敦'
        },
        {
          value: 'manchester',
          label: '曼彻斯特'
        },
        {
          value: 'birmingham',
          label: '伯明翰'
        },
        {
          value: 'leeds',
          label: '利兹'
        },
        {
          value: 'glasgow',
          label: '格拉斯哥'
        }
      ]
    },
    {
      value: 'germany',
      label: '德国',
      children: [
        {
          value: 'berlin',
          label: '柏林'
        },
        {
          value: 'munich',
          label: '慕尼黑'
        },
        {
          value: 'frankfurt',
          label: '法兰克福'
        },
        {
          value: 'hamburg',
          label: '汉堡'
        },
        {
          value: 'cologne',
          label: '科隆'
        }
      ]
    },
    {
      value: 'japan',
      label: '日本',
      children: [
        {
          value: 'tokyo',
          label: '东京'
        },
        {
          value: 'osaka',
          label: '大阪'
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
    follow_up_frequency: 0,
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
