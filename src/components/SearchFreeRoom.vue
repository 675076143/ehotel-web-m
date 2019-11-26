<template>
    <div class="searchFreeRoom">
        <h3>查询空房</h3>
        <nav>
            <ul>
                <li>全日房</li>
                <li>终点房</li>
            </ul>
        </nav>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="城市" prop="city">
                <Input v-model="formValidate.city" placeholder="输入城市"></Input>
            </FormItem>
            <FormItem label="入住日期" prop="checkDate">
                <DatePicker type="daterange"
                            placement="bottom-end" placeholder="Select date"
                            :options="dateOption"
                            :value="formValidate.checkDate"
                            @on-change="handleChange"
                            @on-clear="handleClear"
                            style="width: 100%"></DatePicker>
            </FormItem>
            <FormItem label="入住时长">
                <Input :value="checkDates+' 天'" disabled></Input>
            </FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')" style="width: 100%">查询空房</Button>
        </Form>
    </div>
</template>

<script>
    import {reqFreeRooms} from "../api";

    export default {
        name: "searchFreeRoom",
        data(){
            return{
                formValidate: {
                    city:'漳州',
                    checkDate:[]
                },
                ruleValidate: {
                    city: [
                        {required: true, message: '城市名称不能为空', trigger: 'blur'}
                    ],
                    checkDate: [{
                        type: 'array',
                        required:true,
                        message:'请选择时间范围',
                        fields: {
                            //tpye类型试情况而定,所以如果返回的是date就改成date
                            0: {required: true, message: '请选择时间范围', trigger: 'blur'},
                            1: {required: true, message: '请选择时间范围', trigger: 'blur'}
                        }
                    }],
                },
                dateOption:{
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                }
            }
        },
        computed:{
          checkDates(){
              const checkInDate = Date.parse(this.formValidate.checkDate[0])
              const checkOutDate = Date.parse(this.formValidate.checkDate[1])
              return Math.floor(Math.abs(checkOutDate-checkInDate)/(24*3600*1000))
          }
        },
        methods: {
            handleClear() {
                this.$set(this.formValidate.checkDate, [])    //或许直接=[]也行,但是就是但是
            },
            handleChange(date) {
                this.formValidate.checkDate = date  //返回的是数组 ["2019-01-01","2019-02-30"]
            },
            handleSubmit (name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        if(this.checkDates===0){
                            alert("入住时长至少为一天！")
                        }else {
                            const result = await reqFreeRooms(this.formValidate.checkDate[0],this.formValidate.checkDate[1],this)
                            const emitData = {
                                freeRooms:result.data,
                                checkInDate:this.formValidate.checkDate[0],
                                checkOutDate:this.formValidate.checkDate[1],
                                checkDates:this.checkDates
                            }
                            this.$emit('freeRooms',emitData)
                            console.log(emitData)
                            this.$Message.success('Success!');
                        }
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
.searchFreeRoom{
    width: 90%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    padding: 10px;
    h3{
        text-align: left;
        border-bottom: 1px solid lightgray;
        padding: 5px 0;
    }
}
nav{
    margin-bottom: 20px;
    ul{
        display: flex;
        list-style: none;
        border-bottom: 1px solid lightgray;
        justify-content: space-around;
        li{
            width: 20%;
            padding: 5px 0;
        }
        li:nth-child(1){
            border-bottom:2px solid red;
        }
    }
}
.checkDay{
    display: flex;
}
</style>