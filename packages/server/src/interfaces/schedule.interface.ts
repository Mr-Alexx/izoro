export enum ScheduleMethods {
  获取Github列表 = 'getGitHubList',
  获取掘金列表 = 'getJueJinList',
}

export const scheduleMethods = Object.keys(ScheduleMethods).map(key => ({
  value: ScheduleMethods[key],
  label: key,
}));
