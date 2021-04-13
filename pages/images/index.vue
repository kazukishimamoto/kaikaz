<template>
  <div class="container">
    <div class="content">
      <h1>画像一覧</h1>
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
        {{ imageNames[index] }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageNames: [],
      urls: [],
      selectedImgIndex: []
    }
  },
  computed: {
    rowsNum () {
      return Math.ceil(this.urls.length / 3)
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
