export interface Meta {
  title: string;
  icon: string;
  noCache: boolean;
  link: string;
}

export interface Meta2 {
  title: string;
  icon: string;
  noCache: boolean;
  link: string;
}

export interface Meta3 {
  title: string;
  icon: string;
  noCache: boolean;
  link?: any;
}

export interface Child2 {
  name: string;
  path: string;
  hidden: boolean;
  component: string;
  meta: Meta3;
}

export interface Child {
  name: string;
  path: string;
  hidden: boolean;
  component: string;
  meta: Meta2;
  redirect: string;
  alwaysShow?: boolean;
  children: Child2[];
}

export interface MenuType {
  name: string;
  path: string;
  hidden: boolean;
  redirect: string;
  component: string;
  alwaysShow: boolean;
  status: string;
  meta: Meta;
  children: Child[];
}
