<template>
  <b-row>
    <List :listTasks='files' :icons='icons'/>
  </b-row>  
</template>

<script>
import List from './List'

export default {
  name: 'Archive',
  components: {
    List
  },
  props: ['files', 'icons']
}
</script>