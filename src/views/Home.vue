<template>
  <el-carousel 
    :interval="4000" 
    type='card' 
    height='200px'
  >
    <el-carousel-item 
      v-for='item in sliders'
      :key='item._id'
    >
      <img :src="item.url" style='width:100%; height: 100%'>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SET_SLIDERS } from '../store/action-types';

export default {
  computed: {
    ...mapState(['sliders'])
  },
  methods: {
    ...mapActions([SET_SLIDERS])
  },
  mounted() {
    // 缓存，避免再次发送请求
    if (!this.sliders.length) {
     this[SET_SLIDERS]();
    }
  },
}
</script>