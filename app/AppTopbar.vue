<template>
  <div class="layout-topbar">
    <NuxtLink to="/home" class="layout-topbar-logo">
      <img src="/title.png" alt="IN4CEPTOR" class="logo-image">
    </NuxtLink>
    <div class="layout-topbar-user">
      <img 
        src="/user.png" 
        alt="User Image"
        class="user-image" 
        @click="toggleMenu"
      />
      
      <div v-if="showMenu" class="user-menu">
        <button v-if="!user" disabled>Not Logged In</button>
        <button v-else @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();
const user = ref(auth.currentUser);
const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    user.value = null;
    window.location.href = '/in4ceptor'; // Redirect to the login page
  } catch (error) {
    console.error('Logout failed', error);
  }
};

auth.onAuthStateChanged((currentUser) => {
  user.value = currentUser;
});
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
  width: 500px;
  height: auto;
}

.layout-topbar-user {
  display: flex;
  align-items: center;
  position: relative;
  justify-content: flex-end;
}

.user-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 35px;
}

.user-menu {
  position: absolute;
  right: 130px;
  top: 20;
  box-shadow: 0 0 10px #b707bd;
  border: 2px solid #b707bd;
  border-radius: 15px;
  padding: 10px;
  min-width: 150px;
  max-height: 120px;
}

.user-menu button {
  background-color: #b707bd;
  color: #fff;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border-color: #b707bd;
  cursor: pointer;
  width: 100%;
}
</style>
