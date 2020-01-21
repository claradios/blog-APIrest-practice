<template>
  <main>
    <div class="footer-upload">
      <input type="file" name="file" id="file" class="inputfile" @change="handleUploadImage" />
      <label for="file">
        <i class="fas fa-camera-retro"></i>
      </label>
    </div>
    <div>
      <div
        class="selected-image"
        :class="selectedFilter"
        :style="{ backgroundImage: 'url(' + image + ')' }"
      ></div>
      <div class="filter-container">
        <card-filter
          v-for="filter in filters"
          :filter="filter"
          :image="image"
          :key="filters.indexOf(filter)"
          @filter-selected="handleFilterSelected"
        ></card-filter>
      </div>
    </div>
    <div>
      <div class="caption-container">
        <textarea
          class="caption-input"
          placeholder="Write your article..."
          type="text"
          :value="value"
          @input="$emit('input', $event.target.value)"
        ></textarea>
      </div>
    </div>
  </main>
</template>

<script>
import CardFilter from './CardFilter'

export default {
  name: 'TheContainerCreate',
  data () {
    return {
      selectedFilter: '',
      image: ''
    }
  },
  props: {
    step: Number,
    filters: Array,
    // image: String,
    value: String
  },
  components: {
    CardFilter
  },
  methods: {
    handleFilterSelected (ev) {
      this.selectedFilter = ev.filter
      this.$emit('filter-selected', { filter: ev.filter })
    },
    handleUploadImage (ev) {
      const files = ev.target.files
      if (!files.length) return

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = ev => {
        this.image = ev.target.result
      }
      document.querySelector('#file').value = ''
    }
  }
}
</script>

<style lang="scss">
.footer-upload {
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

.caption-container {
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;

  textarea {
    border: 0;
    font-size: 1rem;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
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
