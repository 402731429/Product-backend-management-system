import request from '@/utils/request'
import { RoleResponseData, RoleData, MenuResponseData } from './type'

enum API {
  ALLROLE_URL = '/admin/acl/role/',
  ADDROLE_URL = '/admin/acl/role/save',
  UPDATEROLE_URL = '/admin/acl/role/update',
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
  DELETEROLE_URL = '/admin/acl/role/remove/',
}

export const reqAllRole = (pageNo: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${pageNo}/${limit}/?roleName=${roleName}`,
  )
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (!data.id) {
    return request.post<any, any>(API.ADDROLE_URL, data)
  } else {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  }
}
export const reqAllMenuList = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId)
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.DELETEROLE_URL + roleId)
