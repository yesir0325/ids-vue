<template>
  <div class="intrusion-monitor">
    <div class="map-container">
      <amap
        :amap-key="'Your AMap Key'"
        :version="'2.0'"
        :useAMapUI="true"
        :amap-ui-version="'1.1'"
        :attack-data="attackData"
        @created="onMapCreated"
      >
        <a-marker
          v-for="(position, index) in attackData"
          :key="index"
          :position="position"
          :offset="[0, 0]"
          :content="'攻击位置'"
          :label="'攻击位置'"
          :extData="{ attackIndex: index }"
        ></a-marker>

        <!-- 修正路径参数为二维数组，确保连接攻击点 -->
        <!-- <a-polyline
          v-if="attackData.length > 1"
          :path="attackData"
          :strokeColor="'#FF0000'"
          :strokeWeight="4"
          :strokeOpacity="0.8"
          lineJoin="round"
          lineCap="round"
          arrow="true"
        ></a-polyline> -->
        <amap-polyline
          :path="[[116.397428, 39.90923], [121.473701, 31.230416]]"
          stroke-color="#409EFF"
          stroke-weight="8"
          cursor="default"
          :editable="true"
          :draggable="true"
        />
      </amap>
    </div>

    <div class="right-container">
      <div class="network-traffic">
        <a-card title="网络流量图" :bordered="false">
          <g2plot-line
            ref="networkChart"
            :data="networkData"
            x-field="time"
            y-field="value"
            series-field="type"
            height="300"
            :autoFit="true"
          ></g2plot-line>
        </a-card>
      </div>

      <div class="event-list">
        <a-card title="实时事件列表" :bordered="false">
          <a-table :columns="eventColumns" :data-source="eventData" :pagination="false"></a-table>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Line as G2PlotLine } from '@antv/g2plot'

export default {
  data () {
    return {
      networkData: [
        { time: '2023-01-01 00:00:00', type: 'Upload', value: 200 },
        { time: '2023-01-01 01:10:00', type: 'Upload', value: 400 },
        { time: '2023-01-01 01:20:00', type: 'Upload', value: 400 },
        { time: '2023-01-01 01:30:00', type: 'Upload', value: 400 },
        { time: '2023-01-01 01:40:00', type: 'Upload', value: 400 },
        { time: '2023-01-01 02:10:00', type: 'Upload', value: 300 },
        { time: '2023-01-01 02:20:00', type: 'Upload', value: 300 },
        { time: '2023-01-01 02:30:00', type: 'Upload', value: 600 },
        { time: '2023-01-01 02:40:00', type: 'Upload', value: 500 },
        { time: '2023-01-01 02:50:00', type: 'Upload', value: 300 },
        { time: '2023-01-01 02:55:00', type: 'Upload', value: 300 },
        { time: '2023-01-01 02:56:00', type: 'Upload', value: 320 },
        { time: '2023-01-01 03:00:00', type: 'Upload', value: 500 },
        { time: '2023-01-01 00:00:00', type: 'Download', value: 300 },
        { time: '2023-01-01 01:00:00', type: 'Download', value: 500 },
        { time: '2023-01-01 02:00:00', type: 'Download', value: 400 },
        { time: '2023-01-01 03:00:00', type: 'Download', value: 900 }
      ],
      eventData: [
        { time: '2023-01-01 12:30:45', type: 'Alert', description: 'Unauthorized access attempt' },
        { time: '2023-01-01 12:35:20', type: 'Alert', description: 'Malicious activity detected' },
        { time: '2023-01-01 12:40:10', type: 'Alert', description: 'DDoS attack detected' }
      ],
      eventColumns: [
        { title: '时间', dataIndex: 'time', key: 'time' },
        { title: '类型', dataIndex: 'type', key: 'type' },
        { title: '描述', dataIndex: 'description', key: 'description' }
      ],
      attackData: [
        { lng: 116.397428, lat: 39.90923 }, // 北京
        { lng: 121.473701, lat: 31.230416 } // 上海
        // ... 可以添加更多攻击位置
      ]
    }
  },
  created: function () {
  // 在地图加载完成后设置中心点和缩放级别
  this.$nextTick(() => {
    this.$refs.amap.setCenter([116.397428, 39.90923]) // 设置地图中心点为北京
    this.$refs.amap.setZoom(5) // 设置地图缩放级别
  })
},
  mounted () {
    this.$nextTick(() => {
      this.initNetworkTrafficChart()
    })
  },
  computed: {
    mapEvents () {
      return {
        created: (map) => {
          map.setCenter([116.397428, 39.90923])
          map.setZoom(2)
        }
      }
    }
  },
  methods: {
    initNetworkTrafficChart () {
      const chart = new G2PlotLine(this.$refs.networkChart, {
        data: this.networkData,
        xField: 'time',
        yField: 'value',
        seriesField: 'type',
        height: 300,
        autoFit: true,
        xAxis: {
          tickCount: 12
        },
        yAxis: {
          tickInterval: 250
        }
      })
      chart.render()
    },

    onMapCreated (map) {
      map.setCenter([116.397428, 39.90923])
      map.setZoom(2)
    }
  }
}
</script>

<style lang="less">
.intrusion-monitor {
  display: flex;
}

.map-container {
  flex: 7;
  height: 100vh;
}

.right-container {
  flex: 3;
  padding: 20px;
  box-sizing: border-box;
}

.network-traffic {
  margin-bottom: 20px;
}

.event-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
