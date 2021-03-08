/**
 * @desc 业务数据表常量接口
 * @module interface/state
 * @author 潜
 */

// 排序状态
export enum SortType {
  desc = -1, // 降序
  asc = 1 // 升序
}

// 发布状态
export enum PublishStatus {
  recycle = -1, // 回收站
  draft = 0, // 草稿
  published = 1 // 已发布
}

// 公开状态
export enum PublicStatus {
  public = 0, // 公开
  password = 1, // 需要密码
  secret = 2 // 私密
}

// 来源类型
export enum sourceType {
  origin = 0, // 原创
  reprint = 1 // 转载
}

// 账号状态
export enum UserStatus {
  invalid = -1, // 作废
  frozen = 0, // 冻结
  active = 1 // 正常
}

// 评论状态
export enum CommentStatus {
  trash = -2, // 垃圾
  deleted = -1, // 已删除
  reviewing = 0, // 审核中
  published = 1 // 正常
}
