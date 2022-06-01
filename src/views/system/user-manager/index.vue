<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { getUserList } from '@/api/system/user';
  import { BasicTable } from '@/components/Table';
  import { columns } from './columns';
  import { PlusOutlined } from '@vicons/antd';

  const pageParams = ref({});

  const getUserInfoList = async (params?: any) => {
    let _params = {
      ...unref(pageParams),
      ...params,
    };
    return await getUserList(_params);
  };
</script>

<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="用户管理" />
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <BasicTable :columns="columns" :request="getUserInfoList">
        <template #tableTitle>
          <n-button type="primary">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            添加用户
          </n-button>
        </template>
      </BasicTable>
    </n-card>
  </div>
</template>
