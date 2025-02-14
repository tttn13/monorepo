import { Suspense } from 'react';
import BookingPageWrapper from '../components/book-wrapper';

export default function BookPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPageWrapper />
    </Suspense>
  );
}