<template>
  <div class="container">
    <dir class="sentense">
      <p>本日はお越しいただきありがとうございます</p>
      <p>送信した写真はスクリーンに投影されます</p>
    </dir>

    <div class="file is-boxed">
      <label class="file-label">
        <input class="file-input" type="file" name="resume" @change="onFileChange" multiple>
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            画像を選択する
          </span>
        </span>
      </label>
    </div>

    <button class="button submit" @click="submit">
      送信
    </button>

    <div v-for="(url, index) in urls" :key="index" class="preview">
      <div class="card">
        <div class="card-image">
          <figure class="image">
            <img :src="url">
          </figure>
        </div>
        <p>{{ files[index].name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageName: 'No File',
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
  background-image: url("../../assets/bg.jpg");
  background-color:rgba(255,255,255,0.5);
  background-blend-mode:lighten;
}

.sentense {
  margin-bottom: 20px;
  font-size: 15px;
  padding: 0;
}

.submit {
  margin: 10px 0;
}

.preview {
  margin-bottom: 10px;
}

.card {
  min-width: 375px;
}

img {
  padding: 10px;
}
</style>
