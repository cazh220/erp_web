import request from '@/utils/http'

export class CustomerService {
  // 获取客户列表
  static getCustomerList(params: Api.Customer.ListParams) {
    return request.get<Api.Customer.CustomerListData>({
      url: '/api/customers',
      params
    })
  }
}
