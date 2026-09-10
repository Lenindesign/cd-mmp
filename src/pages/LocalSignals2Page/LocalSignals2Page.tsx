import React, { useState } from 'react';
import { LocalSignals2 } from '../../components/LocalSignals2';
import { Button } from '../../components/Button';
import { Eye } from 'lucide-react';
import './LocalSignals2Page.css';

export const LocalSignals2Page: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="ls2-page-wrapper">
      {/* Top Prototype bar */}
      <div className="ls2-page-banner">
        <div className="ls2-page-banner__inner">
          <div>
            <span className="ls2-page-banner__tag">Prototype</span>
            <span className="ls2-page-banner__title">Local Signals 2 · Vehicle Market Intelligence</span>
          </div>
          <Button
            variant="outline"
            size="small"
            iconLeft={<Eye size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            Preview Modal Overlay
          </Button>
        </div>
      </div>

      {/* Main Content (Embedded view) */}
      <main className="ls2-page-main">
        <LocalSignals2 isModal={false} />
      </main>

      {/* Modal Dialog View */}
      {isModalOpen && (
        <LocalSignals2
          isModal={true}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default LocalSignals2Page;
