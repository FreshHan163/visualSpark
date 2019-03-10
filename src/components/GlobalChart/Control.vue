<template>
  <div class="control-wrap">
    <Form :model="formControl" :label-width="60" ref="formControl" :rules="ruleValidate">
        <FormItem label="流量级别">
            <CheckboxGroup v-model="formControl.legend" @on-change="hanldeLegend">
                    <Checkbox label="1">
                        <span class="first-class"></span>
                    </Checkbox>
                    <Checkbox label="2" >
                        <span class="sec-class"></span>
                    </Checkbox>
                    <Checkbox label="3">
                        <span class="third-class"></span>
                    </Checkbox>
                    <Checkbox label="4" >
                        <span class="four-class"></span>
                    </Checkbox>
                    <Checkbox label="5">
                        <span class="five-class"></span>
                    </Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="起始日期" prop="startDate">
            <Row>
                <Col span="11">
                    <DatePicker type="date" placeholder="Select date"
                        v-model="formControl.startDate.date"
                        @on-change="handleDate"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <TimePicker type="time" placeholder="Select time" v-model="formControl.startDate.time"></TimePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="终止日期" prop="endDate">
            <Row>
                <Col span="11">
                    <DatePicker type="date" placeholder="Select date"
                        v-model="formControl.endDate.date"
                        @on-change="handleDate"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <TimePicker type="time" placeholder="Select time" v-model="formControl.endDate.time"></TimePicker>
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
                legend: ['1', '2', '3', '4', '5'],
                startDate: {
                    date: '',
                    time: ''
                },
                endDate: {
                    date: '',
                    time: ''
                },
            },
            preLegend: ['1', '2', '3', '4', '5'],
            formDate: '',
            portList: [
                {
                    value: '10.0.0.12'
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
                this.$emit('chooseLegend', this.formControl.legend.sort());
                this.preLegend = this.formControl.legend;
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
    padding: 8px 2px;
    [class$='-class'] {
        display: inline-block;
        width: 40px;
        height: 20px;
        border-radius: 4px;
        vertical-align: middle;
        opacity: 0.5;
    }
    .first-class {
        background-color: #db4c5b;
    }
    .sec-class {
        background-color: #e48b42;
    }
    .third-class {
        background-color: #ebc81c;
    }
    .four-class {
        background-color: #9cb675;
    }
    .five-class {
        background-color: #4ca3bb;
    }
    .ivu-checkbox-checked + [class$='-class']{
        opacity: 1;
    }
    .ivu-form .ivu-form-item-label {
        color: white;
    }
    .ivu-checkbox-inner {
        // display: none;
    }
}
</style>
