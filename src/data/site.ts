import { sitePath } from '../lib/paths';

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const site = {
  name: 'DEV.LOG',
  description: '아이디어를 실제 서비스로 만드는 개발 기록',
  heroTitleLines: ['AI 에이전트와 함께 아이디어를 실제 서비스로 만드는', '풀스택 개발자'],
  githubUrl: 'https://github.com/jihoney19',
};

export const navigation: NavigationItem[] = [
  { label: 'Project', href: sitePath('/projects/') },
];
