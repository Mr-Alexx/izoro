<template>
  <div>

  </div>
</template>

<script>
// , ADD_ROLE, EDIT_ROLE, DELETE_ROLE
import { FETCH_ROLE_LIST } from '@/api/system'

export default {
  name: 'Role',
  created () {
    FETCH_ROLE_LIST().then(data => {
      console.log(data)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
