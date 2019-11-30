<template>
    <div class="reserveRooms">
        <FreeRooms :freeRooms="[reserveRoom]">
            <div style="display: flex;flex-direction: column">
                <p style="font-size: 12px">{{this.$route.params.checkInDate}}/{{this.$route.params.checkOutDate}}</p>
                <p style="font-size: 12px">共{{this.$route.params.checkDates}}天</p>
            </div>
        </FreeRooms>
        <div class="reserveRooms-main" v-model="formValidate">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" style="width: 100%" :label-width="80">
                <FormItem label="房间数" class="form-item" prop="roomCount">
                    <InputNumber :max="reserveRoom.freeCount" :min="1"
                                 v-model="formValidate.roomOrderSubDtoList[0].orderNumber" style="width: 100%"></InputNumber>
                </FormItem>
                <FormItem label="入住人" prop="customerNames">
                    <Input v-model="formValidate.customerNames" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="联系手机" prop="customerPhone">
                    <Input v-model="formValidate.customerPhone" placeholder="请输入您的电话号码"></Input>
                </FormItem>
                <FormItem label="E-mail" prop="customerEmail" >
                    <Input v-model="formValidate.customerEmail" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <FormItem label="预计到店" prop="eta">
                    <Select v-model="formValidate.eta" size="small" style="width:100%">
                        <Option v-for="item in formValidate.timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Form>
        </div>
        <div class="reserveRoom-rules">
            <p>预定说明：</p><br/>
            <p>房间整晚保留，14：00前到店可能需要等房</p>
        </div>
        <div class="submit-bar">
            <span>总价：
                <span>￥{{total}}</span>
            </span>
            <Button class="submit-bar-submit" type="primary" @click="handleSubmit('formValidate')" style="width: 100%">提交订单</Button>
        </div>

        <Modal
                v-model="modal"
                :title="'订单流水号：'+modalTitle"
                @on-ok="ok"
                @on-cancel="cancel">
            <p>姓名：{{formValidate.customerNames}}</p>
            <p>电话：{{formValidate.customerPhone}}</p>
            <p>邮箱：{{formValidate.customerEmail}}</p>
            <p>预计到店：{{formValidate.eta}}</p>
            <p>入住时间：{{formValidate.roomOrderSubDtoList[0].checkInDate}}</p>
            <p>离店时间：{{formValidate.roomOrderSubDtoList[0].checkOutDate}}</p>
            <p>订房数量：{{formValidate.roomOrderSubDtoList[0].orderNumber}}</p>
            <p>套餐名称：{{formValidate.roomOrderSubDtoList[0].solutionName}}</p>
        </Modal>
    </div>
</template>

<script>
    import FreeRooms from "./FreeRooms";
    import {reqFreeRooms, reqReserveRooms} from "../api";
    export default {
        name: "ReserveRoom",
        components: {FreeRooms},
        mounted() {
            // console.log(typeof (this.$route.params.checkInDate))
        },
        data(){
          return(
              {
                  modal:false,
                  modalTitle:'',
                  reserveRoom:this.$route.params.freeRoom,
                  formValidate: {
                      customerEmail:"",
                      customerNames:"",
                      customerPhone:"",
                      eta:"",
                      roomOrderSubDtoList:[
                          {
                              checkInDate:this.$route.params.checkInDate,
                              checkOutDate:this.$route.params.checkOutDate,
                              orderNumber:1,
                              solutionName:this.$route.params.freeRoom.solutionName,
                          }
                      ],
                      eta:'',
                      timeList:[
                          {
                              label:'14:00',
                              value: this.$route.params.checkInDate+' 14:00:00'
                          },
                          {
                              label:'15:00',
                              value: this.$route.params.checkInDate+' 15:00:00'
                          },
                          {
                              label:'16:00',
                              value: this.$route.params.checkInDate+' 16:00:00'
                          },
                          {
                              label:'17:00',
                              value: this.$route.params.checkInDate+' 17:00:00'
                          },
                          {
                              label:'18:00',
                              value: this.$route.params.checkInDate+' 18:00:00'
                          },
                          {
                              label:'19:00',
                              value: this.$route.params.checkInDate+' 19:00:00'
                          },
                          {
                              label:'20:00',
                              value: this.$route.params.checkInDate+' 20:00:00'
                          },
                          {
                              label:'21:00',
                              value: this.$route.params.checkInDate+' 21:00:00'
                          },
                          {
                              label:'22:00',
                              value: this.$route.params.checkInDate+' 22:00:00'
                          },
                          {
                              label:'23:00',
                              value: this.$route.params.checkInDate+' 23:00:00'
                          },
                      ]
                  },
                  ruleValidate:{
                      roomCount:[
                          // {required: true, message: '房间数不能为空', trigger: 'blur'}
                      ],
                      customerNames:[
                          {required: true, message: '入住人不能为空', trigger: 'blur'}
                      ],
                      customerPhone:[
                          {required: true, message: '联系手机不能为空', trigger: 'blur'}
                      ],
                      customerEmail:[
                          // {required: true, message: '到店日期不能为空', trigger: 'blur'}
                          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                      ],
                      eta:[
                          {required: true, message: '到店日期不能为空', trigger: 'change'}
                      ]
                  },
              }
          )
        },
        computed:{
            total(){
                //套餐价格*订房数量*天数
                const total = this.reserveRoom.solutionPrice*this.formValidate.roomOrderSubDtoList[0].orderNumber*this.$route.params.checkDates
                return total
            }
        },
        methods:{
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            handleSubmit (name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        const {customerEmail,customerNames,customerPhone,eta,roomOrderSubDtoList} = this.formValidate
                        const roomOrderDto = {
                            customerEmail,customerPhone,eta,roomOrderSubDtoList,
                            customerNames:[customerNames]
                        }
                        console.log(roomOrderDto)
                        const result = await reqReserveRooms(roomOrderDto,this)
                        if(result.code==='200'){
                            this.$Message.success("预定成功！")
                            this.modal = true
                            this.modalTitle = result.data
                        }else {
                            this.$Message.error("fail!")
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
.reserveRooms{
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #2d8cf0;

    .reserveRoom-rules{
        background-color: #f6f6f6;
        width: 100%;
        height: 100%;
        padding: 10px;
        p{
            text-align: left;
        }
    }
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