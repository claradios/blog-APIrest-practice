<template>
  <div :key="comment._id" class="comment">
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
     <div v-if="roltype === 'admin' || name === comment.nickname">
    <button class="tools" @click="deleteThisComment()">
      <span>
        <i class="fa fa-trash" aria-hidden="true"></i>
      </span>
    </button>
    <button class="tools" @click="editThisComment()">
      <span>
        <i class="fas fa-edit"></i>
      </span>
    </button>
    </div>
  </div>
</template>

<script>
import { prettyDate } from '../helpers'
import userInfo from '@/store/'
import deleteComment from '@/service/deleteComment.js'
import editComment from '@/service/editComment.js'
export default {
  name: 'cardComment',
  props: {
    comment: Object,
    motherId: String
  },
  computed: {
    roltype () {
      return userInfo.state.userData.rol
    },
    name () {
      return userInfo.state.userData.nickname
    }
  },
  methods: {
    prettyDate,
    like () {
      this.comment.hasBeenLiked ? this.comment.likes-- : this.comment.likes++
      this.comment.hasBeenLiked = !this.comment.hasBeenLiked
    },
    async deleteThisComment () {
      const { token } = userInfo.state
      const { _id } = this.comment
      const postId = this.motherId

      await deleteComment(token, postId, _id)
 
    },
    async editThisComment () {
      console.log('edit')
      const { token } = userInfo.state
      await editComment(token)
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
  background-color: lightgrey;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
}

.tools button {
  border: 0 solid;
  padding: 0;
}
</style>
