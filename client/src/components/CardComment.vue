<template>
  <div :key=comment._id>
    <span>{{comment.date}}</span>
    <p>{{comment.text}}</p>
    <div class="heart">
      <button @click="like" aria-label="You like">
        <i class="far fa-heart fa-lg" :class="{'fas': this.comment.hasBeenLiked}"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardComment',
  props: {
    comment: Object
  },
  methods: {
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
</style>
