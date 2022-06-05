import { defineStore } from 'pinia';
import { createStorage } from '@/utils/Storage';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types';

const Storage = createStorage({ storage: localStorage });
import { getUserInfo, ILoginDataType, login } from '@/api/system/user';
import { storage } from '@/utils/Storage';
import { awaitWrap } from '@/utils';
import { ILoginForm } from '@/views/login/hook/account-hook';
import { setToken, setExpiresIn } from '@/utils/auth';

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  expires_in: number;
  permissions: any[];
  info: any;
}

export const useUserStore = defineStore({
  id: 'app-user',
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage,
      },
    ],
  },
  state: (): IUserState => ({
    token: Storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    expires_in: 0,
    permissions: [],
    info: Storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.username;
    },
    getPermissions(): [any][] {
      return this.permissions;
    },
    getUserInfo(): object {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setExpiresIn(expiresIn: number) {
      this.expires_in = expiresIn;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info) {
      this.info = info;
    },
    // 登录
    async login(userInfo: ILoginForm) {
      try {
        userInfo.username = userInfo.username.trim();
        const [res, err] = await awaitWrap<ILoginDataType>(login(userInfo));
        if (!err) {
          const { data } = res;
          setToken(data.access_token);
          this.setToken(data.access_token);
          setExpiresIn(data.expires_in);
          this.setExpiresIn(data.expires_in);
        }
        return Promise.resolve(res);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    // 获取用户信息
    GetInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const { user, permissions } = res;
            if (permissions && permissions.length) {
              this.setPermissions(permissions);
              this.setUserInfo(user);
            } else {
              reject(new Error('getInfo: permissionsList must be a non-null array !'));
            }
            this.setAvatar(user.avatar);
            resolve(permissions);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo('');
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
      return Promise.resolve('');
    },
  },
});

// 需要在安装程序之外使用
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
