<template>
  <div class="control-wrap">
    <Form :model="formControl" :label-width="60" ref="formControl" :rules="ruleValidate">
        <!-- <FormItem label="主机">
            <Row>
                <Col span="14">
                    <Select v-model="formControl.ips">
                        <Option v-for="(item, index) in ipList" :key="index" :value="item.value">
                            {{item.value}}
                        </Option>
                    </Select>
                </Col>
                <Col span="9" offset="1">
                    <Select v-model="formControl.ports">
                        <Option v-for="(item, index) in portList" :key="index" :value="item.value">
                            {{item.value}}
                        </Option>
                    </Select>
                </Col>
            </Row>
        </FormItem> -->
        <FormItem label="源IP" prop="ips">
            <Select v-model="formControl.ips">
                <Option v-for="(item, index) in ipList" :key="index" :value="item.value">
                    {{item.value}}
                </Option>
            </Select>
        </FormItem>
        <FormItem label="目的IP" prop="ports">
            <Select v-model="formControl.ports">
                <Option v-for="(item, index) in portList" :key="index" :value="item.value">
                    {{item.value}}
                </Option>
            </Select>
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
                time: ''
            },
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
                ips: [
                    { required: false, message: 'IP不能为空', trigger: 'blur' }
                ],
                ports: [
                    { required: false, message: '端口号不能为空', trigger: 'blur' }
                ],
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
        handleDate(date) {
            console.log('date', date, date.getFullYear);
            this.formDate = date;
        },
        handleSubmit (name) {
            // 前端校验
            // 后端校验
            // ajax提交
            let params = this.formControl;
            params.hours = `${this.formDate} ${params.time}`;
            console.log('params = ', params.hours);
            this.$refs.formControl.validate((valid) => {
                if (valid) {
                    this.axios.post('/api/getIp', {
                        ips: params.ips,
                        ports: params.ports,
                        hours: params.hours
                    }).then((res) => {
                        console.log('IP数据', res.data);
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    console.log('错误！');
                }
            })
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
    .ivu-form-item-label {
        color: white !important;
    }
}
</style>
