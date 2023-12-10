<template>
  <a-layout>
    <!-- 1. 总体概览 -->
    <a-layout-header>
      <a-card>
      <a-row gutter="16">
        <!-- 统计信息示例 -->
        <a-col :span="6">
          <a-statistic :title="`总事件数`" :value="totalEvents" />
        </a-col>
        <a-col :span="6">
          <a-statistic :title="`警报数`" :value="totalAlerts" />
        </a-col>
        <a-col :span="6">
          <a-statistic :title="`用户活跃数`" :value="activeUsers" />
        </a-col>
        <a-col :span="6">
          <a-statistic :title="`地理位置数`" :value="geoLocations" />
        </a-col>
      </a-row>
    </a-card>    </a-layout-header>

    <a-layout-content>
      <a-row gutter="16">
        <!-- 2. 实时事件流 -->
        <a-col :span="12">
          <a-card title="实时事件流">
    <a-table :columns="columns" :dataSource="eventData" :pagination="false" />
  </a-card>
        </a-col>

        <!-- 3. 警报和通知 -->
        <a-col :span="12">
          <a-card title="警报和通知">
    <div v-if="alerts.length === 0" class="no-alerts">
      暂无警报和通知
    </div>
    <a-alert
      v-for="alert in alerts"
      :key="alert.id"
      :message="alert.message"
      :type="alert.type"
      :closable="true"
      :show-icon="true"
      :banner="true"
      style="margin-bottom: 16px"
    />
  </a-card>
        </a-col>
      </a-row>

      <a-row gutter="16">
        <!-- 4. 地理位置信息 -->
        <a-col :span="12">
          <!-- Your code for geographical location information -->
        </a-col>

        <!-- 5. 用户活动 -->
        <a-col :span="12">
          <a-card title="用户活动">
      <UserActivityMap :userActivities="userActivities" />
    </a-card>
        </a-col>
      </a-row>

      <!-- 6. 网络流量图 -->
      <a-row>
        <a-col :span="24">
          <!-- Your code for network traffic chart -->
        </a-col>
      </a-row>

      <a-row gutter="16">
        <!-- 7. 时间轴 -->
        <a-col :span="16">
          <!-- Your code for timeline -->
        </a-col>

        <!-- 8. 系统资源使用情况 -->
        <a-col :span="8">
          <!-- Your code for system resource usage -->
        </a-col>
      </a-row>

      <a-row>
        <!-- 9. 实时日志 -->
        <a-col :span="24">
          <!-- Your code for real-time logs -->
        </a-col>
      </a-row>

      <a-row>
        <!-- 10. 操作按钮 -->
        <a-col :span="24">
          <!-- Your code for action buttons -->
        </a-col>
      </a-row>

      <a-row>
        <!-- 11. 响应建议 -->
        <a-col :span="24">
          <!-- Your code for response suggestions -->
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  // name: 'IntrusionDetectionPage'
  // Add your data, methods, computed properties, etc.
  data () {
    return {
      totalEvents: 1000,
      totalAlerts: 50,
      activeUsers: 20,
      geoLocations: 5,
      eventData: [
        { id: 1, eventType: '登录尝试', description: '尝试使用无效的用户名登录' },
        { id: 2, eventType: '网络活动', description: '访问受限网站' }
        // 其他事件数据
      ],
      columns: [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: '事件类型', dataIndex: 'eventType', key: 'eventType' },
        { title: '描述', dataIndex: 'description', key: 'description' }
      ],
        alerts: [
        { id: 1, message: '警告：系统检测到异常活动', type: 'warning' },
        { id: 2, message: '通知：最新系统更新已发布', type: 'info' }
        // 其他警报和通知
      ],
      userActivities: [
        { id: 1, position: [116.397428, 39.90923], name: '用户A' },
        { id: 2, position: [116.417428, 39.91923], name: '用户B' }
      ]
    }
  }
}
</script>

<style scoped>
/* Add your component-specific styles here */
.no-alerts {
  text-align: center;
  margin-top: 16px;
  color: #999;
}
</style>
