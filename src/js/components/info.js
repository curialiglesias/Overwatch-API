// Aquest vue component s'encarrega de mostrar l'informació extra de cada heroi sempre que es demani.
Vue.component('app-info', {
  props: {
    lore: "",
    message: ""
  },
  template: `
  <div>
    <h3>{{ lore }}</h3>
    <p>{{ message }}</p>
  </div>
  `
})
