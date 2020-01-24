<template>
  <article class="card-post">
    <div class="header level">
      <div class="level-left">
        <figure class="image is-32x32">
          <img :src="post.userImage" :alt="post.author" />
        </figure>
        <span class="author">{{post.author}}</span>
      </div>
    </div>
    <div
      class="image-container"
      :class="post.filter"
      :style="{ backgroundImage: 'url(' + post.urlToImage + ')' }"
      @dblclick="like"
    >
      <h2 class="title">{{post.title}}</h2>
    </div>
    <div class="content">
      <div class="heart">
        <button @click="like" aria-label="You like">
          <i class="far fa-heart fa-lg" :class="{'fas': this.post.hasBeenLiked}"></i>
        </button>
      </div>
      <p class="likes">{{post.likes}} likes</p>
    </div>
    <div v-if="roltype === 'admin' || name === post.author">
      <button @click="deleteThisPost()">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
      <div>
        <router-link :to="`/edit/${post._id}`">
          <i class="fas fa-edit"></i>
        </router-link>
      </div>
    </div>
    <router-link :to="`/read/${post._id}`">leer más ...</router-link>
  </article>
</template>

<script>
import userInfo from '@/store/'
import deletePostById from '@/service/deletePostById'
export default {
  name: 'cardPost',
  props: {
    post: Object
  },
  computed: {
    roltype () {
      return userInfo.state.userData.rol
    },
    name () {
      return userInfo.state.userData.username
    }
  },
  methods: {
    like () {
      this.post.hasBeenLiked ? this.post.likes-- : this.post.likes++
      this.post.hasBeenLiked = !this.post.hasBeenLiked
    },
    async deleteThisPost () {
      const { _id } = this.post
      const { token } = userInfo.state
      const deletion = await deletePostById(token, _id)
      if (deletion) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss">
.card-post {
  padding-top: 50px;
}

.card-post ~ .card-post {
  padding-top: 0;
}

.card-post {
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

  .caption {
    font-size: 0.85rem;

    span {
      font-weight: bold;
    }
  }
}

.card-post:last-child {
  margin-bottom: 50px;
}
</style>
