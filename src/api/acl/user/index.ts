import request from '@/utils/request'
import {
  User,
  UserResponseData,
  AllRoleResponseData,
  SetRoleData,
} from './type'

enum API {
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  AllROLE_URL = '/admin/acl/user/toAssign/',
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  DELETE_URL = '/admin/acl/user/remove/',
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post(API.ADDUSER_URL, data)
  }
}
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.AllROLE_URL + userId)
export const reqSetRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)
export const reqDeleteUser = (userId: number) =>
  request.delete<any, any>(API.DELETE_URL + userId)
export const reqSelectUser = (idList: number[]) =>
  request.delete<any, any>(API.DELETEALLUSER_URL, { data: idList })
