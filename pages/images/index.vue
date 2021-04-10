<template>
  <div class="container">
    <h1>画像一覧</h1>
    <div v-for="(images,y) in imageTable" :key="y" class="tile is-ancestor">
      <div  class="tile is-parent">
        <div v-for="(image,x) in images" :key="image" class="tile is-child box">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img :src="image" :alt="image">
              </figure>
            </div>
          </div>
          <label>{{ imageNames[x+y*3] ? imageNames[x+y*3] : 'no image' }}</label>
        </div>
      </div>
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
      listRef.child(`${imgName}`).getDownloadURL().then((url) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
        }

        xhr.open('GET', url)
        xhr.send()

        this.urls.push(url)
      })
    })
  },
  computed: {
    imageTable() {
      const imageTable = []

      if (this.urls) {
        for (let y = 0; y < this.imageNames.length/3; y++) {
          const tmp = []
          for (let x = 0; x < 3; x++) {
            if (this.urls[x+y*3])
              tmp.push(this.urls[x+y*3])
            else
              tmp.push('https://bulma.io/images/placeholders/1280x960.png')
          }
          imageTable.push(tmp)
        }
        return imageTable
      }

      return imageTable
    }
  }
}
</script>

<style scoped>
figure img {
  width: 480px;
  height: 240px;
  object-fit: contain;
}

label {
  text-align: center;
  display: block;
}
</style>
