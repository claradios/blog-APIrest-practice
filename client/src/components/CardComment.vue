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
    <div class="comment-body">
      <p v-if="!isEditing" class="comment-text">{{comment.text}}</p>
      <div v-if="isEditing">
        <textarea class="edit-box" v-model="editedComment.text"></textarea>
        <button class="btn" :id="comment._id" @click="handleSendEditedComment">Update</button>
        </div>

      <div v-if="roltype === 'admin' || name === comment.nickname">
        <button :id="comment._id" class="tools" @click="handleDeleteThisComment">
          <span>
            <i class="fa fa-trash" aria-hidden="true"></i>
          </span>
        </button>
        <button :id="comment._id" class="tools" @click="handleEditThisComment">
          <span>
            <i class="fas fa-edit"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { prettyDate } from '../helpers'
import userInfo from '@/store/'

export default {
  name: 'cardComment',
  data () {
    return {
      isEditing: false,
      editedComment: {
        text: this.comment.text,
        date: this.comment.date,
        nickname: this.comment.nickname,
        _id: this.comment._id
      }
    }
  },
  props: {
    comment: Object
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
    handleDeleteThisComment (ev) {
      this.$emit('delete-this-comment', ev)
    },
    handleEditThisComment () {
      this.isEditing = !this.isEditing
    },
    handleSendEditedComment (ev) {
      this.$emit('send-edited-comment', ev, this.editedComment)
      this.isEditing = false
    }
  }
}
</script>

<style lang="scss">
.edit-box{
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
  color: darkcyan;
  border: 2px solid lightsalmon;
  width: 95%;
  padding:10px;
  margin: 10px 0;
  border-radius: 8px;
}
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

.comment-body {
  background-color: rgb(230, 230, 230);
  border-radius: 8px;
  padding: 5px;
  margin: 10px;
}

.tools {
  cursor: pointer;
  border: 0 solid;
  padding: 0;
  color: lightsalmon;
  background-color: transparent;
  border: 0px solid;
  border-radius: 5px;
  padding: 5px;
  font-size: 14px;
  -webkit-appearance: none;
  &:hover {
    color: #041e30;
  }
}
</style>
