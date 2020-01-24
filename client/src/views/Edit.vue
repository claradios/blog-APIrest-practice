<template>
  <div>
    <the-header />
    <!-- <the-container :posts="posts" /> -->
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

// @ is an alias to /src

export default {
  name: 'edit',

  components: {
    TheHeader,
    TheFooter
  }
}
</script>
