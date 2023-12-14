<template>
  <div>
    <!-- 搜索栏 -->
    <a-row style="margin-bottom: 16px">
      <a-col :span="8">
        <a-input placeholder="关键词搜索" v-model="searchKeyword" style="width: 80%; margin-right: 8px" />
      </a-col>
      <a-col :span="8">
        <a-range-picker
          :placeholder="['开始时间', '结束时间']"
          style="width: 80%"
          showTime
          format="YYYY-MM-DD HH:mm"
          v-model="dateRange"
          :ranges="ranges"
        />
      </a-col>
      <a-col :span="8" style="text-align: right;">
        <a-button type="primary" @click="searchLogs">搜索</a-button>
      </a-col>
    </a-row>

    <!-- 警报日志列表 -->
    <a-table :columns="columns" :data-source="displayedLogs" row-key="id" />

    <!-- 分页器 -->
    <a-pagination
      :total="totalLogs"
      :current="currentPage"
      :page-size="pageSize"
      @change="handlePageChange"
    />
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

export default {
  data () {
    return {
      searchKeyword: '',
      dateRange: [],
      alertLogs: [
        { id: 1, timestamp: '2023-01-01 12:30', level: '高', description: '入侵检测事件', eventType: '网络攻击' },
        { id: 2, timestamp: '2023-01-02 14:45', level: '中', description: '恶意软件检测', eventType: '恶意软件' }
        // 其他样例数据...
      ],
      totalLogs: 10,
      currentPage: 1,
      pageSize: 10,
      columns: [
        { title: '时间', dataIndex: 'timestamp', key: 'timestamp' },
        { title: '级别', dataIndex: 'level', key: 'level' },
        { title: '描述', dataIndex: 'description', key: 'description' },
        { title: '事件类型', dataIndex: 'eventType', key: 'eventType' }
        // 其他列定义...
      ],
      ranges: {
        '最近一小时': [moment().subtract(1, 'hour'), moment()],
        '今天': [moment().startOf('day'), moment().endOf('day')],
        '昨天': [moment().subtract(1, 'day').startOf('day'), moment().subtract(1, 'day').endOf('day')]
        // 其他自定义范围...
      }
    }
  },
  computed: {
    // 计算属性，用于获取当前页面要显示的数据
    displayedLogs () {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = this.currentPage * this.pageSize
      return this.alertLogs.slice(startIndex, endIndex)
    }
  },
  methods: {
    // 有问题
    searchLogs () {
      // 根据搜索条件过滤样例数据
      const filteredLogs = this.alertLogs.filter(log => {
        const keywordMatch = !this.searchKeyword || log.description.includes(this.searchKeyword)
        const dateMatch =
          !this.dateRange[0] || (moment(log.timestamp) >= moment(this.dateRange[0]) && moment(log.timestamp) <= moment(this.dateRange[1]))

        return keywordMatch && dateMatch
      })

      // 更新显示的数据和总记录数
      this.totalLogs = filteredLogs.length

      // 创建一个新的数组，确保不会影响响应式对象
      this.alertLogs = [...filteredLogs]

      // 重置当前页为第一页
      this.currentPage = 1
    },
    handlePageChange (page) {
      this.currentPage = page
    }
  }
}
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>
