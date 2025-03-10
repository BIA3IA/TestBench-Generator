
<template>
  <div class="text-center p-4">
      <img class="cat-image" src="/cat.gif" alt="Hi Cat">
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Reindirizza qualsiasi percorso errato alla home
const router = useRouter();
router.replace('/');
</script>

<style scoped>

.cat-image {
  width: 100%;
  max-width: 500px;
  height: auto;
}

</style>
