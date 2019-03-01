<template>
  <div class="control-wrap">
    <Form :model="formControl" :label-width="60" ref="formControl" :rules="ruleValidate">
        <FormItem label="级联选择器">
            <CheckboxGroup v-model="formControl.legend" @on-change="hanldeLegend">
                    <Checkbox label="一级">
                        <Icon type="logo-twitter"></Icon>
                        <span>一级</span>
                    </Checkbox>
                    <Checkbox label="二级">
                        <Icon type="logo-facebook"></Icon>
                        <span>二级</span>
                    </Checkbox>
                    <Checkbox label="三级">
                        <Icon type="logo-github"></Icon>
                        <span>三级</span>
                    </Checkbox>
                    <Checkbox label="四级">
                        <Icon type="logo-snapchat"></Icon>
                        <span>四级</span>
                    </Checkbox>
                    <Checkbox label="五级">
                        <Icon type="logo-snapchat"></Icon>
                        <span>五级</span>
                    </Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="日期" prop="date">
            <Row>
                <Col span="11">
                    <DatePicker type="date" placeholder="Select date"
                        v-model="formControl.date"
                        @on-change="handleDate"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <TimePicker type="time" placeholder="Select time" v-model="formControl.time"></TimePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">提交</Button>
            <Button @click="handleReset" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
    name: 'Control',
    data () {
        return {
            formControl: {
                ips: 'ips',
                ports: 'ports',
                date: '',
                time: '',
                legend: ['一级', '二级', '三级', '四级', '五级']
            },
            preLegend: ['一级', '二级', '三级', '四级', '五级'],
            formDate: '',
            portList: [
                {
                    value: '8801'
                },
                {
                    value: '1001'
                }
            ],
            ipList: [
                {
                    value: '10.7.5.5'
                },
                {
                    value: '333.1.0.1'
                }
            ],
            ruleValidate: {
                date: [
                    { required: false, type: 'date', message: 'Please select the date', trigger: 'change' }
                ],
                time: [
                    { required: false, type: 'string', message: 'Please select time', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        hanldeLegend() {
            if(this.preLegend !== this.legend) {
                this.$emit('chooseLegend', this.formControl.legend);
                this.preLegend = this.formControl.legend;
                console.log('现在的Legend = ', this.formControl.legend);
            }
        },
        handleDate(date) {
            console.log('date', date, date.getFullYear);
            this.formDate = date;
        },
        handleSubmit (name) {
            // 前端校验
            // 后端校验
            // ajax提交
            // let params = this.formControl;
            // params.hours = `${this.formDate} ${params.time}`;
            // console.log('params = ', params.hours);
            // this.$refs.formControl.validate((valid) => {
            //     if (valid) {
            //         this.axios.post('/api/getIp', {
            //             ips: params.ips,
            //             ports: params.ports,
            //             hours: params.hours
            //         }).then((res) => {
            //             console.log('IP数据', res.data);
            //         }).catch((error) => {
            //             console.log(error);
            //         });
            //     } else {
            //         console.log('错误！');
            //     }
            // })
        },
        handleReset (name) {
            this.$refs.formControl.resetFields();
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.control-wrap {
    padding: 40px 20px;
}
</style>
