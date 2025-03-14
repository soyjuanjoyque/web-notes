<template>
    <v-container>
      <v-card class="mx-auto pa-5" max-width="400">
        <v-card-title class="text-center">Registro</v-card-title>
        <v-form @submit.prevent="register">
          <v-text-field v-model="form.username" label="Usuario" required></v-text-field>
          <v-text-field v-model="form.email" label="Email" required></v-text-field>
          <v-text-field v-model="form.password" label="Contraseña" type="password" required></v-text-field>
          <v-text-field v-model="form.confirmPassword" label="Confirmar Contraseña" type="password" required></v-text-field>
          <v-btn type="submit" block color="primary">Registrarse</v-btn>
        </v-form>
        <p v-if="error" class="text-red">{{ error }}</p>
        <p v-if="success" class="text-green">{{ success }}</p>
        <v-btn variant="text" @click="$router.push('/')">¿Ya tienes cuenta? Inicia sesión</v-btn>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        error: null,
        success: null
      };
    },
    methods: {
      async register() {
        if (this.form.password !== this.form.confirmPassword) {
          this.error = 'Las contraseñas no coinciden';
          return;
        }
  
        try {
          const response = await axios.post('http://localhost:10000/api/auth/register', {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password
          });
  
          this.success = 'Cuenta creada con éxito. Redirigiendo al login...';
          setTimeout(() => this.$router.push('/'), 2000); // Redirigir al login en 2 segundos
        } catch (err) {
          this.error = err.response?.data?.message || 'Error al registrar usuario';
        }
      }
    }
  };
  </script>