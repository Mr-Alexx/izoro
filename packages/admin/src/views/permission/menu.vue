<template>
  <div>
    菜单列表
  </div>
</template>

<script>
// FETCH_MENU_LIST, ADD_MENU, EDIT_MENU, DELETE_MENU,
import { FETCH_ROLE_LIST } from '@/api/system'

export default {
  name: 'Menu',
  created () {
    FETCH_ROLE_LIST().then(data => {
      console.log(data)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
