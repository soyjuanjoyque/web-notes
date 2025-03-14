<template>
    <v-container>
      <v-card class="mx-auto pa-5" max-width="400">
        <v-card-title class="text-center">Iniciar Sesión</v-card-title>
        <v-form @submit.prevent="login">
          <v-text-field v-model="form.usernameOrEmail" label="Usuario o Email" required></v-text-field>
          <v-text-field v-model="form.password" label="Contraseña" type="password" required></v-text-field>
          <v-btn type="submit" block color="primary">Ingresar</v-btn>
        </v-form>
        <p v-if="error" class="text-red">{{ error }}</p>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    data() {
      return {
        form: { usernameOrEmail: '', password: '' },
        error: null
      };
    },
    methods: {
      async login() {
        try {
          const response = await api.post('/auth/login', this.form);
          localStorage.setItem('token', response.data.access_token);
          this.$router.push('/notes');
        } catch (err) {
          this.error = 'Credenciales incorrectas';
        }
      }
    }
  };
  </script>