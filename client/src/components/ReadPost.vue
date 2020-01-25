<template>
  <article class="card-singlepost">
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
        <button @click="openBoxComment()">
          add comment
          <i class="far fa-comment"></i>
        </button>
        <div :class="{'hidden-box':closedBox}">
          <textarea placeholder="Write your comment..." type="text" v-model="commentData.text"></textarea>
          <button @click="sendComment()">Publish</button>
        </div>
      </div>
      <div v-else >You must be <router-link :to="'/login'">logged in </router-link>to post a comment</div>

      <div v-if="organizedComments">
        <ul class="comments-list">
          <li v-for="comment in organizedComments" :key="comment._id">
            <card-comment :comment="comment"></card-comment>
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>

<script>
import userInfo from '@/store/'
import CardComment from './CardComment'
import addComment from '@/service/addComment.js'

export default {
  name: 'readsinglepost',
  data () {
    return {
      closedBox: true,
      commentData: {
        text: ''
      }
    }
  },
  props: {
    singlepost: Object
  },
  components: {
    CardComment
  },
  computed: {
    organizedComments () {
      const coms = this.singlepost.comments
      return coms.reverse()
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
    },
    sendComment () {
      const { token } = userInfo.state
      const { _id } = this.singlepost
      const { text } = this.commentData
      addComment(token, _id, text)
    }
  }
}
</script>

<style lang="scss">
.hidden-box {
  display: none;
}
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
  }

  .text {
    text-align: left;
    padding: 20px;
  }
}

.card-singlepost:last-child {
  margin-bottom: 50px;
}
</style>
