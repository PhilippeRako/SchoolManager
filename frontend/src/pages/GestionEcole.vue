<template>
  <div class="container mt-4">
    <h2>Gestion de l'école</h2>

    <!-- Onglets -->
    <ul class="nav nav-tabs mt-3">
      <li class="nav-item"><a class="nav-link" :class="{active: onglet==='classes'}" @click="onglet='classes'">Classes</a></li>
      <li class="nav-item"><a class="nav-link" :class="{active: onglet==='eleves'}" @click="onglet='eleves'">Élèves</a></li>
      <li class="nav-item"><a class="nav-link" :class="{active: onglet==='cours'}" @click="onglet='cours'">Cours</a></li>
      <li class="nav-item"><a class="nav-link" :class="{active: onglet==='plan'}" @click="onglet='plan'">Plan élève/classe</a></li>
    </ul>

    <!-- Onglet Classes -->
    <div v-if="onglet==='classes'" class="mt-3">
      <h4>Gestion des classes</h4>
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

    <!-- Onglet Élèves -->
    <div v-if="onglet==='eleves'" class="mt-3">
      <h4>Gestion des élèves</h4>
      <input v-model="eleveNom" class="form-control mb-2" placeholder="Nom">
      <input v-model="elevePrenom" class="form-control mb-2" placeholder="Prénom">
      <select v-model="eleveClasse" class="form-control mb-2">
        <option disabled value="">Classe</option>
        <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.nom }}</option>
      </select>
      <input v-model="eleveDateNaissance" type="date" class="form-control mb-2" placeholder="Date de naissance">
      <input v-model="eleveAge" type="number" class="form-control mb-2" placeholder="Âge">
      <input v-model="eleveAdresse" class="form-control mb-2" placeholder="Adresse postale">
      <input v-model="eleveTelephone" class="form-control mb-2" placeholder="Téléphone">
      <input v-model="eleveUrgenceNom" class="form-control mb-2" placeholder="Nom contact urgence">
      <input v-model="eleveUrgenceTel" class="form-control mb-2" placeholder="Téléphone urgence">
      <input v-model="eleveEmail" type="email" class="form-control mb-2" placeholder="Adresse mail">
      <button class="btn btn-success mb-2" @click="createEleve">Ajouter</button>

      <ul class="list-group">
        <li v-for="e in eleves" :key="e.id" class="list-group-item">
          <strong>{{ e.nom }} {{ e.prenom }}</strong> — Classe: {{ getClasseNom(e.classe_id) }}
          <div class="small text-muted">
            📅 {{ e.date_naissance }} | 🎂 {{ e.age }} ans | 📍 {{ e.adresse }} | 📞 {{ e.telephone }} | 🆘 {{ e.urgence_nom }} ({{ e.urgence_tel }}) | ✉️ {{ e.email }}
          </div>
          <div class="d-flex justify-content-end mt-2">
            <button class="btn btn-sm btn-primary me-1" @click="updateEleve(e)">Save</button>
            <button class="btn btn-sm btn-danger" @click="deleteEleve(e.id)">X</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Onglet Cours -->
    <div v-if="onglet==='cours'" class="mt-3">
      <h4>Gestion des cours</h4>
      <input v-model="coursNom" class="form-control mb-2" placeholder="Nom du cours">
      <button class="btn btn-success mb-2" @click="createCours">Ajouter</button>
      <ul class="list-group">
        <li v-for="c in cours" :key="c.id" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ c.nom }}</span>
          <div>
            <button class="btn btn-sm btn-primary me-1" @click="updateCours(c)">Save</button>
            <button class="btn btn-sm btn-danger" @click="deleteCours(c.id)">X</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Onglet Plan élève/classe -->
    <div v-if="onglet==='plan'" class="mt-3">
      <h4>Plan élève/classe</h4>
      <div v-for="c in classes" :key="c.id" class="card p-3 mb-3">
        <h5>{{ c.nom }}</h5>
        <ul class="list-group">
          <li v-for="e in eleves.filter(el => el.classe_id === c.id)" :key="e.id" class="list-group-item">
            {{ e.nom }} {{ e.prenom }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      onglet: 'classes',
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
      coursNom: ''
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      this.classes = (await axios.get('/api/classes')).data;
      this.eleves = (await axios.get('/api/eleves')).data;
      this.cours = (await axios.get('/api/cours')).data;
    },
    getClasseNom(id) {
      const cl = this.classes.find(c => c.id === id);
      return cl ? cl.nom : 'Non attribué';
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
      this.eleveNom = this.elevePrenom = this.eleveClasse = '';
      this.eleveDateNaissance = this.eleveAge = this.eleveAdresse = '';
      this.eleveTelephone = this.eleveUrgenceNom = this.eleveUrgenceTel = this.eleveEmail = '';
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
      if (!this.coursNom) return;
      await axios.post('/api/cours', { nom: this.coursNom });
      this.coursNom = '';
      await this.loadData();
    },

    async updateCours(c) {
      await axios.put(`/api/cours/${c.id}`, { nom: c.nom });
      await this.loadData();
    },

    async deleteCours(id) {
      await axios.delete(`/api/cours/${id}`);
      await this.loadData();
    }
  }
};
</script>

