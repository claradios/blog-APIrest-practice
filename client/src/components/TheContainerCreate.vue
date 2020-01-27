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
    <div>
      <div class="title-container">
        <label for="input-title"></label>
        <input
          type="text"
          v-model="postData.title"
          name="input-title"
          placeholder="My Article's Title"
        />
      </div>
      <div class="content-container">
        <textarea
          class="caption-input"
          placeholder="Write your article..."
          type="text"
          v-model="postData.content"
        ></textarea>
      </div>
      <button @click="sendPost()">Post!</button>
    </div>
  </main>
</template>

<script>
import CardFilter from './CardFilter'
import addPost from '@/service/addPost'

export default {
  name: 'TheContainerCreate',
  data () {
    return {
      postData: {
        selectedFilter: '',
        urlToImage: 'https://www.consalud.es/uploads/s1/10/30/54/9/playa-libre-sin-humos-foto-freepik.jpeg',
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
  methods: {
    async sendPost () {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          await addPost(token, this.postData)
          this.$router.push('/')
        }
      } catch (error) {
        console.log(error)
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
.newpost {
  margin: 0;
  padding: 50px 0 90px 0;
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

main {
  overflow: auto;
  height: calc(100vh);
  width: 100vw;
}
.main::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}

.content-container {
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;

  textarea {
    font-family: inherit;
    color: inherit;
    width: 600px;
    height: 120px;
    border: 3px solid #cccccc;
    padding: 5px;
  }

  textarea:focus {
    outline: 0;
  }
}

.selected-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 330px;
  background-color: lightpink;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 15px 10px;
}

.feed {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 50px 0;
}

.feed::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}
</style>
