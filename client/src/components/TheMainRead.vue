<template>
  <main>
    <div v-if="errorMsg.length > 0" class="error-box">
      <p>{{errorMsg}}</p>
    </div>
    <article v-else class="card-singlepost">
      <div
        class="image-container"
        :class="singlepost.filter"
        :style="{ backgroundImage: 'url(' + singlepost.urlToImage + ')' }"
        @dblclick="like"
      >
        <h2 class="title">{{singlepost.title}}</h2>
      </div>
      <div class="content">
        <v-toolbar>
          <div class="header level">
            <div class="level-left">
              <figure class="image is-32x32">
                <img :src="singlepost.userImage" :alt="singlepost.author" />
              </figure>
              <span class="author">By {{singlepost.author}}</span>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            icon
            v-if="roltype === 'admin' || name === singlepost.author"
            class="tools"
            @click="deletePost"
            :id="singlepost._id"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>

          <v-btn icon @click="like" class="heart">
            <i class="far fa-heart fa-lg" :class="{'fas': this.singlepost.hasBeenLiked}"></i>
            <span class="likes">{{singlepost.likes}}</span>
          </v-btn>

          <v-btn
            v-if="roltype === 'admin' || name === singlepost.author"
            icon
            :to="`/edit/${singlepost._id}`"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-toolbar>
      </div>

      <article class="text">{{singlepost.content}}</article>
      <section class="comments">
        <div v-if="roltype==='admin' || roltype==='publisher'" class="text-center">
          <v-btn v-if="closedBox" @click="openBoxComment()">
            add comment
            <i class="far fa-comment"></i>
          </v-btn>
          <v-btn v-if="!closedBox" @click="sendComment()" class="btn">Publish</v-btn>
          <div :class="{'hidden-box':closedBox}">
            <div class="comment-box">
              <textarea
                placeholder="Write your comment..."
                type="text"
                v-model="commentData.text"
                class="comment-area"
              ></textarea>
            </div>
          </div>
          <v-spacer></v-spacer>
          <p v-if="successMsg" class="success">Tu comentario ha sido añadido!</p>
          <div class="info-message" v-if="badWords.length !== 0">
            <p>Tu comentario es ofensivo, revisa estas palabras:</p>
            <ul>
              <li v-for="badWord in badWords" :key="badWord._id">{{badWord.word}}</li>
            </ul>
          </div>
        </div>
        <p v-else class="info-message">
          You must be
          <router-link :to="'/login'">logged in</router-link>to post a comment
        </p>

        <div v-if="organizedComments">
          <ul class="comments-list">
            <li v-for="comment in organizedComments" :key="comment._id">
              <card-comment
                :comment="comment"
                :motherId="singlepost._id"
                @delete-this-comment="handleDeleteThisComment"
                @send-edited-comment="handleSendEditedComment"
              ></card-comment>
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
import deletePostById from '@/service/deletePostById'
import addComment from '@/service/addComment.js'
import deleteComment from '@/service/deleteComment.js'
import editComment from '@/service/editComment.js'
export default {
  name: 'TheMainRead',
  data () {
    return {
      userInfo,
      badWords: [],
      closedBox: true,
      successMsg: false,
      commentData: {
        text: ''
      }
    }
  },
  props: {
    singlepost: Object,
    errorMsg: String,
    filters: Array
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
        return []
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
    async deletePost () {
      try {
        const { _id } = this.singlepost
        const { token } = userInfo.state
        await deletePostById(token, _id)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    openBoxComment () {
      this.closedBox = !this.closedBox
      this.successMsg = false
      this.badWords = []
    },
    async sendComment () {
      try {
        const { token } = userInfo.state
        const { _id } = this.singlepost
        const { text } = this.commentData
        const result = await addComment(token, _id, text)

        this.closedBox = true
        this.commentData.text = ''
        this.successMsg = true
        this.badWords = []
        if (!this.singlepost.comments) {
          console.log('no existe la propiedad comments')
          this.organizedComments = []
          this.organizedComments.push(result)
        } else {
          this.singlepost.comments.push(result)
        }
      } catch (error) {
        if (error.response) {
          this.badWords = error.response.data
        }
      }
    },
    async handleDeleteThisComment (ev) {
      try {
        const { token } = userInfo.state
        const _id = ev.currentTarget.id
        const postId = this.singlepost._id
        await deleteComment(token, postId, _id)
        const hasThisId = element => element._id === _id
        const index = this.singlepost.comments.findIndex(hasThisId)
        this.singlepost.comments.splice(index, 1)
      } catch (error) {
        console.log('halgo falló', error)
      }
    },

    async handleSendEditedComment (ev, body) {
      try {
        const _id = ev.currentTarget.id
        const postId = this.singlepost._id
        const { token } = userInfo.state
        await editComment(token, postId, _id, body)

        const hasThisId = element => element._id === _id
        const newArray = this.organizedComments.reverse()
        const index = newArray.findIndex(hasThisId)
        this.singlepost.comments.splice(index, 1, body)
      } catch (error) {
        console.log(error)
      }
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
  padding: 0;

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
    font-size: 50px;
    color:#041e30
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
.info-message {
  background-color: lightpink;
  color: #f06595;
  font-weight: 700;
  padding: 7px;
  margin-top: 15px;
}
.hidden-box {
  display: none;
}
.success {
  margin-top: 15px;
  background-color: rgb(93, 226, 153);
  color: #041e30;
  font-weight: 700;
  padding: 7px;
}
.error-box {
  margin-top: 15px;
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
    background-color: #041e30;
  }
}
.btn-icon {
  color: lightsalmon;
  background-color: transparent;
  border: 0px solid;
  border-radius: 5px;
  padding: 5px;
  font-size: 14px;
  -webkit-appearance: none;
  &:hover {
    background-color: #041e30;
  }
}
</style>
