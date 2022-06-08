import { h } from 'vue';
import { ColumnsType } from '/#/index';
import { NTag } from 'naive-ui';
import { MenuType } from '@/types/system/menuType';

export const columns: ColumnsType[] = [
  { key: 'menuName', title: '菜单名称' },
  { key: 'icon', title: '图标' },
  { key: 'orderNum', title: '排序' },
  { key: 'perms', title: '权限标识' },
  { key: 'path', title: '组件路径' },
  {
    key: 'status',
    title: '状态',
    render(row: MenuType) {
      return h(
        NTag,
        {
          type: row.status === '0' ? 'success' : 'error',
        },
        {
          default: () => (row.status === '0' ? '正常' : '禁用'),
        }
      );
    },
  },
  { key: 'createTime', title: '创建时间' },
];
