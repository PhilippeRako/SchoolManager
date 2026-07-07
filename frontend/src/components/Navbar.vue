<template>
  <nav class="navbar navbar-expand-lg navbar-modern px-3">
    <a class="navbar-brand" href="#">SchoolManager</a>

    <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/gestion-eleves">
            Gestion élèves
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/gestion-profs">
            Gestion profs
          </router-link>
        </li>
      </ul>

      <span class="navbar-text me-3">
        {{ prenom }} {{ nom }}
      </span>

      <button class="btn btn-sm btn-logout" @click="logout">
        Déconnexion
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      nom: localStorage.getItem('nom'),
      prenom: localStorage.getItem('prenom')
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>
