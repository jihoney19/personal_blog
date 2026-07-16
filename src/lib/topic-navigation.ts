import { navigation, type NavigationItem } from '../data/site';
import { sitePath } from './paths';
import { toSlug } from './slug';

type CategoryPost = {
  data: {
    category: string;
    draft?: boolean;
  };
};

export function buildSiteNavigation(posts: CategoryPost[]): NavigationItem[] {
  const publishedPosts = posts.filter((post) => !post.data.draft);
  const categories = [...new Set(publishedPosts.map((post) => post.data.category))].sort();
  const categoryNavigation: NavigationItem[] = categories.map((category) => ({
      label: category,
      href: sitePath(`/categories/${toSlug(category)}/`),
    }));
  return navigation.flatMap((item) => (item.label === 'Project' ? [...categoryNavigation, item] : [item]));
}
