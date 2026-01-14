"use client";

import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { LayoutStyles, GenerativeCoordinator } from './LayoutEngine';

interface Asset {
  id: string;
  url: string;
  title: string;
  tags: string[];
}

interface PortfolioCanvasProps {
  assets: Asset[];
  styleAesthetic: string; // From AI Analysis
  matchingScore: number;
}

const PortfolioCanvas: React.FC<PortfolioCanvasProps> = ({ assets, styleAesthetic, matchingScore }) => {
  const renderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let items: any[] = [];
      let images: p5.Image[] = [];
      let coordinator: GenerativeCoordinator;

      p.preload = () => {
        // Preload matched assets
        assets.forEach((asset) => {
          images.push(p.loadImage(asset.url));
        });
      };

      p.setup = () => {
        const canvas = p.createCanvas(renderRef.current?.offsetWidth || 800, 2000);
        canvas.parent(renderRef.current!);
        
        coordinator = new GenerativeCoordinator(p.width, p.height, styleAesthetic as any);
        items = coordinator.calculateLayout(assets);
      };

      p.draw = () => {
        p.clear(0,0,0,0);
        
        // Draw Generative Background based on match score
        drawGenerativeBackground(p, matchingScore);

        items.forEach((item, index) => {
          p.push();
          p.translate(item.x, item.y);
          p.rotate(item.rotation || 0);
          
          // Hover effect logic
          let d = p.dist(p.mouseX, p.mouseY, item.x + item.w/2, item.y + item.h/2);
          let scale = d < 200 ? p.lerp(1, 1.05, 0.1) : 1;

          // Render Asset
          p.noStroke();
          if (styleAesthetic === LayoutStyles.BRUTALIST) {
            p.fill(0);
            p.rect(5, 5, item.w * scale, (item.w * 0.7) * scale); // Drop shadow
          }
          
          p.image(images[index], 0, 0, item.w * scale, (item.w * 0.7) * scale);
          
          // Labels
          p.fill(styleAesthetic === LayoutStyles.BRUTALIST ? '#ff0000' : '#333');
          p.textFont('Inter');
          p.textSize(16);
          p.text(item.title.toUpperCase(), 0, (item.w * 0.7) * scale + 25);
          
          p.pop();
        });
      };

      const drawGenerativeBackground = (p: p5, score: number) => {
        p.noFill();
        p.stroke(0, 0, 0, 20);
        // More geometric complexity if the match score is higher
        for (let i = 0; i < score * 10; i++) {
          p.ellipse(p.width/2, p.height/2, i * 50, i * 50);
        }
      };
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, [assets, styleAesthetic, matchingScore]);

  return (
    <div className="relative w-full min-h-screen bg-gray-50 overflow-hidden">
      <div className="absolute top-10 left-10 z-10">
        <h1 className="text-4xl font-black mix-blend-difference">
          PROJECT OVERLORD // {styleAesthetic.toUpperCase()}
        </h1>
        <p className="text-sm font-mono mt-2 bg-black text-white p-1 inline-block">
          AI MATCH CONFIDENCE: {(matchingScore * 100).toFixed(2)}%
        </p>
      </div>
      <div ref={renderRef} className="w-full h-full" />
    </div>
  );
};

export default PortfolioCanvas;