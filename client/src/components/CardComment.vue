<template>
  <div :key=comment._id class="comment">
    <div class="comment-head">
    <h4>{{comment.nickname}}</h4>
    <small>On {{prettyDate(comment.date)}}</small>
    <span class="heart">
      <button @click="like" aria-label="You like">
        <i class="far fa-heart fa-lg" :class="{'fas': this.comment.hasBeenLiked}"></i>
      </button>
    </span>
    </div>
    <p class="comment-text">{{comment.text}}</p>
  </div>
</template>

<script>
import { prettyDate } from '../helpers'
export default {
  name: 'cardComment',
  props: {
    comment: Object
  },
  methods: {
    prettyDate,
    like () {
      this.comment.hasBeenLiked ? this.comment.likes-- : this.comment.likes++
      this.comment.hasBeenLiked = !this.comment.hasBeenLiked
    }
  }
}
</script>

<style lang="scss">

 .heart button {
    border: 0 solid;
    padding: 0;
    margin-left: 10px;
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

  h4 {
    display: inline;
    margin-right: 10px;
  }

  .comment-text {
    background-color:lightgrey;
    border-radius: 8px;
    padding:15px;
    margin:10px;
  }

</style>
