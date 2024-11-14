import { Suspense } from 'react';
import { Properties } from './properties';
import { Spinner } from '../components/spinner';

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-8">
          <Spinner />
        </div>
      }
    >
      <Properties />
    </Suspense>
  );
}
