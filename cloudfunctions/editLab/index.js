// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const res = await db.collection('lab_list').doc(event._id).update({
    data: {
      name: event.name,
      address: event.address,
      category_id: event.category_id,
      img_src: event.img_src,
      latitude: event.latitude,
      longitude: event.longitude,
      time: event.time,
      seat: event.seat
    }
  })

  return {
    res,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}