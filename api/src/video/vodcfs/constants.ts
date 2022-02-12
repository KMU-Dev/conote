import { VodcfsSession } from '@prisma/client';

interface Page {
    url: string;
    title?: string;
}

type PageMap = {
    [k in 'login' | 'captcha']: Page;
};

export const pages: PageMap = {
    login: {
        url: 'http://vodcfs.kmu.edu.tw/index/login?next=%2F',
        title: '登入 | 高醫數理雲端學習平台',
    },
    captcha: {
        url: 'http://vodcfs.kmu.edu.tw/sys/libs/class/capcha/secimg.php',
    },
};

type CookieNameMap = {
    [key in keyof VodcfsSession]?: string;
};

export const cookieNameMap: CookieNameMap = {
    phpsessid: 'PHPSESSID',
    locale: 'locale',
    loginToken: '_login_token_',
    timezone: 'timezone',
    noteFontSize: 'noteFontSize',
    noteExpand: 'noteExpand',
};
