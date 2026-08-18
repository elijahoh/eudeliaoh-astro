import { sanityClient } from 'sanity:client';


export interface CardItem {
  _id: string;
  _type: string;
  title: string;
  category: string;
  slug?: string;
  image: string;
  description?: string;
  tags?: string[];
  pinned?: boolean;
  date?: string;
  readTime?: string;
}

export function formatDate(rawDate?: string): string {
  if (!rawDate) return "2026-08-16";
  return rawDate.split('T')[0];
}

export async function getFeaturedContent(): Promise<CardItem[]> {
  const query = `*[_type in ["portfolio", "post"] && pinned == true] | order(publishedAt desc) {
    _id,
    _type,
    title,
    category,
    "slug": slug.current,
    "image": mainImage.asset->url,
    description,
    tags,
    pinned,
    publishedAt,
    readTime
  }`;

  try {
    const rawItems = await sanityClient.fetch(query, {}, { stega: false });
    return rawItems.map((item: any) => ({
      ...item,
      date: formatDate(item.publishedAt),
    }));
  } catch (error) {
    console.warn("Failed to fetch featured content:", error);
    return [];
  }
}

export async function getRecentContent(limit = 4): Promise<CardItem[]> {
  const query = `*[_type in ["portfolio", "post"]] | order(publishedAt desc)[0...${limit}] {
    _id,
    _type,
    title,
    category,
    "slug": slug.current,
    "image": mainImage.asset->url,
    description,
    tags,
    pinned,
    publishedAt,
    readTime
  }`;

  try {
    const rawItems = await sanityClient.fetch(query, {}, { stega: false });
    return rawItems.map((item: any) => ({
      ...item,
      date: formatDate(item.publishedAt),
    }));
  } catch (error) {
    console.warn("Failed to fetch recent content:", error);
    return [];
  }
}
