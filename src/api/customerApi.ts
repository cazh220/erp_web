import request from '@/utils/http'

export class CustomerService {
  // 获取客户列表
  static getCustomerList(params: Api.Customer.ListParams) {
    console.log('Fetching customer list with params:', params)
    // Make a GET request to the customer API with the provided parameters
    return request.get<Api.Customer.CustomerListData>({
      url: '/api/customers',
      params
    })
  }

  // 添加或更新客户
  static addOrUpdateCustomer(data: Api.Customer.CustomerFormData) {
    console.log('Submitting customer data:', data)
    // Make a POST request to the customer API with the provided data
    return request.post<Api.Customer.CustomerFormData>({
      url: '/api/customers',
      data
    })
  }
}
