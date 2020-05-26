// websocket 可以实现双向通信 长连接， h5提供的 可以实时通信
import {getLocal } from '@/utils/local'
import store from '../store'
import * as types from '@/store/action-types'
class WS {
    constructor(config = {}) {
        this.url = config.url || 'localhost';
        this.port = config.prot || 4000;
        this.protocol = config.protocol || 'ws';
        // 心跳检测
        this.time = config.time || 30 * 1000;
        this.ws = null;
    }
    onOpen = () => { // 规定好发的必须是对象 对象里包含两个字段 type  data
        // websocket 是基于tcp 第一次连接靠的http 但是不能修改header
        this.ws.send(JSON.stringify({
            type:'auth',
            data: getLocal('token')
        }))
    }
    onMessage = (e) => {
        let {type,data} = JSON.parse(e.data);
        
        switch(type){
            case 'noAuth':
                console.log('没有权限');
                break;
            case 'heartCheck':
                this.checkServer();
                this.ws.send(JSON.stringify({type:'heartCheck'}));
                break;
            default:
                store.commit(types.SET_MESSAGE,data);
        }

    }
    onError = () => {
        setTimeout(() => {
            this.create();
        }, 1000);
    }
    onClose = () => {
        this.ws.close();
    }
    create() { // webworker
        this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`);
        this.ws.onopen = this.onOpen;
        this.ws.onmessage = this.onMessage;
        this.ws.onclose = this.onclose;
        this.ws.onerror = this.onError
    }
    checkServer(){
        clearTimeout(this.timer); // 防抖
        this.timer = setTimeout(() => {
            this.onClose();
            this.onError();
        }, this.time + 1000); // 断线重连
    }
    send = (msg)=>{
        this.ws.send(JSON.stringify(msg))
    }
}
export default WS;
