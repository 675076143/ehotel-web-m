import ajax from './ajax'

export const reqFreeRooms = (checkInDate, checkOutDate,that) => {
    // console.log({userName,password})
    return ajax('/roomOrder/freeRooms',{checkInDate,checkOutDate},'GET',that)
}