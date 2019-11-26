<template>
  <div class="home" >
      <search-free-room @freeRooms="getFreeRooms"></search-free-room>
      <free-rooms :freeRooms="freeRooms" :checkInDate="checkInDate" :checkOutDate="checkOutDate" :check-dates="checkDates"></free-rooms>
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
        freeRooms:[],
        checkInDate:"",
        checkOutDate: "",
        checkDates:1,
    }
  },
  components: {
      SearchFreeRoom,
      FreeRooms
  },
  methods:{
      getFreeRooms(data){
          this.freeRooms = data.freeRooms
          this.checkInDate = data.checkInDate
          this.checkOutDate = data.checkOutDate
          this.checkDates = data.checkDates
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