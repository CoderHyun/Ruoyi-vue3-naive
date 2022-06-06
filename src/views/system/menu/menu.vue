<template>
  <div>
    <CreateDrawer ref="createDrawerRef" :title="drawerTitle" />
    <BasicTable :columns="columns" :data-source="treeData" :pagination="false" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getMenuList } from '@/api/system/menu';
  import { awaitWrap, handleTree } from '@/utils';
  import CreateDrawer from './CreateDrawer.vue';
  import { MenuType } from '@/types/system/menuType';
  import { BasicTable } from '@/components/Table';
  import { columns } from './columns';

  const createDrawerRef = ref();
  const treeData = ref([]);
  const loading = ref(true);
  const drawerTitle = ref('');

  const getMenuTreeData = async () => {
    const [data, err] = await awaitWrap<MenuType>(getMenuList());
    if (err) {
      loading.value = false;
      return false;
    }
    treeData.value = handleTree(data, 'menuId');
  };

  onMounted(async () => {
    await getMenuTreeData();
  });
</script>
