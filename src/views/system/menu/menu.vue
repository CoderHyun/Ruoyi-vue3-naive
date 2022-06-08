<template>
  <div>
    <CreateDrawer ref="createDrawerRef" :title="drawerTitle" />
    <n-card>
      <BasicTable
        :columns="columns"
        :row-key="rowKey"
        :request="getMenuTreeData"
        :actionColumn="actionColumn"
        :pagination="false"
      />
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { getMenuList } from '@/api/system/menu';
  import { handleTree } from '@/utils';
  // import type { BasicColumn } from '@/components/Table/src/types/table';
  import CreateDrawer from './CreateDrawer.vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { columns } from './columns';
  import { MenuType } from '@/types/system/menuType';

  defineOptions({
    name: 'MenuIndex',
  });

  type RowData = {
    menuId: number;
    children?: RowData[];
  };
  const rowKey = (row: RowData) => row.menuId + '';
  const createDrawerRef = ref();
  const drawerTitle = ref('');
  const actionColumn = reactive({
    width: 250,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction, {
        style: 'text',
        actions: [
          {
            type: 'success',
            label: '新增',
            icon: 'outline-delete-outline',
            onClick: addMenuClick.bind(null, record),
          },
        ],
      });
    },
  });

  function addMenuClick(row: MenuType) {
    createDrawerRef.value.isDrawer = true;
    console.log(row);
  }

  const getMenuTreeData = async () => {
    const response = await getMenuList();
    response.data = handleTree(response.data, 'menuId');
    return response;
  };
</script>
