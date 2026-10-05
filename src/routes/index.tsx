import { createFileRoute } from '@tanstack/react-router';
import { NurseryHomepage } from '@/components/nursery/homepage';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'White Diamond Nursery | Exceptional Plants & Beautiful Spaces' },
    { name: 'description', content: 'Discover exceptional trees, flowering plants, and indoor greenery at White Diamond Nursery. Expert plant care, landscape consultation, and thoughtful garden inspiration.' },
    { property: 'og:title', content: 'White Diamond Nursery | Plants for a More Beautiful Tomorrow' },
    { property: 'og:description', content: 'Exceptional plants. Extraordinary spaces. Explore the thoughtfully selected botanical collection and personal expertise of White Diamond Nursery.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: NurseryHomepage,
});
