//Aquest vue component s'encarrega de fer una crida GET a la api segons un string que introdueix l'usuari i retorna una llista d'herois al pare.
Vue.component('app-search', {
  template: `
  <div>
    <form v-on:submit.prevent="submitForm">
      <button id="search">SEARCH</button>
      <input type="input" v-model="textToSearch" id="textToSearch" placeholder="Insert key, name, role or message">  
    </form>
    <p id="errorMessage">{{ errorMessage }}</p>
  </div>
  `,
  data() {
    return {
      textToSearch: "",
      errorMessage: ""
    }
  },
  methods: {
    // Aquest metode submitForm() s'activa al apretar el botó search i fa la crida GET a la api.
    async submitForm() {
      try {
        const response = await fetch(`http://localhost:3000/api/list?search=${textToSearch.value}`)
        .then((response) => {
          if (response.status != 200) {
            this.errorMessage = `Error ${response.status}: Bad parameters`;
            throw new Error("Bad parameters");
          }
          return response;
        })
        this.data = await response.json()
        .then((data) => {
          console.log(`Buscant herois amb el terme: ${textToSearch.value}`);
          console.log("Llista d'herois obtinguts:");
          console.log(data);
          this.$root.refresh = true;
          this.$root.$emit('refresh');
          this.$root.refresh = false;
          this.$root.heroes = data;
          this.errorMessage = "";
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
});
