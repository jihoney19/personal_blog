export const site = {
  name: 'DEV.LOG',
  description: '아이디어를 실제 서비스로 만드는 개발 기록',
  heroTitleLines: ['AI 에이전트와 함께 아이디어를 실제 서비스로 만드는', '풀스택 개발자'],
};

export const navigation = [
  { label: 'Home', href: sitePath('/') },
  { label: 'Categories', href: sitePath('/categories/') },
  { label: 'Tags', href: sitePath('/tags/') },
  { label: 'Projects', href: sitePath('/projects/') },
  { label: 'About', href: sitePath('/about/') },
];
import { sitePath } from '../lib/paths';
