<template>
</template>

<script>
export default {
  beforeCreate() {
    const { query } = this.$route
    if (query.code) {
      this.$router.push({ path: query.from, query: { code: query.code } })
    } else {
      this.$router.push({ path: query.from })
    }
  }
}
</script>