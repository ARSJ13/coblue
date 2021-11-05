<template>
  <ul v-if="listTasks.length !== 0" class="list list-group bg-light p-2">
    <li v-for="(task, id) in listTasks" :key="id" class="list-group-item p-2">
      <b-row class="d-flex">
        <b-col 
          cols="8"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          :title='task.description === null ? " " : "Descrição: "+task.description'
          class='position-relative'
        >
          <b-icon
            v-if="task.description"
            :class="task.description && 'description'"
            icon="info-circle-fill"
            variant="primary"
          ></b-icon>
          <span class="fs-2" :class="task.confirm && 'text-decoration-line-through'">{{ task.title }}</span>
        </b-col>
        <b-col
          cols="4"
          class="d-flex justify-content-end align-items-center"
        > 
          <b-icon 
            v-for="(icon, index) in icons"
            :key="index"
            :variant="icon.color"
            :icon="icon.icon"
            class="icon h3"
            @click="icon.function(id)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="icon.alert"
          ></b-icon>
        </b-col>
      </b-row>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: ['listTasks', 'icons']

}
</script>

<style scoped>
.icon {
  margin-right: .5rem;
  cursor: pointer;
}
.icon:hover {
  opacity: .6;
}
.description {
  cursor: help;
  position: absolute;
  top: -12px;
  left: 0;
}
</style>