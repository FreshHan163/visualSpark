<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .sunburst-chart {
      // border: 1px solid blueviolet;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <!-- <h1>饼图展示</h1> -->
    <div class="sunburst-chart" id="sunburstChart" style="width: 400px;height: 300px;"></div>
  </div>
</template>

<script>
export default {
  name: 'SunburstChart',
  data () {
    return {
      msg: 'hello',
      instances: [],
      udpData: [],
      tcpData: [],
      otherData: [],
    };
  },
  created () {
    this.getSunData().then(() => {
      console.log('异步请求结束');
      this.instances = this.tcpData.concat(this.udpData, this.otherData);
      console.log(this.instances.slice(0, 10));
      this.drawRose();
    });
  },
  mounted () {
  },
  methods: {
    getSunData() {
      return new Promise((resolve, reject) => {
        this.getSunTcpData()
        this.getSunOtherData();
        this.getSunUdpData();
        setTimeout(() => {
          resolve();
        }, 0);
      });
    },
    getSunTcpData() {
      this.$http.get('/api/getSunTcp0619').then((res) => {
        console.log('太阳图tcp--数据', res.body);
        res.body.forEach(item => {
            item.name = item.destPort;
            item.value = item.destAllBytes;
        });
        this.tcpData = res.body;
      });
    },
    getSunUdpData() {
      this.$http.get('/api/getSunUdp0619').then((res) => {
        console.log('太阳图udp--数据', res.body);
        res.body.forEach(item => {
            item.name = item.destPort;
            item.value = item.destAllBytes;
        });
        this.udpData = res.body;
      }).then(() => {
        console.log('异步开始！');
      });
    },
    getSunOtherData() {
      this.$http.get('/api/getSunOther0619').then((res) => {
        console.log('太阳图other--数据', res.body);
        res.body.forEach(item => {
            item.name = item.destPort;
            item.value = item.destAllBytes;
        });
        this.otherData = res.body;
      });
    },
    drawRose () {
      let data = [];
      this.instances.slice(0, 10).forEach((item, index) => {
        if (item.value !== 0) {
          data.push(item);
        }
      });
      console.log(this.instances);
      console.log(data);
      let roseChart = this.$echarts.init(document.getElementById('sunburstChart'));
      let roseOption = {
        title : {
            text: '协议端口分布图',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}端口: {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
        },
        // toolbox: {
        //     show : true,
        //     feature : {
        //         mark : {show: true},
        //         dataView : {show: true, readOnly: false},
        //         magicType : {
        //             show: true,
        //             type: ['pie', 'funnel']
        //         },
        //         restore : {show: true},
        //         saveAsImage : {show: true}
        //     }
        // },
        calculable : true,
        series : [
            {
                name:'协议端口分布图',
                type:'pie',
                radius : [30, 100],
                center : ['50%', '50%'],
                roseType : 'area',
                label: {
                  formatter: function(param) {
                    console.log(param);
                    return param.data.protocolCode + '  ' +param.data.name + '端口';
                  }
                },
                labelLine: {
                    length: 1
                },
                data: data
            }
        ]
    };
      roseChart.setOption(roseOption);
    }
  }
};
</script>
