<template>
  <div>
    <h1>画像一覧</h1>
    <div class="imgs">
      <img v-for="url in urls" :key="url" :src="url">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageNames: [],
      urls: []
    }
  },
  async mounted() {
    // イメージ名の取得
    this.imageNames = []
    const listRef = this.$fire.storage.ref().child('images')
    await listRef.listAll().then((res) => {
      res.items.forEach((itemsRef) => {
        this.imageNames.push(itemsRef.name)
      })
    }).catch((error) => {})

    // 画像一覧取得
    this.imageNames.forEach((imgName) => {
      console.log('hoge')
      listRef.child(`${imgName}`).getDownloadURL().then((url) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
        }

        xhr.open('GET', url)
        xhr.send()

        this.urls.push(url)
      })
    })
  }
}
</script>

<style scoped>
.imgs {
  display: inline-block;
  height: 150px;
}
.imgs img {
  height: 100%;
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>
