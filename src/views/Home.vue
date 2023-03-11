<template>
  <div>
    <NavbarVue />
    <div class="image-container">
      <img src="../assets/home.png" alt="home">
    </div>
  </div>
</template>

<script>
import NavbarVue from '@/components/Navbar.vue';

export default {
  components: {
    NavbarVue
  },
}
</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.image-container img {
  max-width: 100%;
  display: block;
  margin: 40px;
}
</style>
