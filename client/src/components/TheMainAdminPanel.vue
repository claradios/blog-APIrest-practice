<template>
  <main class="main-settings">
    <h2>This list of words are not allowed</h2>
    <ul>
      <li v-for="badWord in offensiveWords" :key="badWord._id">
        <div v-if="!isEditing">
          <p>{{badWord.word}}</p>
          <span>
            <strong>{{badWord.level}}</strong>
          </span>
        </div>
        <div v-if="isEditing">
          <input type ="text" v-model="badWord.word"/>
          <input type="text" v-model="badWord.level"/>
          <button @click="handleSendEditedWord">update</button>
        </div>
        <div>
          <button @click="handleEditThisWord">
            <i class="fas fa-edit"></i>
          </button>
          <button @click="handleDeleteThisWord">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: 'theMainAdminPanel',
  data () {
    return {
      isEditing: false,
      badWord: {}
    //   editedWord: {
    //     word: this.badWord.word,
    //     level: this.badWord.level
    //   }
    }
  },
  props: {
    offensiveWords: Array
  },
  methods: {
    handleDeleteThisWord (ev) {
      this.$emit('delete-this-word', this.word._id)
    },
    handleEditThisWord () {
      this.isEditing = !this.isEditing
    },
    handleSendEditedWord (ev) {
      this.$emit('send-edited-word', ev, this.editedWord)
      this.isEditing = false
    }
  }
}
</script>

<style lang="scss">
.main-settings {
    margin-top: 50px;
}
ul {
    padding: 0;
}
</style>
