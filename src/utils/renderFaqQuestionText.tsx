import { Fragment, type ReactNode } from 'react';
import { CAR_AND_DRIVER_BRAND } from '../constants/dealsLayout';

/**
 * FAQ questions across deals pages italicize the "Car and Driver" brand
 * mention. Each page used to inline this helper with a page-scoped BEM
 * class; here we delegate the class name to the caller so the utility stays
 * page-agnostic.
 */
export function renderFaqQuestionText(question: string, emphasisClassName: string): ReactNode {
  const index = question.indexOf(CAR_AND_DRIVER_BRAND);
  if (index === -1) {
    return question;
  }

  return (
    <Fragment>
      {question.slice(0, index)}
      <em className={emphasisClassName}>{CAR_AND_DRIVER_BRAND}</em>
      {question.slice(index + CAR_AND_DRIVER_BRAND.length)}
    </Fragment>
  );
}
