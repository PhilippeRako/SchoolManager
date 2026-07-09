<template>
  <div class="container mt-4">
    <h2>Gestion des élèves</h2>

    <div class="row mt-3">
      <!-- CLASSES -->
      <div class="col-md-4">
        <div class="card p-3 mb-3">
          <h4>Classes</h4>

          <input v-model="classeNom" class="form-control mb-2" placeholder="Nom de la classe">
          <button class="btn btn-success mb-2" @click="createClasse">Ajouter</button>

          <ul class="list-group">
            <li v-for="c in classes" :key="c.id" class="list-group-item d-flex justify-content-between align-items-center">
              <input v-model="c.nom" class="form-control me-2">
              <button class="btn btn-sm btn-primary me-1" @click="updateClasse(c)">Save</button>
              <button class="btn btn-sm btn-danger" @click="deleteClasse(c.id)">X</button>
            </li>
          </ul>
        </div>
      </div>

      <!-- ELEVES -->
      <div class="col-md-4">
        <div class="card p-3 mb-3">
          <h4>Élèves</h4>

          <!-- Création -->
          <input v-model="eleveNom" class="form-control mb-2" placeholder="Nom">
          <input v-model="elevePrenom" class="form-control mb-2" placeholder="Prénom">

          <select v-model="eleveClasse" class="form-control mb-2">
            <option disabled value="">Classe</option>
            <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.nom }}</option>
          </select>

          <!-- Nouveaux champs facultatifs -->
          <input v-model="eleveDateNaissance" type="date" class="form-control mb-2" placeholder="Date de naissance">
          <input v-model="eleveAge" type="number" class="form-control mb-2" placeholder="Âge">
          <input v-model="eleveAdresse" class="form-control mb-2" placeholder="Adresse postale">
          <input v-model="eleveTelephone" class="form-control mb-2" placeholder="Téléphone">
          <input v-model="eleveUrgenceNom" class="form-control mb-2" placeholder="Nom contact urgence">
          <input v-model="eleveUrgenceTel" class="form-control mb-2" placeholder="Téléphone urgence">
          <input v-model="eleveEmail" type="email" class="form-control mb-2" placeholder="Adresse mail">

          <button class="btn btn-success mb-2" @click="createEleve">Ajouter</button>

          <!-- Liste des élèves -->
          <ul class="list-group">
            <li v-for="e in eleves" :key="e.id" class="list-group-item">

              <div class="d-flex align-items-center mb-2">
                <input v-model="e.nom" class="form-control me-2" placeholder="Nom">
                <input v-model="e.prenom" class="form-control me-2" placeholder="Prénom">
              </div>

              <select v-model="e.classe_id" class="form-control mb-2">
                <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.nom }}</option>
              </select>

              <!-- Champs facultatifs en édition -->
              <input v-model="e.date_naissance" type="date" class="form-control mb-2" placeholder="Date de naissance">
              <input v-model="e.age" type="number" class="form-control mb-2" placeholder="Âge">
              <input v-model="e.adresse" class="form-control mb-2" placeholder="Adresse postale">
              <input v-model="e.telephone" class="form-control mb-2" placeholder="Téléphone">
              <input v-model="e.urgence_nom" class="form-control mb-2" placeholder="Nom contact urgence">
              <input v-model="e.urgence_tel" class="form-control mb-2" placeholder="Téléphone urgence">
              <input v-model="e.email" type="email" class="form-control mb-2" placeholder="Adresse mail">

              <div class="d-flex justify-content-end">
                <button class="btn btn-sm btn-primary me-1" @click="updateEleve(e)">Save</button>
                <button class="btn btn-sm btn-danger" @click="deleteEleve(e.id)">X</button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- COURS & PRESENCE -->
      <div class="col-md-4">
        <div class="card p-3 mb-3">
          <h4>Cours & présence du jour</h4>

          <input v-model="coursNom" class="form-control mb-2" placeholder="Nom du cours">
          <select v-model="coursClasse" class="form-control mb-2">
            <option disabled value="">Classe</option>
            <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.nom }}</option>
          </select>
          <button class="btn btn-success mb-2" @click="createCours">Ajouter cours</button>

          <select v-model="coursSelection" class="form-control mb-3">
            <option disabled value="">Cours du jour</option>
            <option v-for="c in cours" :key="c.id" :value="c.id">
              {{ c.nom }} ({{ c.classe_nom }})
            </option>
          </select>

          <div v-for="e in eleves" :key="e.id" class="d-flex align-items-center mb-2">
            <span class="me-3">{{ e.prenom }} {{ e.nom }}</span>
            <select class="form-control w-50" @change="setPresence(e.id, $event.target.value)">
              <option value="">Statut</option>
              <option value="present">Présent</option>
              <option value="retard">Retard</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      classes: [],
      eleves: [],
      cours: [],

      // Classes
      classeNom: '',

      // Élèves
      eleveNom: '',
      elevePrenom: '',
      eleveClasse: '',
      eleveDateNaissance: '',
      eleveAge: '',
      eleveAdresse: '',
      eleveTelephone: '',
      eleveUrgenceNom: '',
      eleveUrgenceTel: '',
      eleveEmail: '',

      // Cours
      coursNom: '',
      coursClasse: '',
      coursSelection: ''
    };
  },

  async mounted() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      const c = await axios.get('/api/classes');
      this.classes = c.data;

      const e = await axios.get('/api/eleves');
      this.eleves = e.data;

      const co = await axios.get('/api/cours');
      this.cours = co.data;
    },

    // CLASSES
    async createClasse() {
      if (!this.classeNom) return;
      await axios.post('/api/classes', { nom: this.classeNom });
      this.classeNom = '';
      await this.loadData();
    },

    async updateClasse(c) {
      await axios.put(`/api/classes/${c.id}`, { nom: c.nom });
      await this.loadData();
    },

    async deleteClasse(id) {
      await axios.delete(`/api/classes/${id}`);
      await this.loadData();
    },

    // ELEVES
    async createEleve() {
      if (!this.eleveNom || !this.elevePrenom || !this.eleveClasse) return;

      await axios.post('/api/eleves', {
        nom: this.eleveNom,
        prenom: this.elevePrenom,
        classe_id: this.eleveClasse,
        date_naissance: this.eleveDateNaissance || null,
        age: this.eleveAge || null,
        adresse: this.eleveAdresse || null,
        telephone: this.eleveTelephone || null,
        urgence_nom: this.eleveUrgenceNom || null,
        urgence_tel: this.eleveUrgenceTel || null,
        email: this.eleveEmail || null
      });

      this.eleveNom = '';
      this.elevePrenom = '';
      this.eleveClasse = '';
      this.eleveDateNaissance = '';
      this.eleveAge = '';
      this.eleveAdresse = '';
      this.eleveTelephone = '';
      this.eleveUrgenceNom = '';
      this.eleveUrgenceTel = '';
      this.eleveEmail = '';

      await this.loadData();
    },

    async updateEleve(e) {
      await axios.put(`/api/eleves/${e.id}`, {
        nom: e.nom,
        prenom: e.prenom,
        classe_id: e.classe_id,
        date_naissance: e.date_naissance || null,
        age: e.age || null,
        adresse: e.adresse || null,
        telephone: e.telephone || null,
        urgence_nom: e.urgence_nom || null,
        urgence_tel: e.urgence_tel || null,
        email: e.email || null
      });

      await this.loadData();
    },

    async deleteEleve(id) {
      await axios.delete(`/api/eleves/${id}`);
      await this.loadData();
    },

    // COURS
    async createCours() {
      if (!this.coursNom || !this.coursClasse) return;

      await axios.post('/api/cours', {
        nom: this.coursNom,
        classe_id: this.coursClasse
      });

      this.coursNom = '';
      this.coursClasse = '';
      await this.loadData();
    },

    async setPresence(eleve_id, statut) {
      if (!this.coursSelection || !statut) return;

      const date = new Date().toISOString().split('T')[0];

      await axios.post('/api/presences', {
        eleve_id,
        cours_id: this.coursSelection,
        date,
        statut
      });
    }
  }
};
</script>
