<template>
            <v-card class="px-0">
              <v-img
                v-if="!isEditing"
                class="blue--text align-end px-0"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="100px"
                width="150px"
              >
                <p class="text-center">{{badWord.word}}</p>
                <p class="text-center"><strong>{{badWord.level}}</strong></p>
              </v-img>
                <v-card class="text-center">
              <v-form v-if="isEditing" class="px-12 text-center">
                <v-text-field
                  label="Word"
                  name="word"
                  v-model="editedWord.word"
                  type="text"
                ></v-text-field>
                <v-text-field
                  label="Level"
                  name="level"
                  type="text"
                  v-model="editedWord.level"
                ></v-text-field>
              </v-form>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon @click="handleDeleteThisWord" class="text-center">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>

                <v-btn icon @click="handleEditBox">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn icon @click="handleEditThisWord">
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
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
      this.$emit('delete-this-word', ev, this.badWord._id)
    },
    handleEditBox () {
      this.isEditing = !this.isEditing
    },
    handleEditThisWord (ev) {
      this.$emit('edit-this-word', ev, this.editedWord)
      this.isEditing = false
    }
  }
}
</script>

<style lang="scss">

</style>
