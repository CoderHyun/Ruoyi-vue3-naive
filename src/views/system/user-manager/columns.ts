import { ColumnsType } from '/#/index';

export const columns: ColumnsType[] = [
  { key: 'userId', title: '用户编号' },
  { key: 'userName', title: '用户名称' },
  { key: 'nickName', title: '用户昵称' },
  {
    key: 'nickName',
    title: '部门',
    render: (row) => {
      return row?.dept?.deptName;
    },
  },
  { key: 'phonenumber', title: '手机号码' },
  { key: 'status', title: '状态' },
  { key: 'createTime', title: '创建时间' },
];
