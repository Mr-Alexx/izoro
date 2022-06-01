/**
 * @desc 业务数据表常量接口
 * @module interface/state
 * @author 潜
 */

// 通用状态
export enum StatusType {
  disabled = 0, // 禁用
  active = 1, // 启用
}

// 排序状态
export enum SortType {
  desc = 0, // 降序
  asc = 1, // 升序
}

// 发布状态
export enum PublishStatus {
  recycle = 0, // 回收站
  draft = 1, // 草稿
  published = 2, // 已发布
}

// 公开状态
export enum PublicStatus {
  public = 0, // 公开
  password = 1, // 需要密码
  secret = 2, // 私密
}

// 来源类型
export enum sourceType {
  origin = 0, // 原创
  reprint = 1, // 转载
}

// 账号状态
export enum UserStatus {
  invalid = 0, // 作废
  frozen = 1, // 冻结
  active = 2, // 正常
}

// 评论状态
export enum CommentStatus {
  reviewing = 0, // 审核中
  published = 1, // 正常
  trash = 2, // 垃圾
  deleted = 3, // 已删除
}

// 菜单节点类型
export enum MenuNodeTypes {
  menu = 1, // 目录
  permission = 2, // 按钮
}

// 菜单状态
export enum MenuStatus {
  deleted = 0, // 已删除
  normal = 1, // 正常
}

export enum RoleStatus {
  disabled = 0, // 禁用
  normal = 1, // 正常
}
