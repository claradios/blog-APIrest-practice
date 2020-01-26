<template>
  <main>
    <div v-if="errorMsg.length > 0" class="error-box">
      <p>{{errorMsg}}</p>
    </div>
    <article v-else class="card-singlepost">
      <div class="header level">
        <div class="level-left">
          <figure class="image is-32x32">
            <img :src="singlepost.userImage" :alt="singlepost.author" />
          </figure>
          <span class="author">{{singlepost.author}}</span>
        </div>
      </div>
      <div
        class="image-container"
        :class="singlepost.filter"
        :style="{ backgroundImage: 'url(' + singlepost.urlToImage + ')' }"
        @dblclick="like"
      >
        <h2 class="title">{{singlepost.title}}</h2>
      </div>
      <div class="content">
        <h4>by {{this.singlepost.author}}</h4>
        <div class="heart">
          <button @click="like" aria-label="You like">
            <i class="far fa-heart fa-lg" :class="{'fas': this.singlepost.hasBeenLiked}"></i>
          </button>
        </div>
        <span class="likes">{{singlepost.likes}} likes</span>
      </div>
      <section class="text">{{singlepost.content}}</section>

      <section class="comments">
        <div v-if="roltype==='admin' || roltype==='publisher'">
          <button @click="openBoxComment()" class="btn">
            add comment
            <i class="far fa-comment"></i>
          </button>
          <div :class="{'hidden-box':closedBox}">
            <div class="comment-box">
            <textarea
              placeholder="Write your comment..."
              type="text"
              v-model="commentData.text"
              :disabled="success"
            ></textarea>
          </div>
          <button @click="sendComment()" :disabled="success" class="btn">Publish </button>
            <p v-if="success" class="success">Tu comentario ha sido añadido!</p>
            <div class="info" v-else-if="badWords.length !== 0">
              <p>Tu comentario es ofensivo, revisa estas palabras:</p>
              <ul>
                <li v-for="badWord in badWords" :key="badWord._id">{{badWord.word}}</li>
              </ul>
            </div>
            <!-- <div v-else-if="errorHandleMsg"> errorHandleMsg</div> -->

          </div>
        </div>
        <p v-else class="info">
          You must be
          <router-link :to="'/login'">logged in</router-link>
          to post a comment
        </p>

        <div v-if="organizedComments">
          <ul class="comments-list">
            <li v-for="comment in organizedComments" :key="comment._id">
              <card-comment :comment="comment" :motherId="singlepost._id"></card-comment>
            </li>
          </ul>
        </div>
      </section>
    </article>
  </main>
</template>

<script>
import userInfo from '@/store/'
import CardComment from './CardComment'
import addComment from '@/service/addComment.js'

export default {
  name: 'TheMainRead',
  data () {
    return {
      badWords: [],
      // errorHandleMsg: '',
      closedBox: true,
      success: false,
      commentData: {
        text: ''
      }
    }
  },
  props: {
    singlepost: Object,
    errorMsg: String
  },
  components: {
    CardComment
  },
  computed: {
    organizedComments () {
      const coms = this.singlepost.comments
      if (coms) {
        return coms.reverse()
      } else {
        return false
      }
    },
    roltype () {
      return userInfo.state.userData.rol
    },
    name () {
      return userInfo.state.userData.username
    }
  },
  methods: {
    like () {
      this.singlepost.hasBeenLiked
        ? this.singlepost.likes--
        : this.singlepost.likes++
      this.singlepost.hasBeenLiked = !this.singlepost.hasBeenLiked
    },
    openBoxComment () {
      this.closedBox = !this.closedBox
      // this.success = false
    },
    async sendComment () {
      try {
        const { token } = userInfo.state
        const { _id } = this.singlepost
        const { text } = this.commentData
        await addComment(token, _id, text)
        this.success = true
        this.closedBox = true
        this.commentData.text = ''

        // cambiar de color el botón al deshabilitarlo
      } catch (error) {
        if (error.response) {
          console.log(error.response.data)
          this.badWords = error.response.data
        }
      }
      // this.$router.go()
    }
  }
}
</script>

<style lang="scss">

.card-singlepost {
  padding-top: 50px;
}

.card-singlepost ~ .card-singlepost {
  padding-top: 0;
}

.card-singlepost {
  padding: 5px 0;

  .header {
    height: 30px;
    border-bottom: 1px solid #fff;
    margin: 7.5px 10px;

    .level-left {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .image {
      display: inline-block;
      margin: 0;
    }

    figure,
    img {
      border-radius: 100%;
      height: 32px;
      width: 32px;
    }

    .author {
      position: relative;
      padding-left: 5px;
      font-size: 0.9rem;
      font-weight: bold;
    }
  }

  .level {
    margin-bottom: 0.5rem !important;
  }

  .image-container {
    height: 330px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-size: 45px;
    color: white;
  }

  .content {
    margin: 7.5px 10px;
  }

  .heart button {
    border: 0 solid;
    padding: 0;
  }

  .far.fa-heart,
  .fas.fa-heart {
    cursor: pointer;
  }

  .fas.fa-heart {
    color: #f06595;
  }

  .likes {
    margin: 5px 0;
    margin-bottom: 5px !important;
    font-size: 0.85rem;
    font-weight: bold;
  }

  .comments-list {
    list-style: none;
    padding: 40px 30px;
    margin: 20px, 0;
  }

  .text {
    text-align: left;
    padding: 20px;
  }
}

.card-singlepost:last-child {
  margin-bottom: 50px;
}
.info {
  background-color: lightpink;
  color: #f06595;
  font-weight: 700;
  padding:7px;
}
.hidden-box {
  display: none;
}
.success {
    background-color: rgb(93, 226, 153);
  color: #041e30;
  font-weight: 700;
  padding:7px;
}
.error-box {
  height: 100vh;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
}
.comment-box {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  textarea {
    background-color: rgb(230, 230, 230);
    padding: 10px;
    margin: 20px 0;
    border-radius: 8px;
    font-family: inherit;
    color: inherit;
  }
}
.btn {
    color: #ffffff;
    background-color: lightsalmon;
    border: 0px solid;
    border-radius: 5px;
    padding: 5px;
    font-size: 14px;
    -webkit-appearance: none;
    &:hover {
      background-color:#041e30;
    }
  }
.btn-icon {
    color:lightsalmon;
    background-color: transparent;
    border: 0px solid;
    border-radius: 5px;
    padding: 5px;
    font-size: 14px;
    -webkit-appearance: none;
    &:hover {
      background-color:#041e30;
    }
  }

</style>
