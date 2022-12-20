import {} from '../components/info.js'
import {} from '../components/list.js'
import {} from '../components/search.js'

// Creem una instancia vue per utilitzarlo com a Singleton. En aquest cas la variable global que utilitzem és un array de heroes.
var app = new Vue({
    el: '#app',
    data() {
        return {
            heroes: {},
            refresh: false
        }        
    },
    template:`
    <div>
        <app-search></app-search>

        <div class="hero-list" v-for="hero in heroes">
            <app-list :hero="hero"></app-list>
        </div>

    </div>      
    `
    
})   
