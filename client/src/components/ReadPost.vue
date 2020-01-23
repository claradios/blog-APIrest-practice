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
      <div class="heart">
        <button @click="like" aria-label="You like">
          <i class="far fa-heart fa-lg" :class="{'fas': this.singlepost.hasBeenLiked}"></i>
        </button>
      </div>
      <p class="likes">{{singlepost.likes}} likes</p>
    </div>
    <section class="text">{{singlepost.content}}</section>
    <section class="comments">
      <ul>
        <li v-for="comment in singlepost.comments" :key="comment._id">
          <card-comment :comment="comment" ></card-comment>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
import CardComment from './CardComment'
export default {
  name: 'readsinglepost',
  props: {
    singlepost: Object
  },
  components: {
    CardComment
  },
  methods: {
    like () {
      this.singlepost.hasBeenLiked
        ? this.singlepost.likes--
        : this.singlepost.likes++
      this.singlepost.hasBeenLiked = !this.singlepost.hasBeenLiked
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

  .text {
    text-align:left;
    padding:20px;
  }
}

.card-singlepost:last-child {
  margin-bottom: 50px;
}
</style>
