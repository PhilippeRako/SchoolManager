<template>
  <div class="container mt-5" style="max-width: 400px;">
    <h3 class="mb-3">Connexion</h3>

    <form @submit.prevent="login">
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required>
      </div>

      <div class="mb-3">
        <label>Mot de passe</label>
        <input v-model="password" type="password" class="form-control" required>
      </div>

      <button class="btn btn-primary w-100">Se connecter</button>
    </form>

    <p class="text-danger mt-3">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password
        });


        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('nom', res.data.nom);
        localStorage.setItem('prenom', res.data.prenom);


        if (res.data.role === 'super_admin') {
          this.$router.push('/dashboard-super-admin');
        } else {
          this.$router.push('/dashboard-admin');
        }

      } catch (err) {
        this.error = err.response?.data?.error || 'Erreur de connexion';
      }
    }
  }
};
</script>
