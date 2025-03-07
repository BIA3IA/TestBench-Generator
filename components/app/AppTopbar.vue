<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo">
      <img src="/title.png" alt="Testbench Generator" class="logo-image">
  	</div>
  
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.layout-topbar {
  display: flex;
  height: 100px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
}

.layout-topbar-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-image {
  width: 900px;
  height: auto;
}

.layout-topbar-user {
  display: flex;
  align-items: center;
  position: relative;
  justify-content: flex-end;
}

</style>
