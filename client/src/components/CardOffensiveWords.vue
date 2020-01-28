<template>
  <div>
    <div v-if="!isEditing">
      <p>{{badWord.word}}</p>
      <span>
        <strong>{{badWord.level}}</strong>
      </span>
    </div>

    <div v-if="isEditing">
      <input type="text" v-model="badWord.word" />
      <input type="text" v-model="badWord.level" />
      <button @click="handleEditThisWord">update</button>
    </div>
    <div>
      <button @click="handleEditBox">
        <i class="fas fa-edit"></i>
      </button>
      <button @click="handleDeleteThisWord">
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
      this.$emit('send-edited-word', ev, this.editedWord)
      this.isEditing = false
    }
  }
}
</script>

          @delete-this-word="handleDeleteThisWord"
          @edit-this-word="handleEditThisWord"
          @add-this-word="handleAddThisWord"
