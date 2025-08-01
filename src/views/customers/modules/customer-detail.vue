<template>
  <ElDialog v-model="dialogVisible" :title="dialogType" width="60%" align-center>
    <el-descriptions title="" border>
      <el-descriptions-item label="客户名称">{{ userData.name }}</el-descriptions-item>
      <el-descriptions-item label="联系邮箱">{{ userData.contactEmail }}</el-descriptions-item>
      <el-descriptions-item label="客户性别">{{ userData.gender }}</el-descriptions-item>
      <el-descriptions-item label="联系手机号">{{ userData.contactPhone }}</el-descriptions-item>
      <el-descriptions-item label="联系地址">{{ userData.contactAddress }}</el-descriptions-item>
      <el-descriptions-item label="客户来源">
        <el-tag size="small">{{ userData.source }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="客户状态">
        <el-tag size="small">{{ userData.status }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="城市">
        {{ userData.city }}
      </el-descriptions-item>
      <el-descriptions-item label="国家">
        {{ userData.country }}
      </el-descriptions-item>
      <el-descriptions-item label="公司名称">
        {{ userData.companyName }}
      </el-descriptions-item>
      <el-descriptions-item label="跟进状态">
        {{ userData.followStatus }}
      </el-descriptions-item>
      <el-descriptions-item label="跟进频率">
        {{ userData.followFrequency }}
      </el-descriptions-item>
      <el-descriptions-item label="客户等级">
        {{ userData.level }}
      </el-descriptions-item>
      <el-descriptions-item label="客户渠道">
        {{ userData.channel }}
      </el-descriptions-item>
      <el-descriptions-item label="客户收益评估">
        {{ userData.evaluation }}
      </el-descriptions-item>
      <el-descriptions-item label="固定电话">
        {{ userData.telephone }}
      </el-descriptions-item>
      <el-descriptions-item label="公司网址">
        {{ userData.companyWebsite }}
      </el-descriptions-item>

      <el-descriptions-item label="客户更新时间">
        {{ userData.updateTime }}
      </el-descriptions-item>
      <el-descriptions-item label="客户备注">
        {{ userData.remark }}
      </el-descriptions-item>
      <el-descriptions-item label="客户角色">
        <el-tag size="small" v-for="role in userData.role" :key="role">{{ role }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="客户来源">
        <el-tag size="small">{{ userData.source }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="客户备注">
        <el-tag size="small">{{ userData.remark }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address">
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
  </ElDialog>
</template>

<script setup lang="ts">
  //   import { CustomerService } from '@/api/customerApi'

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

  // 对话框显示控制
  const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
  })

  const dialogType = '客户详情'

  // 表单数据
  const formData = reactive({
    name: props.userData.name,
    phone: props.userData.phone,
    gender: props.userData.gender,
    role: props.userData.role
  })
</script>
