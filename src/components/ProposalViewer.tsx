import React from 'react';

interface ProposalProps {
  clientName: string;
  pitchText: string;
  projects: Array<{
    title: string;
    imageUrl: string;
    description: string;
  }>;
}

/**
 * Dynamic Portfolio Component
 * This is what the client sees when they click the personalized link.
 */
export const ProposalViewer: React.FC<ProposalProps> = ({ clientName, pitchText, projects }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 font-sans">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Proposal for {clientName}</h1>
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <p className="text-lg italic text-gray-700 leading-relaxed">
            "{pitchText}"
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="border rounded-xl overflow-hidden hover:shadow-lg transition">
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
          </div>
        ))}
      </section>

      <footer className="mt-16 text-center">
        <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">
          Accept Proposal & Start Project
        </button>
      </footer>
    </div>
  );
};