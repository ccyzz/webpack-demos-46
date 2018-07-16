import Vue from 'vue'
import App from './App'

new Vue({
  render: c => c(App),
  components: {
    App
  }
}).$mount('#app')
