import { BadgeCheck } from 'lucide-react';
import type { CpoAssessment } from '../../utils/cpoEligibility';
import './CpoOpportunityCallout.css';

interface CpoOpportunityCalloutProps {
  assessment: CpoAssessment;
  placement: 'input' | 'options' | 'results';
}

export function CpoOpportunityCallout({ assessment, placement }: CpoOpportunityCalloutProps) {
  const isPotential = assessment.status === 'potential';
  const noteSentenceEnd = assessment.note.indexOf('. ');
  const noteLead = noteSentenceEnd >= 0 ? assessment.note.slice(0, noteSentenceEnd + 1) : assessment.note;
  const noteRemainder = noteSentenceEnd >= 0 ? assessment.note.slice(noteSentenceEnd + 1).trim() : '';

  return (
    <aside className={`cpo-opportunity cpo-opportunity--${placement}`} aria-label="Certified pre-owned opportunity">
      <div className="cpo-opportunity__icon" aria-hidden="true"><BadgeCheck size={22} /></div>
      <div className="cpo-opportunity__content">
        <p className="cpo-opportunity__eyebrow">
          {placement === 'options' ? 'CPO NEXT STEP' : isPotential ? 'CPO OPPORTUNITY' : 'CPO ELIGIBILITY CHECK'}
        </p>
        <h2>
          {placement === 'options'
            ? 'A participating dealer can confirm eligibility'
            : isPotential ? 'Your car may qualify for CPO' : 'Ask about CPO certification'}
        </h2>
        {placement === 'input' ? (
          <p className="cpo-opportunity__note">
            <strong>{noteLead}</strong>{noteRemainder ? ` ${noteRemainder}` : ''}
          </p>
        ) : placement === 'options' ? (
          <p className="cpo-opportunity__options-copy">
            {assessment.program === 'CPO review'
              ? 'A dealer can explain its brand’s CPO program and check whether your car could qualify.'
              : `Your car may fit the initial ${assessment.program} screen. The dealer verifies its history and inspects it before certification.`}
          </p>
        ) : (
          <p>{assessment.note}</p>
        )}
        <p className="cpo-opportunity__action">
          {placement === 'options'
            ? 'CPO certification is separate from your trade-in estimate and does not guarantee a higher offer.'
            : 'Certification is completed by a participating dealer for resale. Ask the dealer to evaluate it before you accept an offer; certification does not guarantee a higher trade-in value.'}
        </p>
      </div>
    </aside>
  );
}
