<template>
  <div>
    <the-header
      :step="step"
      @go-to-home="handleGoToHome"
      @next-step="step++"
      @share-post="handleSharePost"
    />
    <card-signup />
    <the-footer
      :step="step"
      @go-to-home="handleGoToHome"
      @upload-image="handleUploadImage"
      @go-to-newpost="handleGoToNewPost"
    />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import CardSignup from '@/components/CardSignup.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'signup',
  components: {
    TheHeader,
    CardSignup,
    TheFooter
  },
  methods: {
    handleGoToHome () {
      this.image = ''
      this.step = 1
    }
  }
}
</script>
