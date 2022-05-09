// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const res = await db.collection('lab_instrument_list').doc(event._id).update({
    data: {
      ins_name: event.ins_name,
      ins_address: event.ins_address,
      ins_image: event.ins_image,
      ins_status: event.ins_status
    }
  })

  return {
    res,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}