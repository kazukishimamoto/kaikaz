<template>
  <div class="container">
    <div class="file has-name">
      <label class="file-label">
        <input class="file-input" type="file" multiple name="resume" @change="onFileChange">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload" />
          </span>
          <span class="file-label">
            Choose a file…
          </span>
        </span>
        <span class="file-name">
          {{ imageName }}
        </span>
      </label>
    </div>
    <button class="button submit" @click="submit">
      送信
    </button>
    <div class="preview" v-for="(url, index) in urls" :key="index">
      <img :src="url">
      <p>{{ files[index].name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageName: 'No file',
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
      this.files.forEach(file => {
        this.urls.push(URL.createObjectURL(file))
      });
    },
    submit () {
      console.log('ファイルアップロード！')
      if (!this.files) {
        console.log('File not found')
        return
      }

      const storage = this.$fire.storage.ref()
      let count = 1
      this.files.forEach(file => {
        storage.child(`images/${file.name}`).put(file).then(snapshot => {
          console.log('Uploaded a blob or file!')
          // ファイル数をカウントして、最後のファイルがアップロードされたときだけ画面遷移する
          if (count == this.files.length) {
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
}

.submit {
  margin-top: 10px;
}

.preview {
  margin-bottom: 10px;
}
</style>
