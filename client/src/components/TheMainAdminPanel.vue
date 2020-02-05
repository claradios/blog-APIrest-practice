<template>
  <section>
    <div v-if="rol!=='admin'" class="no-access-screen">
      <p>Access Denied</p>
    </div>
    <div v-if="rol==='admin'">
      <v-card class="mx-auto mt-8" max-width="900">
        <v-container fluid>
          <v-row dense>
            <v-col v-for="badWord in offensiveWords"  :key="badWord._id" cols="12" sm="3">
              <card-offensive-words
                :badWord="badWord"
                @delete-this-word="handleDeleteThisWord"
                @edit-this-word="handleEditThisWord"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-card class="mx-auto mt-8" max-width="900">
        <v-card-text>
          <v-form>
            <v-text-field
              label="Offensive word"
              placeholder="motherfucker"
              name="new-word"
              v-model="newOffensiveW.word"
              type="text"
            ></v-text-field>

            <v-text-field
              placeholder="3"
              label="Level"
              name="new-level"
              type="text"
              v-model="newOffensiveW.level"
            ></v-text-field>
          </v-form>
          <v-btn @click="addThisWord" class="text-center" color="blue">add +</v-btn>
          <p v-if="errorMsg.length > 0" class="info-message">{{errorMsg}}</p>
        </v-card-text>
      </v-card>
    </div>
  </section>
</template>

<script>
import addOffensiveWord from '@/service/addOffensiveWord.js'
import deleteOffensiveWord from '@/service/deleteOffensiveWord.js'
import editOffensiveWord from '@/service/editOffensiveWord.js'
import userInfo from '@/store/'
import CardOffensiveWords from '@/components/CardOffensiveWords.vue'
export default {
  name: 'theMainAdminPanel',
  data () {
    return {
      errorMsg: '',
      newOffensiveW: {}
    }
  },
  props: {
    offensiveWords: Array
  },
  computed: {
    rol () {
      return userInfo.state.userData.rol
    }
  },
  methods: {
    async handleDeleteThisWord (ev, id) {
      try {
        const { token } = userInfo.state
        await deleteOffensiveWord(token, id)
        const hasThisId = element => element._id === id
        const index = this.offensiveWords.findIndex(hasThisId)
        this.offensiveWords.splice(index, 1)
      } catch (error) {
        this.errorMsg = error.message
      }
    },
    async addThisWord () {
      try {
        const { token } = userInfo.state
        const result = await addOffensiveWord(token, this.newOffensiveW)
        this.offensiveWords.push(result)
        this.errorMsg = ''
      } catch (error) {
        this.errorMsg = error.message + '. Recuerda, level entre 1 y 5'
      }
    },
    async handleEditThisWord (ev, body) {
      try {
        const { _id } = body
        const { token } = userInfo.state
        console.log(token, _id, body)
        await editOffensiveWord(token, _id, body)

        const hasThisId = element => element._id === _id
        const index = this.offensiveWords.findIndex(hasThisId)
        this.offensiveWords.splice(index, 1, body)
      } catch (error) {
        this.errorMsg = error.message
      }
    }
  },

  components: {
    CardOffensiveWords
  }
}
</script>

<style lang="scss">
.no-access-screen {
  height: 100vh;
  width: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}
</style>
