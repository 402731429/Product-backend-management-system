import request from '@/utils/request'
import { PermissionResponseData, MenuParams } from './type'

enum API {
  ALLPERMISSION_URL = '/admin/acl/permission',
  ADDMENU_URL = '/admin/acl/permission/save',
  UPDATE_URL = '/admin/acl/permission/update',
  DELETE_UEL = '/admin/acl/permission/remove/',
}

export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)
export const reqAddOrPermission = (data: MenuParams) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}
export const reqDeletePermission = (id: number) =>
  request.delete<any, any>(API.DELETE_UEL + id)
