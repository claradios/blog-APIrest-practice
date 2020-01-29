<template>
  <div class="card-offensive">
    <div v-if="!isEditing" class="word-container">
      <p>{{badWord.word}}</p>
      <span>
        level:
        <strong>{{badWord.level}}</strong>
      </span>
    </div>

    <div v-if="isEditing">
      <div class="field-box">
        <input type="text" v-model="editedWord.word" />
      </div>
      <div class="field-box">
        <input type="text" v-model="editedWord.level" />
      </div>
      <button @click="handleEditThisWord" class="btn">update</button>
    </div>
    <div>
      <button @click="handleEditBox" class="tools">
        <i class="fas fa-edit"></i>
      </button>
      <button @click="handleDeleteThisWord" class="tools">
        <i class="fa fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardOffensiveWords',
  data () {
    return {
      isEditing: false,
      editedWord: {
        word: this.badWord.word,
        level: this.badWord.level,
        _id: this.badWord._id
      }
    }
  },
  props: {
    badWord: Object
  },
  methods: {
    handleDeleteThisWord (ev) {
      console.log(this.badWord._id)
      this.$emit('delete-this-word', ev, this.badWord._id)
    },
    handleEditBox () {
      this.isEditing = !this.isEditing
    },
    handleEditThisWord (ev) {
      console.log('hola', this.editedWord)
      this.$emit('edit-this-word', ev, this.editedWord)
      this.isEditing = false
    }
  }
}
</script>

<style lang="scss">
.card-offensive {
  background-color: rgb(235, 223, 223);
  padding: 8px;
  margin: 15px 0;
}
.word-container {
  border-radius: 1px solid black;
}
</style>
