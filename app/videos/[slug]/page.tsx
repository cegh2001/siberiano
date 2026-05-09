import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getVideoBySlug, videos } from '@/app/data/videos';
import VideoDetailClient from './VideoDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) return { title: 'Video no encontrado' };

  return {
    title: video.fullTitle,
    description: `${video.fullTitle} — ${video.date}`,
    openGraph: {
      title: video.fullTitle,
      description: `${video.fullTitle} — ${video.date}`,
      images: video.youtubeThumbnail ? [video.youtubeThumbnail] : [],
    },
  };
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) notFound();

  return <VideoDetailClient video={video} />;
}
