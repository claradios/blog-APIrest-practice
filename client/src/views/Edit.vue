<template>
  <div>
    <the-header />
    <the-container-create
      :filters="filters"
    />
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheContainerCreate from '@/components/TheContainerCreate.vue'
import filters from '@/data/filters.js'
// le va a pasar una respuesta de axios con la info del post, para ponerla en los campos de value más lo editable
// le va a pasar una prop EDIT:true CREATE:false que hará aparecer un botón de ACTUALIZAR
export default {
  name: 'edit',
  data () {
    return {
      filters
    }
  },
  components: {
    TheContainerCreate,
    TheHeader,
    TheFooter
  }
}
</script>
