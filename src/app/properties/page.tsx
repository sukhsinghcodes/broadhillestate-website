import { Suspense } from 'react';
import { Properties } from './properties';
import { H2 } from '../components/typography';

export default function PropertiesPage() {
  return (
    <Suspense fallback={<H2>Page failed to load.</H2>}>
      <Properties />
    </Suspense>
  );
}
