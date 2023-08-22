<!--  -->
<template>
  <div>
    <div>
      <van-nav-bar
        @click-left="triggerPopupName"
        @click-right="modifyName"
        title="昵称"
        left-text="取消"
        right-text="完成"
      />
      <van-field
        class="text-field"
        v-model="name"
        rows="2"
        autosize
        type="textarea"
        maxlength="8"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserNamePopup',
  props: {
    userName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: this.userName
    }
  },
  methods: {
    triggerPopupName() {
      this.$emit('close')
    },
    modifyName() {
      this.$emit('update:userName', this.name)
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped></style>
