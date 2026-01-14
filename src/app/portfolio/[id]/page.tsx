import PortfolioCanvas from '@/components/portfolio/PortfolioCanvas';

// Mock data representing what the AI Backend generates
async function getBespokePortfolio(id: string) {
  return {
    styleAesthetic: 'brutalist', // Determined by Brief Analysis Agent
    matchingScore: 0.94,
    assets: [
      { id: '1', title: 'Neo-Tokyo Branding', url: 'https://placehold.co/600x400/000/fff?text=Asset+1', tags: ['branding', 'dark'] },
      { id: '2', title: 'Cyber-UI Kit', url: 'https://placehold.co/600x400/333/eee?text=Asset+2', tags: ['ui', 'cyber'] },
      { id: '3', title: 'Modular Typeface', url: 'https://placehold.co/600x400/666/fff?text=Asset+3', tags: ['typography'] },
    ]
  };
}

export default async function DynamicPortfolioPage({ params }: { params: { id: string } }) {
  const data = await getBespokePortfolio(params.id);

  return (
    <main className="w-screen h-screen">
      <PortfolioCanvas 
        assets={data.assets} 
        styleAesthetic={data.styleAesthetic}
        matchingScore={data.matchingScore} 
      />
    </main>
  );
}