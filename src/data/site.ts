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

export const logNavigation: NavigationItem[] = [
  { label: 'All Logs', href: sitePath('/logs/') },
  { label: 'Technical Notes', href: sitePath('/logs/technical-articles/') },
  { label: 'Learning Notes', href: sitePath('/logs/learning-notes/') },
  { label: 'Project Retrospectives', href: sitePath('/logs/project-retrospectives/') },
];

export const navigation: NavigationItem[] = [
  { label: 'Home', href: sitePath('/') },
  { label: 'Logs', href: sitePath('/logs/'), children: logNavigation },
  { label: 'Topics', href: sitePath('/categories/') },
  { label: 'Projects', href: sitePath('/projects/') },
  { label: 'About', href: sitePath('/about/') },
];
