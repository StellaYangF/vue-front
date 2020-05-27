import { axios } from "@/utils";
import config from './config/public'

export const getSlider = () => axios.get(config.getSlider);

export const getCaptcha = () => axios.get(config.getCaptcha);