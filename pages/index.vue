<template>
  <div class="container">
    <div>
      <img id="myimg" class="NuxtLogo image is-128x128" :src="url">
      <h1 class="title">
        kaikaz
      </h1>
      <p>写真ファイルサーバー</p>
      <p>{{ this.images }}</p>
      <nuxt-link to="/images/new">
        <button class="button is-primary">
          新規画像登録
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: '',
      currentImgName: '',
      images: []
    }
  },
  watch: {
    url () {
      this.setNextImgName()
      setTimeout(() => {
        this.downloadImg(this.currentImgName)
      }, 7000)
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    downloadImg (imageName) {
      const pathReference = this.$fire.storage.ref(`images/${imageName}`)
      pathReference.getDownloadURL().then((url) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
        }
        xhr.open('GET', url)
        xhr.send()

        this.url = url
      })
    },
    setNextImgName () {
      let rand
      let loopNum = 0
      do {
        rand = Math.floor(Math.random() * this.images.length)
        loopNum++
      } while (this.currentImgName === this.images[rand] && loopNum < 10000)
      this.currentImgName = this.images[rand]
      if (loopNum >= 10000) {
        alert('画像が取得できませんでした.ページをリロードしてください')
      }
    },
    async getImgList () {
      // TODO: storageからイメージ名一覧取得できるのでそっち使う方が良さそう
      const imagesRef = this.$fire.firestore.collection('images')
      try {
        await imagesRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.images.push(doc.data().name)
          })
        })
      } catch (e) {
        alert(e)
      }
    },
    async initData () {
      await this.getImgList()
      this.currentImgName = this.images[0]
      this.downloadImg(this.currentImgName)
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.NuxtLogo {
  animation: 5s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
