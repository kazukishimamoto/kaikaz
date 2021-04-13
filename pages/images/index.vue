<template>
  <div class="container">
    <h1>画像一覧</h1>
    <div v-for="(images,y) in imageTable" :key="y" class="tile is-ancestor">
      <div class="tile is-parent">
        <div v-for="(image,x) in images" :key="y+image+x" class="tile is-child box">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img :src="image" :alt="image">
              </figure>
            </div>
          </div>
          <label>{{ imageNames[x+y*3] ? imageNames[x+y*3] : 'No Image' }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageNames: [],
      urls: []
    }
  },
  computed: {
    imageTable () {
      const imageTable = []

      if (this.urls) {
        for (let y = 0; y < this.imageNames.length / 3; y++) {
          const tmp = []
          for (let x = 0; x < 3; x++) {
            if (this.urls[x + y * 3]) { tmp.push(this.urls[x + y * 3]) } else { tmp.push('https://corp.zaif.jp/wp-content/uploads/2017/01/noimage.png') }
          }
          imageTable.push(tmp)
        }
        return imageTable
      }

      return imageTable
    }
  },
  async mounted () {
    // イメージ名の取得
    this.imageNames = []
    const listRef = this.$fire.storage.ref().child('images')
    await listRef.listAll().then((res) => {
      res.items.forEach((itemsRef) => {
        this.imageNames.push(itemsRef.name)
      })
    })

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

.tile .is-child:hover {
  cursor: pointer;
  background-color: lightgoldenrodyellow;
}
</style>
