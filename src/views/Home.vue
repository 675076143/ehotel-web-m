<template>
  <div class="home">
      <search-free-room></search-free-room>
  </div>
</template>

<script>
// @ is an alias to /src
import searchFreeRoom from "../components/searchFreeRoom";
export default {
  name: 'home',
  components: {
      searchFreeRoom
  }
}
</script>
<style>
.home{
    display: flex;
    justify-content: center;
}
</style>