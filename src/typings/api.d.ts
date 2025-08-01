/**
 * namespace: Api
 *
 * 所有接口相关类型定义
 * 在.vue文件使用会报错，需要在 eslint.config.mjs 中配置 globals: { Api: 'readonly' }
 */
declare namespace Api {
  /** 基础类型 */
  namespace Http {
    /** 基础响应 */
    interface BaseResponse<T = any> {
      // 状态码
      code: number
      // 消息
      msg: string
      // 数据
      data: T
    }
  }

  /** 通用类型 */
  namespace Common {
    /** 分页参数 */
    interface PaginatingParams {
      /** 当前页码 */
      current: number
      /** 每页条数 */
      size: number
      /** 总条数 */
      total: number
    }

    /** 通用搜索参数 */
    type PaginatingSearchParams = Pick<PaginatingParams, 'current' | 'size'>

    /** 启用状态 */
    type EnableStatus = '1' | '2'
  }

  /** 认证类型 */
  namespace Auth {
    /** 登录参数 */
    interface LoginParams {
      userName: string
      password: string
    }

    /** 登录响应 */
    interface LoginResponse {
      token: string
      refreshToken: string
    }
  }

  /** 用户类型 */
  namespace User {
    /** 用户信息 */
    interface UserInfo {
      userId: number
      userName: string
      roles: string[]
      buttons: string[]
      avatar?: string
      email?: string
      phone?: string
    }

    /** 用户列表数据 */
    interface UserListData {
      records: UserListItem[]
      current: number
      size: number
      total: number
    }

    /** 用户列表项 */
    interface UserListItem {
      id: number
      avatar: string
      createBy: string
      createTime: string
      updateBy: string
      updateTime: string
      status: '1' | '2' | '3' | '4' // 1: 在线 2: 离线 3: 异常 4: 注销
      name: string
      gender: string
      company_name: string
      country: string
      city: string
      follow_up_status: '1' | '2' | '3' | '4' // 1: 正常 2: 停用 3: 删除 4: 注销
      follow_up_frequency: string
      level: '1' | '2' | '3' | '4' // 1: 普通客户 2: 重要客户 3: 重点客户 4: 客户群
      source: '1' | '2' | '3' | '4' // 1: 客户群 2: 客户咨询 3: 客户合作 4: 客户购买
      channel: '1' | '2' | '3' | '4' // 1: 社交媒体 2: 广告 3: 搜索引擎 4: 其他
      benifit_evaluate: '1' | '2' | '3' | '4' // 1: 无 2: 有
      contact_phone: string
      telephone: string
      company_url: string
      intended_product: string
      phone: string
      contact_email: string
      roles: string[]
    }
  }

  namespace Customer {
    /** 客户列表数据 */
    interface CustomerListData {
      records: CustomerListItem[]
      current: number
      size: number
      total: number
    }

    interface CustomerListItem {
      id: number
      name: string
      phone: string
      email: string
      address: string
      createTime: string
      updateTime: string
      status: '1' | '2' | '3' | '4' // 1: 正常 2: 停用 3: 删除 4: 注销
    }

    /** 客户列表参数 */
    interface ListParams {
      name: string
      page: number
    }

    /** 客户表单数据 */
    interface CustomerFormData {
      id?: number
      name: string
      phone: string
      email: string
      address: string
      status: '1' | '2' | '3' | '4' // 1: 正常 2: 停用 3: 删除 4: 注销
    }
  }
}
