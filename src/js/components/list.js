// Aquest vue component s'encarrega de mostrar la llista d'herois i fa la crida POST sempre que es demani.
Vue.component('app-list', {
  data() {
    return {
      symbol: "+",
      lore: "",
      message: "",
      expanded: false,
      loaded: false
    }
  },
  props: {
    hero: {}
  },
  template: `
  <div class="hero" v-bind:class="{ 'heroExpand': expanded }">
    <img :src="this.hero.portrait" alt="hero image">
    <div>
      <h2 class="name"> {{ this.hero.name }} </h2>
      <p class="role"> Role: {{ this.hero.role }} </p>
      <app-info :message="message" :lore="lore" class="message"></app-info>  
    </div>
    <button class="btn-more" v-bind:class="{ 'anim': loaded }" v-on:click.prevent="infoButton">{{ symbol }}</button>
  </div>
  `,
  methods: {
    // Aquest 3 metodes loading(), showMessage() i hideMessage() alteren l'estat del botó +/- i es criden durant el seguent metode infoButton()
    loading() {
      this.symbol = "~";
      this.loaded = true;
    },

    showMessage() {
      this.loaded = false;
      this.symbol = "-";
      this.lore = "Lore";
      this.message = this.hero.message;
      this.expanded = true;
    },

    hideMessage() {
      this.symbol = "+";
      this.lore = "";
      this.message = "";
    },

    // Aquest metode infoButton s'activa al apretar el botó +/- i fa la crida POST a la api.
    async infoButton() {
      if (this.symbol == "-" || this.$root.refresh == true) {
        this.expanded = false;
        this.hideMessage();
      } else {
        try {
          this.loading();
          const parameters = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({key: this.hero.key})
          };
          const response = await fetch(`http://localhost:3000/api/detail`, parameters)
          .then((response) => {
            if (response.status != 200) {
              this.errorDetect = true;
              throw new Error("Bad parameters");
            }
            return response;
          })
          this.data = await response.json()
          .then((data) => {
            this.hero.message = data[0].message;
            console.log(`Carregant informació extra de ${this.hero.name}:`);
            console.log(this.hero.message);
            setTimeout(() => {this.showMessage()}, 1200);
            this.$root.refresh = false;
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  },

  // Activa el metode infoButton() sempre que rebi un avis del component search de que ha de refrescar.
  mounted(){
    const thisInstance = this
    this.$root.$on('refresh', function(){
      thisInstance.infoButton();
    })
  }
})
