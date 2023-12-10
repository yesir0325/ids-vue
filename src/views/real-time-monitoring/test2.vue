<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="zoom">
        <a-input-number v-model="zoom" />
      </a-form-item>
      <a-form-item label="center">
        <a-input read-only :value="center.join(',')" style="width: 180px;" />
      </a-form-item>
      <a-form-item label="pitch">
        <a-input-number v-model="pitch" :step="5" />
      </a-form-item>
      <a-form-item label="rotation">
        <a-input-number v-model="rotation" :step="5" />
      </a-form-item>
    </a-form>
    <div style="width: 100%; height: 400px;">
      <amap
        cache-key="map"
        ref="map"
        view-mode="3D"
        map-style="amap://styles/whitesmoke"
        async
        :zoom.sync="zoom"
        :center.sync="center"
        :pitch.sync="pitch"
        :rotation.sync="rotation"
        :show-indoor-map="false"
        is-hotspot
        @hotspotclick="onHotspotClick"
      >
        <amap-marker
          :position="position"
          :label="{
            content: 'Hello, AMap-Vue!',
            direction: 'bottom',
          }"
        />
      </amap>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      center: [116.473778, 39.990661],
      position: [116.473778, 39.990661],
      zoom: 14,
      pitch: 45,
      rotation: 15
    }
  },
  methods: {
    onHotspotClick (e) {
      if (e && e.lnglat) {
        this.center = [e.lnglat.lng, e.lnglat.lat]
      }
    }
  }
}
</script>
