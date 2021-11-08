<template>
  <b-container class="my-5" fluid='md'>
    <b-row class="border-1 border-secondary border-bottom mb-5">
      <b-col cols="6" class="d-flex justify-content-start">
        <h1 class="font-bold text-center"><span class="text-primary">TO DO</span> List</h1>
      </b-col>
      <b-col cols="6" class="d-flex justify-content-end">
        <b-icon @click="archiveActive=false" class="icon h2 me-4" variant="primary" icon="arrow-return-left"></b-icon>
        <b-icon @click="archiveActive=true" class="icon h2" variant="danger" icon="archive-fill"></b-icon>
      </b-col>
    </b-row>
    <b-row class="justify-content-between">
      <b-col v-if="!archiveActive" cols="12" md="5" class="justify-content-md-center">
        <h4 class="font-bold">{{ editTask ? 'Editar Tarefa: ': 'Novas Tarefas: '}}</h4>
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
            <b-button type="submit" variant="primary">{{ editTask ? 'Salvar' : 'Adicionar' }}</b-button>
          </div>
        </b-form>
      </b-col>
      <b-col :cols="archiveActive ? '12' : '12'" md="6">
        <nav v-if="listTasks.length !== 0">
          <h4 class="font-bold">{{ archiveActive ? 'Tarefas Arquivadas:' : 'Tarefas Ativas:' }}</h4>
          <div v-if="!archiveActive" class="btn-group mb-4" role="group">
            <button @click="toListAll"  type="button" class="btn btn-outline-primary">Todas</button>
            <button @click="toDayList" type="button" class="btn btn-outline-primary">Do Dia</button>
          </div>
        </nav>
        <Archive v-if="archiveActive" :files='archive' :icons='iconsArchive' />
        <div v-else>
          <List v-if="!toggleDay" :listTasks='listTasks' :icons='icons' />
          <List v-else :listTasks='listOfDay' :icons='icons' />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import Archive from '@/components/Archive'
import List from '@/components/List'

export default {
  name: 'Dashboard',
  components: {
    Archive,
    List
  },
  data() {
    return {
      archiveActive: false,
      title: null,
      description: null,
      editTask: null,
      indexTask: null,
      toggleDay: false,
      listOfDay: [],
      icons: [
        { 
          icon: 'check-circle',
          color: 'success',
          alert: 'concluir tarefa',
          function: (id) => {
            this.listTasks[id].confirm = true
          }
        },
        {
          icon: 'pencil-square',
          color: 'secondary',
          alert: 'editar tarefa',
          function: (id) => {
            this.title = this.listTasks[id].title
            this.description = this.listTasks[id].description
            this.indexTask = id
            this.editTask = true
          }
        },
        {
          icon: 'cloud-upload',
          color: 'warning',
          alert: 'arquivar tarefa',
          function: (id) => {
            this.$store.commit('TO_FILE', this.listTasks[id])
            this.$store.commit('DELETE_TASK', id)
          }
        },
        {
          icon: 'x-circle',
          color: 'danger',
          alert: 'excluir tarefa',
          function: (id) => {
            this.$store.commit('DELETE_TASK', id)
          }
        }
      ],
      iconsArchive: [
        {
          icon: 'x-circle',
          color: 'danger',
          alert: 'excluir tarefa',
          function: (id) => {
            this.$store.commit('DELETE_FILE', id)
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      listTasks: state => state.list,
      archive: state => state.archive
    })    
  },
  methods: {
    addTask() {
      let form = {
          title: this.title,
          description: this.description,
          confirm: false,
          date: new Date().toLocaleDateString()
        }
      if (!this.editTask) {
        Promise.all([form])
          .then(([form]) => {
            console.log(form)
            this.$store.commit('ADD_TASK', form)
          })
          .finally(() => this.onReset())
      
      } else {
        Promise.all([form])
          .then(([form]) => {
            this.$store.commit('EDIT_TASK', { ...form, index: this.indexTask })
          })
          .finally(() => {
            this.onReset()
            this.editTask = false
          })
      }
    },
    onReset() {
      this.title = null
      this.description = null
    },
    toDayList() {
      this.listOfDay = this.listTasks.map(item => {
        let day = new Date().toLocaleDateString()
        if (item.date === day) {
          return item
        }
      })
      this.toggleDay = true
    },
    toListAll() {
      this.toggleDay = false
    }
  }
}
</script>

<style scoped>
.font-bold {
  font-weight: bold;
}
.icon {
  cursor: pointer;
}
.list {
  display: flex;
  gap: .5rem;
}
</style>