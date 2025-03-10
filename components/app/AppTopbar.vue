<template>
  <div class="layout-topbar flex-wrap flex layout-topbar-logo">
    <img src="/title.png" alt="Testbench Generator" class="logo-image">
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.layout-topbar {
  display: flex;
  height: 100px;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
}

.layout-topbar-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-image {
  width: 100%;
  max-width: 900px;
  height: auto;
}

</style>
