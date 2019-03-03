<template>
  <div class="heat-map-table">
    <panel :width="420" :height="440" titleIcon="ddd">
        <span slot="header">矩阵流量表</span>
        <div slot="body">
        <div class="rank-row">
            <div class="rank-col fl">
            <table>
                <thead>
                <tr>
                    <th>源IP</th>
                    <th>字节数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in heatSrcIpData" :key="index">
                    <td>{{item.srcIp}}</td>
                    <td>{{item.srcBytes}}</td>
                </tr>
                </tbody>
            </table>
            </div>
            <div class="rank-col fr">
            <table>
                <thead>
                <tr>
                    <th>目的IP</th>
                    <th>字节数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in heatDestIpData" :key="index">
                    <td>{{item.destIp}}</td>
                    <td>{{item.destBytes}}</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        <div class="rank-row">
            <div class="rank-col fl">
            <table>
                <thead>
                <tr>
                    <th>源端口</th>
                    <th>字节数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in heatSrcPortData" :key="index">
                    <td>{{item.srcPort}}</td>
                    <td>{{item.srcBytes}}</td>
                </tr>
                </tbody>
            </table>
            </div>
            <div class="rank-col fr">
            <table>
                <thead>
                <tr>
                    <th>目的端口</th>
                    <th>字节数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in heatDestPortData" :key="index">
                    <td>{{item.destPort}}</td>
                    <td>{{item.destBytes}}</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </panel>
    <!-- <div class="report-wrap"> -->
          <!-- <Table :columns="srcIpColumns" :data="heatSrcIpData" width="300"></Table> -->
          <!-- <ul class="report-list-top">
            <li class="src-ip-circle"><span>源IP Top-5</span></li>
            <li v-for="(item, index) in heatSrcIpData" :key="index">
              {{item.srcIp}}：{{item.srcBytes}}
            </li>
          </ul>
          <ul class="report-list-top">
            <li class="src-ip-circle"><span>目的IP Top-5</span></li>
            <li v-for="(item, index) in heatDestIpData" :key="index">
              {{item.destIp}}：{{item.destBytes}}
            </li>
          </ul>
          <ul class="report-list-top">
            <li class="src-ip-circle"><span>源端口 Top-5</span></li>
            <li v-for="(item, index) in heatSrcPortData" :key="index">
              {{item.srcPort}}：{{item.srcBytes}}
            </li>
          </ul>
          <ul class="report-list-top">
            <li class="src-ip-circle"><span>目的端口 Top-5</span></li>
            <li v-for="(item, index) in heatDestPortData" :key="index">
              {{item.destPort}}：{{item.destBytes}}
            </li>
          </ul> -->
        <!-- </div> -->
  </div>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  name: 'HeatmapTable',
  props: ['heatSrcIpData', 'heatDestIpData', 'heatSrcPortData', 'heatDestPortData'],
  components: {
    Panel
  }
};
</script>

<style lang="less">
.heat-map-table {
    .rank-row {
      margin: 20px 5px;
      .rank-col {
        overflow: hidden;
      }
    }
    table {
      th {
        font-size: 12px;
        font-weight: 600;
        color: #61d2f7;
        text-align: center;
        width: 100px;
        height: 32px;
      }
      tr {
        td {
          color: #fff;
          font-size: 10px;
          text-align: center;
          height: 32px;
        }
      }
      tbody tr:nth-of-type(2n+1) {
        background-color: #072951;
        box-shadow: -10px 0px 15px #2C58A6 inset,
          10px 0px 15px #2C58A6 inset;
      }
    }
    .report-wrap {
        height: 400px;
        margin: 20px 10px;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.3);
        box-shadow: 0 1px 1px rgba(0,0,0,.3);
        .report-list-top {
          display: inline-block;
          width: 200px;
          text-align: left;
          margin: 15px 0;
          li {
            padding: 5px 5px;
          }
          .src-ip-circle {
            list-style-type: disc;
            list-style-position: inside;
            line-height: 20px;
            font-size: 30px;
            span {
              color: black;
              vertical-align: top;
              line-height: 20px;
              font-size: 12px;
            }
          }
        }
        .report-list-top:first-of-type > .src-ip-circle{
          color: #C5473D;
        }
        .report-list-top:nth-of-type(2) > .src-ip-circle {
          color: #384B5A;
        }
        .report-list-top:nth-of-type(3) > .src-ip-circle {
          color: #7AAEB6;
        }
        .report-list-top:nth-of-type(4) > .src-ip-circle {
          color: #DD9375;
        }
      }
}
</style>
