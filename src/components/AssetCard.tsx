import React from 'react';
import { Tag } from 'lucide-react';

interface AssetCardProps {
  title: string;
  type: string;
  tags: string[];
  image: string;
}

const AssetCard = ({ title, type, tags, image }: AssetCardProps) => {
  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all cursor-pointer">
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-slate-800 relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-slate-950/80 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded text-slate-300 uppercase tracking-widest border border-slate-700">
            {type}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <h4 className="font-semibold text-slate-100 truncate">{title}</h4>
        
        {/* AI Generated Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="flex items-center gap-1 text-[11px] font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full"
            >
              <Tag size={10} className="text-indigo-400" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetCard;