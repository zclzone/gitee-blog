<template>
  <main class="main-container">
    <transition name="slide-fade" mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </main>
</template>

<style lang="scss">
.main-container {
  height: 100%;
}
</style>