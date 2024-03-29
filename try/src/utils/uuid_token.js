import { v4 as uuidv4 } from 'uuid';
//生成一个随机字符串。且每次执行不能发生变化

export const getUUID = () => {
    //先从本地存储获取uuid（如果没有再生成）
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    if (!uuid_token) {
        //没有就生成游客临时身份
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token;
}