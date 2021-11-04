<template>
  <b-container class="my-5" fluid='md'>
    <b-row class="justify-content-between">
      <b-col cols="4" class="justify-content-md-center">
        <h1 class="title mb-5 text-center border-1 border-light border-bottom text-primary">TO DO</h1>
        <b-form @submit="addTask" @reset="onReset">
          <b-form-group>
            <b-form-input
              v-model="title"
              class="mb-2"
              type="text"
              placeholder="Título"
              required
            ></b-form-input>
            <b-form-textarea
              v-model="description"
              class="mb-2"
              placeholder="Descrição..."
              rows="3"
            ></b-form-textarea>
          </b-form-group>
          <div class="d-flex justify-content-end">
            <b-button class="me-2" type="reset" variant="light">Limpar</b-button>
            <b-button type="submit" variant="primary">{{ editTask ? 'Editar' : 'Adicionar' }}</b-button>
          </div>
        </b-form>
      </b-col>
      <b-col cols="6">
        <h1 class="title mb-5 text-center border-1 border-light border-bottom">List</h1>
        <ul v-if="listTasks.length !== 0" class="list list-group bg-light p-2">
          <li v-for="(task, id) in listTasks" :key="id" class="list-group-item p-2">
            <b-row class="d-flex">
              <b-col cols="8">
                <span class="fs-2" :class="underline && 'text-decoration-line-through'">{{ task.title }}</span>
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
                ></b-icon>
              </b-col>
            </b-row>
            <b-row v-if="task.description">
              <p>{{ task.description }}</p>
            </b-row>
          </li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      title: null,
      description: null,
      editTask: null,
      underline: false,
      icons: [
        {
          icon: 'check-circle',
          color: 'success',
          function: (icon) => {
            this.underline = true
          }
        },
        {
          icon: 'pencil-square',
          color: 'secondary',
          function: (id) => {
            this.title = this.listTasks[id].title
            this.description = this.listTasks[id].description
            this.editTask = id
          }
        },
        {
          icon: 'cloud-upload',
          color: 'warning',
          function: (id) => {
            console.log(3, id)
          }
        },
        {
          icon: 'x-circle',
          color: 'danger',
          function: (id) => {
            this.$store.commit('DELETE_TASK', id)
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      listTasks: state => state.list
    })    
  },
  methods: {
    addTask() {
      let form = {
          title: this.title,
          description: this.description,
          date: new Date().toLocaleDateString()
        }
      if (this.editTask === null) {
        this.$store.commit('ADD_TASK', form)
        this.onReset()
      
      } else {
        this.$store.commit('EDIT_TASK', { ...form, index: this.editTask })
        this.editTask = null
      }
    },
    onReset() {
      this.title = null
      this.description = null
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: bold;
}
.list {
  display: flex;
  gap: .5rem;
}
.icon {
  margin-right: .5rem;
  cursor: pointer;
}
.icon:hover {
  opacity: .6;
}
</style>