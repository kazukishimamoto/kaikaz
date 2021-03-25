<template>
  <div class="container">
    <div class="file has-name">
      <label class="file-label">
        <input class="file-input" type="file" name="resume" @change="onFileChange">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageName: 'No file'
    }
  },
  methods: {
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      this.imageName = files[0].name
    },
    submit () {
      console.log('ファイルアップロード！')
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
</style>
