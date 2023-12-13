<template>
  <a-card title="实时监控" :bordered="false">
    <a-row :gutter="[16, 8]">
      <a-col :span="5">
        <a-input v-model="search.id" placeholder="ID" />
      </a-col>
      <a-col :span="5">
        <a-input v-model="search.sourceIp" placeholder="源 IP" />
      </a-col>
      <a-col :span="5">
        <a-input v-model="search.destinationIp" placeholder="目标 IP" />
      </a-col>
      <a-col :span="3">
        <a-select v-model="search.protocol" placeholder="协议">
          <a-select-option value="">全部协议</a-select-option>
          <a-select-option value="TCP">TCP</a-select-option>
          <a-select-option value="UDP">UDP</a-select-option>
          <a-select-option value="HTTP">HTTP</a-select-option>
          <!-- 添加更多协议选项... -->
        </a-select>
      </a-col>
      <a-col :span="3">
        <a-input v-model="search.port" placeholder="端口" />
      </a-col>
      <a-col :span="3">
        <a-select v-model="search.severity" placeholder="严重程度">
          <a-select-option value="">全部严重程度</a-select-option>
          <a-select-option value="High">High</a-select-option>
          <a-select-option value="Medium">Medium</a-select-option>
          <a-select-option value="Low">Low</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="2">
        <a-button type="primary" @click="handleSearch">搜索</a-button>
      </a-col>
    </a-row>

    <a-table :columns="columns" :dataSource="filteredData" rowKey="id">
      <template v-slot:customRender="text">
        <span :style="{ color: getSeverityColor(text), display: 'flex', alignItems: 'center' }">
          <a-icon :type="getSeverityIcon(text)" style="margin-right: 5px" />
          {{ text }}
        </span>
      </template>
    </a-table>
  </a-card>
</template>

<script>
export default {
  data () {
    return {
      realTimeData: [
        { id: 1, sourceIp: '192.168.1.1', destinationIp: '10.0.0.1', protocol: 'TCP', port: 80, severity: 'High' },
        { id: 2, sourceIp: '192.168.1.2', destinationIp: '10.0.0.2', protocol: 'UDP', port: 53, severity: 'Medium' }
        // 添加更多实时监控数据...
      ],
      search: {
        id: '',
        sourceIp: '',
        destinationIp: '',
        protocol: '',
        port: '',
        severity: ''
      },
      columns: [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: '源 IP', dataIndex: 'sourceIp', key: 'sourceIp' },
        { title: '目标 IP', dataIndex: 'destinationIp', key: 'destinationIp' },
        { title: '协议', dataIndex: 'protocol', key: 'protocol' },
        { title: '端口', dataIndex: 'port', key: 'port' },
        { title: '严重程度', dataIndex: 'severity', key: 'severity', slots: { customRender: 'customRender' } }
      ]
    }
  },
  computed: {
    filteredData () {
      return this.realTimeData.filter(item =>
        Object.entries(this.search).every(([key, value]) =>
          value === '' || String(item[key]).toLowerCase().includes(value.toLowerCase())
        )
      )
    }
  },
  methods: {
    getSeverityColor (severity) {
      // 根据严重程度返回相应的颜色
      if (severity === 'High') return 'red'
      if (severity === 'Medium') return 'orange'
      return 'green'
    },
    getSeverityIcon (severity) {
      // 根据严重程度返回相应的图标
      if (severity === 'High') return 'exclamation-circle'
      if (severity === 'Medium') return 'warning'
      return 'check-circle'
    },
    handleSearch () {
      // 处理搜索逻辑，可以在这里发起请求或者其他操作
      console.log('Search:', this.search)
    }
  }
}
</script>

<style lang="less">
.a-card {
  margin: 20px;
  width: 80%;
}

.a-table {
  margin-top: 20px;
}

.a-row {
  margin-bottom: 16px;
}

/* 根据实际需要添加更多样式 */
</style>
