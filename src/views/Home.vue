<template>
  <div class="home" >
      <search-free-room @freeRooms="getFreeRooms"></search-free-room>
      <free-rooms :freeRooms="freeRooms"></free-rooms>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchFreeRoom from "../components/SearchFreeRoom"
import FreeRooms from "../components/FreeRooms";
export default {
  name: 'home',
  data(){
    return{
        freeRooms:[]
    }
  },
  components: {
      SearchFreeRoom,
      FreeRooms
  },
  methods:{
      getFreeRooms(freeRooms){
          this.freeRooms = freeRooms
      }
  }
}
</script>
<style>
.home{
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>