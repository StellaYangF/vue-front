import config from './config/user';
import axios from '@/views/request';

export const reg = options => axios.post(config.reg, options);

export const login = options => axios.post(config.login, options);

export const validate = () => axios.get(config.validate);