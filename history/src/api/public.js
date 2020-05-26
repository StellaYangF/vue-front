import config from './config/public';
import axios from '@/utils/request'
import { getLocal } from '@/utils/local.js'

// 获取轮播图功能
export const getSlider = () => axios.get(config.getSlider);

// 创建一个唯一的用户标识 和  验证码对应上  1：1234
export const getCaptcha = () => axios.get(config.getCaptcha, {
    params: {
        uid: getLocal('uuid')
    }
})