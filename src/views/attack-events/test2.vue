<template>
  <a-page-header :title="pageTitle">
    <a-descriptions :bordered="true" size="small" column="3">
      <a-descriptions-item label="开始时间">{{ attackEvent.startTime }}</a-descriptions-item>
      <a-descriptions-item label="结束时间">{{ attackEvent.endTime }}</a-descriptions-item>
      <a-descriptions-item label="攻击类型">{{ attackEvent.attackType }}</a-descriptions-item>
    </a-descriptions>

    <a-card>
      <!-- <a-tabs v-model:selectedTab="currentTab"> -->
        <a-tab-pane key="summary" tab="攻击概览">
          <div class="content-container">
            <!-- 攻击概览组件 -->
            <div>
              <h2>攻击概览</h2>
              <p>Total Attacks: {{ attackEvent.summary.totalAttacks }}</p>
              <p>Unique IPs: {{ attackEvent.summary.uniqueIPs }}</p>
              <!-- 添加更多攻击概览数据... -->
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="details" tab="攻击详情">
          <div class="content-container">
            <!-- 攻击详情组件 -->
            <div>
              <h2>攻击详情</h2>
              <!-- 添加更多攻击详情数据... -->
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="logs" tab="攻击日志">
          <div class="content-container">
            <!-- 攻击日志组件 -->
            <div>
              <h2>攻击日志</h2>
              <ul>
                <li v-for="log in attackEvent.logs" :key="log.timestamp">
                  {{ log.timestamp }} - {{ log.message }} (Severity: {{ log.severity }})
                </li>
              </ul>
              <!-- 添加更多攻击日志数据... -->
            </div>
          </div>
        </a-tab-pane>
      <!-- </a-tabs> -->
    </a-card>
  </a-page-header>
</template>

<script>
// import { ref } from 'vue'
// // import { PageHeader, Descriptions, Card, Tabs, TabPane } from 'ant-design-vue'

// export default {
//   components: {
//     'a-page-header': PageHeader,
//     'a-descriptions': Descriptions,
//     'a-descriptions-item': Descriptions.Item,
//     'a-card': Card,
//     'a-tabs': Tabs,
//     'a-tab-pane': TabPane
//   },
//   setup () {
//     const pageTitle = '攻击事件详情'
//     const currentTab = ref('summary') // 默认显示攻击概览

//     const attackEvent = {
//       startTime: '2023-01-01 12:00:00',
//       endTime: '2023-01-01 15:00:00',
//       attackType: 'SQL注入攻击',
//       summary: {
//         totalAttacks: 100,
//         uniqueIPs: 50
//         // 添加更多攻击概览数据...
//       },
//       details: {
//         // 添加更多攻击详情数据...
//       },
//       logs: [
//         { timestamp: '2023-01-01 12:05:00', message: '检测到SQL注入攻击。', severity: 'High' },
//         { timestamp: '2023-01-01 12:10:00', message: '尝试访问受限页面。', severity: 'Medium' }
//         // 添加更多攻击日志数据...
//       ]
//     }

//     return {
//       pageTitle,
//       currentTab,
//       attackEvent
//     }
//   }
// }
</script>

<style lang="less">
.content-container {
  padding: 16px;
}

/* 根据实际需要添加样式 */
</style>
