<template>
  <article class="card-post">
    <div class="header level">
      <figure class="image is-32x32">
        <img src="www.placeholder32x32.com" alt="default picture" />
      </figure>
      <span class="author">juanita</span>
    </div>
    <input type="text" placeholder="My Article's Title" />
    <textarea name="textarea" rows="10" cols="50">Write your article here</textarea>
    <button>Post</button>
  </article>
</template>

<script>
export default {
  name: 'cardNewPost',
  props: {
    post: Object
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
