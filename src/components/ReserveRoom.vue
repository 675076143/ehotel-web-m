<template>
    <div class="reserveRooms">
        <FreeRooms :freeRooms="[reserveRoom]">
            <div style="display: flex;flex-direction: column">
                <p style="font-size: 12px">{{this.$route.params.checkInDate}}/{{this.$route.params.checkOutDate}}</p>
                <p style="font-size: 12px">共{{this.$route.params.checkDates}}天</p>
            </div>
        </FreeRooms>
        <div class="reserveRooms-main" v-model="formValidate">
            <Form ref="formValidate" :rules="ruleValidate" style="width: 100%" :label-width="80">
                <FormItem label="房间数" class="form-item">
                    <InputNumber :max="reserveRoom.freeCount" :min="1"
                                 v-model="formValidate.roomOrderSubDtoList[0].orderNumber" style="width: 100%"></InputNumber>
                </FormItem>
                <FormItem label="入住人">
                    <Input v-model="formValidate.customerNames[0]" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="联系手机">
                    <Input v-model="formValidate.customerPhone" placeholder="请输入您的电话号码"></Input>
                </FormItem>
                <FormItem label="E-mail" prop="mail">
                    <Input v-model="formValidate.customerEmail" placeholder="Enter your e-mail"></Input>
                </FormItem>
            </Form>
        </div>
        <div class="submit-bar">
            <span>总价：
                <span>￥{{total}}</span>
            </span>
            <Button class="submit-bar-submit" type="primary" @click="handleSubmit('formValidate')" style="width: 100%">提交订单</Button>
        </div>
    </div>
</template>

<script>
    import FreeRooms from "./FreeRooms";
    import {reqFreeRooms} from "../api";
    export default {
        name: "ReserveRoom",
        components: {FreeRooms},
        data(){
          return(
              {
                  reserveRoom:this.$route.params.freeRoom,
                  formValidate: {
                      customerEmail:"",
                      customerNames:[],
                      customerPhone:"",
                      eta:"",
                      roomOrderSubDtoList:[
                          {
                              checkInDate:this.$route.params.checkInDate,
                              checkOutDate:this.$route.params.checkOutDate,
                              orderNumber:1,
                              solutionName:""
                          }
                      ]
                  },
                  ruleValidate:{},
              }
          )
        },
        computed:{
            total(){
                return this.reserveRoom.solutionPrice*this.formValidate.roomOrderSubDtoList[0].orderNumber
            }
        },
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        this.$Message.success("success")
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
.reserveRooms{
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #2d8cf0;
}
.reserveRooms-main{
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
    padding: 5%;
}
.submit-bar{
    position: fixed;
    bottom: 0;
    display: flex;
    box-shadow: 0 -3px 5px rgba(0,0,0,0.3);
    height: 49px;
    width: 100%;

    .submit-bar-submit{
        height: 100%;
        flex: 1;
        border-radius: 0;
    }
    span{
        flex: 1;
        display: flex;
        align-items: center;
        padding: 10px;
        span{
            color: red;
        }
    }
}
</style>