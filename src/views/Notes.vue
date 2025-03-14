<template>
    <v-container>
      <v-app-bar color="primary" dark>
        <v-toolbar-title>Mis Notas</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="logout">Cerrar sesión</v-btn>
      </v-app-bar>
  
      <v-card class="pa-4 mt-4">
        <v-text-field v-model="newNote.title" label="Título" required></v-text-field>
        <v-textarea v-model="newNote.content" label="Contenido" required></v-textarea>
        <v-btn color="success" @click="addNote">Guardar Nota</v-btn>
      </v-card>
  
      <v-list class="mt-4">
        <v-list-item v-for="note in notes" :key="note.id">
          <v-card class="mb-3">
            <v-card-title>{{ note.title }}</v-card-title>
            <v-card-text>{{ note.content }}</v-card-text>
            <v-card-actions>
              <v-btn color="red" @click="deleteNote(note.id)">Eliminar</v-btn>
            </v-card-actions>
          </v-card>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    data() {
      return {
        notes: [],
        newNote: {
          title: '',
          content: ''
        }
      };
    },
    async created() {
      await this.loadNotes();
    },
    methods: {
      async loadNotes() {
        try {
          const token = localStorage.getItem('token');
          const response = await api.get('/notes', {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.notes = response.data;
        } catch (err) {
          console.error('Error cargando notas', err);
        }
      },
      async addNote() {
        if (!this.newNote.title || !this.newNote.content) {
          alert('Título y contenido son obligatorios');
          return;
        }
  
        try {
          const token = localStorage.getItem('token');
          const response = await api.post('/notes', this.newNote, { 
            headers: { Authorization: `Bearer ${token}` } }
          );
          this.notes.push(response.data);
          this.newNote.title = '';
          this.newNote.content = '';
        } catch (err) {
          console.error('Error guardando nota', err);
        }
      },
      async deleteNote(noteId) {
        try {
          const token = localStorage.getItem('token');
          await api.delete(`/notes/${noteId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.notes = this.notes.filter(note => note.id !== noteId);
        } catch (err) {
          console.error('Error eliminando nota', err);
        }
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/');
      }
    }
  };
  </script>