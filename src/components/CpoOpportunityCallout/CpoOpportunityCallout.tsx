import { BadgeCheck } from 'lucide-react';
import type { CpoAssessment } from '../../utils/cpoEligibility';
import './CpoOpportunityCallout.css';

interface CpoOpportunityCalloutProps {
  assessment: CpoAssessment;
  placement: 'input' | 'results';
}

export function CpoOpportunityCallout({ assessment, placement }: CpoOpportunityCalloutProps) {
  const isPotential = assessment.status === 'potential';

  return (
    <aside className={`cpo-opportunity cpo-opportunity--${placement}`} aria-label="Certified pre-owned opportunity">
      <div className="cpo-opportunity__icon" aria-hidden="true"><BadgeCheck size={22} /></div>
      <div className="cpo-opportunity__content">
        <p className="cpo-opportunity__eyebrow">{isPotential ? 'CPO OPPORTUNITY' : 'CPO ELIGIBILITY CHECK'}</p>
        <h2>{isPotential ? 'Your car may qualify for CPO' : 'Ask about CPO certification'}</h2>
        <p>{assessment.note}</p>
        <p className="cpo-opportunity__action">Certification is completed by a participating dealer for resale. Ask the dealer to evaluate it before you accept an offer; certification does not guarantee a higher trade-in value.</p>
      </div>
    </aside>
  );
}
