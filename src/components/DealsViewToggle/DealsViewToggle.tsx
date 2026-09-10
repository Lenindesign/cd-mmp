import { Grid3X3, List } from 'lucide-react';

export type DealsViewMode = 'grid' | 'list';

interface DealsViewToggleProps {
  value: DealsViewMode;
  onChange: (value: DealsViewMode) => void;
}

const DealsViewToggle = ({ value, onChange }: DealsViewToggleProps) => (
  <div className="deals-view-toggle" role="group" aria-label="Results view">
    <button
      type="button"
      className={`deals-view-toggle__button ${value === 'grid' ? 'deals-view-toggle__button--active' : ''}`}
      onClick={() => onChange('grid')}
      aria-pressed={value === 'grid'}
      aria-label="Grid view"
    >
      <Grid3X3 size={16} aria-hidden="true" />
      <span>Grid</span>
    </button>
    <button
      type="button"
      className={`deals-view-toggle__button ${value === 'list' ? 'deals-view-toggle__button--active' : ''}`}
      onClick={() => onChange('list')}
      aria-pressed={value === 'list'}
      aria-label="List view"
    >
      <List size={17} aria-hidden="true" />
      <span>List</span>
    </button>
  </div>
);

export default DealsViewToggle;
