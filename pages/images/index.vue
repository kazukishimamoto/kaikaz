<template>
  <div class="container">
    <div class="content">
      <h1>画像一覧</h1>
      <a href="/">トップページ</a>
    </div>
    <div v-for="y in rowsNum" :key="y" class="columns">
      <div v-for="x in 3" :key="x" class="column is-one-third">
        <div class="card" :class="{ selected: isSelected((x-1)+3*(y-1)) }" @click="selectImgHandler((x-1)+3*(y-1))">
          <div class="card-image">
            <figure v-if="urls[(x-1)+3*(y-1)]" class="image">
              <img :src="urls[(x-1)+3*(y-1)]">
            </figure>
          </div>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="index in selectedImgIndex" :key="index">
        {{ images[index].name }}
      </li>
    </ul>
    <button v-show="showDeleteButton" class="button is-danger" @click="showDeleteDialog">
      選択した画像を削除
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedImgIndex: [],
      images: []
    }
  },
  computed: {
    rowsNum () {
      return Math.ceil(this.urls.length / 3)
    },
    urls () {
      return this.images.map(image => image.url)
    },
    showDeleteButton () {
      return !!this.selectedImgIndex.length
    }
  },
  async mounted () {
    // イメージ名の取得
    const imageNames = []
    const listRef = this.$fire.storage.ref().child('images')
    await listRef.listAll().then((res) => {
      res.items.forEach((itemsRef) => {
        imageNames.push(itemsRef.name)
      })
    })

    // 画像一覧取得
    imageNames.forEach((name) => {
      listRef.child(`${name}`).getDownloadURL().then((url) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
        }

        xhr.open('GET', url)
        xhr.send()

        this.images.push({
          url,
          name
        })
      })
    })
  },
  methods: {
    isSelected (index) {
      if (!(this.selectedImgIndex.find(i => i === index) === undefined)) { return true }
      return false
    },
    selectImgHandler (index) {
      if (this.isSelected(index)) {
        this.selectedImgIndex = this.selectedImgIndex.filter(img => img !== index)
      } else {
        this.selectedImgIndex.push(index)
      }
    },
    showDeleteDialog () {
      if (!this.selectedImgIndex.length) {
        alert('画像が選択されていません')
        return
      }
      const response = confirm('選択した画像を削除しますか？')
      if (response === true) {
        this.deleteImgHandler()
      }
    },
    deleteImgHandler () {
      // 画像への参照を作成する
      const listRef = this.$fire.storage.ref().child('images')

      this.selectedImgIndex.forEach((index) => {
        listRef.child(`${this.images[index].name}`).delete()
      })

      this.selectedImgIndex = []
      location.reload()
    }
  }
}
</script>

<style scoped>
figure img {
  width: 480px;
  height: 240px;
  object-fit: contain;
  padding: 10px;
}

.card:hover {
  cursor: pointer;
}

.selected {
  background-color: lightpink;
}
</style>
