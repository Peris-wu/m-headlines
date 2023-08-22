<!--  -->
<template>
  <div class="cropper-image">
    <img ref="imgRef" :src="preImage" alt="预览的图片" />
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      class="nav-bar"
      @click-left="$emit('close')"
      @click-right="confirm"
    />
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadUserProfileAvatar } from '@/api/user'
export default {
  name: 'CropperImage',
  props: {
    preImage: {
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  methods: {
    async confirm() {
      const blob = await this.getCropperImage()
      console.log(blob)
      const fd = new FormData()
      fd.append('photo', blob)
      await uploadUserProfileAvatar(fd)
      this.$emit('update-image', URL.createObjectURL(blob))
      this.$emit('close')
    },
    getCropperImage() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    }
  },
  components: {},
  mounted() {
    const image = this.$refs.imgRef
    this.cropper = new Cropper(image, {
      aspectRatio: 1 / 1,
      viewMode: 1,
      dragMode: 'move',
      movable: false
    })
  }
}
</script>
<style lang="scss" scoped>
.cropper-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  img {
    display: block;
    max-width: 100%;
  }
  .nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
  }
}
</style>
