<template>
  <div class="container">
    <dir class="sentence">
      <p>本日はお越しいただきありがとうございます</p>
      <p>送信した写真はスクリーンに投影されます</p>
    </dir>
    <div class="file has-name">
      <label class="file-label">
        <input class="file-input" type="file" multiple name="resume" @change="onFileChange">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload" />
          </span>
          <span class="file-label">
            画像を選択
          </span>
        </span>
        <!-- <span class="file-name">
          {{ imageName }}
        </span> -->
      </label>
    </div>
    <button class="button submit" @click="submit">
      送信
    </button>
    <div v-for="(url, index) in urls" :key="index" class="preview">
      <img :src="url">
      <p>{{ files[index].name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageName: '',
      files: null,
      urls: []
    }
  },
  methods: {
    onFileChange (e) {
      this.urls = []
      this.imageName = 'No file'

      this.files = e.target.files || e.dataTransfer.files
      this.imageName = `chose ${this.files.length} images`
      this.files.forEach((file) => {
        this.urls.push(URL.createObjectURL(file))
      })
    },
    submit () {
      if (!this.files) {
        alert('File not found')
        return
      }

      const imagesRef = this.$fire.firestore.collection('images')
      const storage = this.$fire.storage.ref()
      let count = 1
      this.files.forEach((file) => {
        // イメージ名の保存
        imagesRef.add({
          name: file.name
        })

        // 画像のアップロード
        storage.child(`images/${file.name}`).put(file).then((snapshot) => {
          console.log(snapshot) // リンター対策：今後snapshot使うと思うので

          // ファイル数をカウントして、最後のファイルがアップロードされたときだけ画面遷移する
          if (count === this.files.length) {
            alert('done')
            location.reload()
          }
          count++
        })
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-size: cover;
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
                  url("https://i.pinimg.com/originals/78/a8/a3/78a8a3213ce2954cee241e43dbd578cc.jpg");
}

.sentence {
  margin-bottom: 30px;
  font-size: 20px;
  /* font-weight: bold; */
}

.submit {
  margin-top: 10px;
}

.preview {
  margin-bottom: 10px;
}
</style>
