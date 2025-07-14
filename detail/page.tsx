import AnimeDetails from '@/components/AnimeDetails';
import { getAnimeById } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function AnimeDetailPage({ params }: { params: { id: string } }) {
  try {
    const anime = await getAnimeById(params.id);
    if (!anime) return notFound();

    return <AnimeDetails anime={anime} />;
  } catch (error) {
    return notFound();
  }
}
