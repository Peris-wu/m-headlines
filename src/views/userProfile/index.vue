<!--  -->
<template>
  <div class="user-profile">
    <div class="header">
      <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    </div>
    <input
      type="file"
      accept="image/*"
      hidden
      ref="fileRef"
      @change="changeOfFile"
    />
    <van-cell title="头像" value="" is-link center @click="selectAvatar">
      <van-image
        round
        width="30"
        height="30"
        fit="cover"
        :src="userInfo.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="triggerPopupName"
    />
    <van-cell
      title="性别"
      :value="userInfo.gender | sex"
      is-link
      @click="triggerPopupSex"
    />
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="triggerPopupDate"
    />

    <van-popup
      v-model="showPopupPreImg"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <cropper-image
        v-if="showPopupPreImg"
        :preImage="preImage"
        @update-image="updateImage"
        @close="showPopupPreImg = false"
      ></cropper-image>
    </van-popup>

    <van-popup
      v-model="showPopupName"
      position="bottom"
      :style="{ height: '100%' }"
      class="popup-main"
    >
      <user-name-popup
        v-if="showPopupName"
        :userName="userInfo.name"
        @update:userName="modifyName"
        @close="triggerPopupName"
      ></user-name-popup>
    </van-popup>

    <van-popup v-model="showPopupGender" position="bottom">
      <van-picker
        show-toolbar
        title="性别"
        :columns="options"
        :default-index="gender"
        @cancel="triggerPopupSex"
        @confirm="modifyGender"
        ref="genderRef"
      />
    </van-popup>

    <van-popup v-model="showPopupDate" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="triggerPopupDate"
        @confirm="modifyDate"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/day'
import UserNamePopup from '@/views/userProfile/components/userNamePopup'
import CropperImage from '@/views/userProfile/components/cropperImage'
import { getUserProfile, modifyUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  data() {
    return {
      showPopupName: false,
      showPopupGender: false,
      showPopupDate: false,
      showPopupPreImg: false,
      name: '',
      options: ['男', '女'],
      gender: '',
      currentDate: new Date(),
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      preImage: '',
      userInfo: {}
    }
  },
  methods: {
    triggerPopupName() {
      this.showPopupName = !this.showPopupName
    },
    triggerPopupSex() {
      this.showPopupGender = !this.showPopupGender
    },
    triggerPopupDate() {
      this.showPopupDate = !this.showPopupDate
    },
    updateImage(newImage) {
      this.userInfo.photo = newImage
    },
    selectAvatar() {
      const fileRef = this.$refs.fileRef
      fileRef.click()
    },
    changeOfFile(event) {
      console.log(event)
      console.log(event.target.files[0])
      this.preImage = URL.createObjectURL(event.target.files[0])
      this.showPopupPreImg = true
      event.target.value = ''
    },
    async modifyProfile(data) {
      try {
        return await modifyUserProfile(data)
      } catch (err) {
        console.log(err)
      }
    },
    async modifyName(newName) {
      try {
        if (this.userInfo.name === newName || !newName) return
        const data = {
          name: newName
        }
        const { status } = await this.modifyProfile(data)
        if (status === 200) {
          this.userInfo.name = newName
          this.showPopupName = false
        }
      } catch (err) {
        console.log(err)
      }
    },
    async modifyGender() {
      try {
        const [index] = this.$refs.genderRef.getIndexes()
        if (index === this.gender) return
        const data = {
          gender: index
        }
        const { status } = await this.modifyProfile(data)
        if (status === 200) {
          this.userInfo.gender = index
          this.showPopupGender = false
        }
      } catch (err) {
        console.log(err)
      }
    },
    async modifyDate() {
      try {
        // 如果选择同一天
        if (
          this.userInfo.birthday ===
          dayjs(this.currentDate).format('YYYY-MM-DD')
        ) {
          return
        }

        const data = {
          birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
        }
        const { status } = await this.modifyProfile(data)
        if (status === 200) {
          this.showPopupDate = false
          this.userInfo.birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async initUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.userInfo = data.data
        this.name = this.userInfo.name
        this.gender = this.userInfo.gender
        this.currentDate = new Date(this.userInfo.birthday)
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    UserNamePopup,
    CropperImage
  },
  mounted() {
    this.initUserProfile()
  }
}
</script>
<style lang="scss" scoped>
.user-profile {
  .popup-main {
    background-color: #f5f7f9;
  }
  .text-field {
    width: unset;
    margin: 10px;
  }
}
</style>
