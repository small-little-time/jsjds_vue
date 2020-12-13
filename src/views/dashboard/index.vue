<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './firstguide'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard',
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods:{
    guide() { 
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  },
  mounted() {
    if(localStorage.getItem("hasGuided")==null){
      this.driver = new Driver();
      this.guide();
      localStorage.setItem("hasGuided",true);
    }
  },
  created() {
    
  }
}
</script>
