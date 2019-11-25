<template>
    <div class="freeRooms">
        <div class="freeRoom" v-for="(freeRoom,index) in freeRooms">
            <div class="freeRoom-item">
                <h4>{{getTitle(index)}}</h4>
                <p>{{getDesc(index)}}</p>
                <p style="color: red">￥{{freeRoom.solutionPrice}}</p>
            </div>
            <Button type="primary">预定</Button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "FreeRooms",
        props:{
          freeRooms:{
              type:Array,
              default:[]
          }
        },
        computed:{
        },
        methods:{
            getTitle(index){
                return (this.freeRooms[index].roomTypeName+' > '+this.freeRooms[index].solutionName)
            },
            getDesc(index){
                return (this.freeRooms[index].breakfastType+' '
                    +this.freeRooms[index].bedType+' '
                    +'剩余 '+this.freeRooms[index].freeCount+' 间')
            }
        }
    }
</script>

<style scoped lang="less">
.freeRooms{
    width: 90%;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    padding: 10px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .freeRoom{
        border-bottom: 1px solid lightgray;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .freeRoom-item{

        h4,p{
            text-align: left;
        }
    }
    .freeRoom:last-child{
        border-bottom: 0;
    }
}
</style>