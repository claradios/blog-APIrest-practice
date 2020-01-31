<template>
  <main class="newpost">
    <div>
      <div
        class="selected-image"
        :class="postData.selectedFilter"
        :style="{ backgroundImage: 'url(' + postData.urlToImage + ')' }"
      >
        <div class="upload">
          <input type="file" name="file" id="file" class="inputfile" @change="handleUploadImage" />
          <label for="file">
            upload your cover!
            <i class="fas fa-camera-retro links"></i>
          </label>
        </div>
      </div>
      <div class="filter-container">
        <card-filter
          v-for="filter in filters"
          :filter="filter"
          :image="postData.urlToImage"
          :key="filters.indexOf(filter)"
          @filter-selected="handleFilterSelected"
        ></card-filter>
      </div>
    </div>
    <v-container fluid grid-list-md>
      <div class="text-center">
        <v-btn v-if="!isEditing" @click="sendPost()" >POST!</v-btn>
        <v-btn v-if="isEditing" @click="updatePost()">Update!</v-btn>
        <p v-if="errorMsg.length > 0" class="info-message">{{errorMsg}}</p>
      </div>
      <v-spacer></v-spacer>
      <v-card class="pl-6 pr-6 ma-7">
      <v-text-field
        v-model="postData.title"
        placeholder="Title"
        style="min-height: 96px"
        type="text"
        name="input-title"
      ></v-text-field>
      <v-textarea name="input-7-1" placeholder="Content" auto-grow v-model="postData.content"></v-textarea>
      </v-card>
    </v-container>
  </main>
</template>

<script>
import CardFilter from './CardFilter'
import addPost from '@/service/addPost'
import readPostById from '@/service/readPostById'
import editPostById from '@/service/editPostById'
import userInfo from '@/store/'

export default {
  name: 'TheContainerCreate',
  data () {
    return {
      errorMsg: '',
      isEditing: false,
      postData: {
        selectedFilter: '',
        urlToImage:
          'https://www.consalud.es/uploads/s1/10/30/54/9/playa-libre-sin-humos-foto-freepik.jpeg',
        title: '',
        content: ''
      }
    }
  },
  props: {
    filters: Array
  },
  components: {
    CardFilter
  },
  async mounted () {
    const id = this.$route.params.id
    if (id) {
      this.isEditing = true
      try {
        const result = await readPostById(id)
        this.postData = result
      } catch (error) {
        console.log(error)
      }
    }
  },
  methods: {
    async sendPost () {
      try {
        const { token } = userInfo.state
        if (token) {
          if (this.postData.title === '' || this.postData.content === '') {
            this.errorMsg = 'Please complete Text and Content before sending'
          } else {
            await addPost(token, this.postData)
            this.$router.push('/')
            this.errorMsg = ''
          }
        }
      } catch (error) {
        console.log(error.message)
        this.errorMsg = error.message
      }
    },

    async updatePost () {
      try {
        const { token } = userInfo.state
        const id = this.$route.params.id
        const body = this.postData
        await editPostById(token, id, body)
        this.$router.push(`/read/${id}`)
        this.errorMsg = ''
      } catch (error) {
        console.log(error.message)
        this.errorMsg = error.message
      }
    },
    handleFilterSelected (ev) {
      this.postData.selectedFilter = ev.filter
      this.$emit('filter-selected', { filter: ev.filter })
    },
    handleUploadImage (ev) {
      const files = ev.target.files
      if (!files.length) return

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = ev => {
        this.postData.urlToImage = ev.target.result
      }
      document.querySelector('#file').value = ''
    }
  }
}
</script>

<style lang="scss">

main::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}

.upload {
  input {
    width: 0px;
  }
  font-size: 20px;
}

input[name="file"] {
  visibility: hidden;
}

label {
  cursor: pointer;
  z-index: 99;
}

button {
  color: #ffffff;
}

.selected-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 200px;
  background-color: lightpink;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 15px 10px;
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>
