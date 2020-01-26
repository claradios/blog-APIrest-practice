<template>
  <main class="newpost">
    <div>
      <div
        class="selected-image"
        :class="postData.selectedFilter"
        :style="{ backgroundImage: 'url(' + postData.urlToImage + ')' }"
      >
        <p>Pick a cover image!</p>
        <span class="upload">
          <input type="file" name="file" id="file" class="inputfile" @change="handleUploadImage" />
          <label for="file">
            <i class="fas fa-camera-retro"></i>
          </label>
        </span>
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
        urlToImage: '',
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
    sendPost () {
      const token = localStorage.getItem('token')
      if (token) {
        const newPost = addPost(token, this.postData)
        if (newPost) {
          this.$router.push('/')
        }
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
  margin:0;
  padding: 50px 0 90px 0;
  color: black;
}
.upload {
  p {
    font-size: 0.63rem;
    position: absolute;
    left: -25px;
    top: 5px;
  }
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
}

.filter-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 30px 10px;
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
