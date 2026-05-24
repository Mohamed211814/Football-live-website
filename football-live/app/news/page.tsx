import NewsFeed from '../components/NewsFeed';

export const metadata = {
  title: 'Kooraza - أخبار كرة القدم | Football News',
  description: 'Latest football match results and news from Premier League, La Liga, Serie A, Bundesliga and more.',
};

export default function NewsPage() {
  return (
    <div className="py-5">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        <NewsFeed />
      </div>
    </div>
  );
}
