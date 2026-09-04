import { BadgeCheck, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Rating } from '@/components/ui/Rating';
import { Reveal } from '@/components/ui/Reveal';
import { reviews } from '@/data/reviews';

export function ReviewCarousel() {
  return (
    <section className="shell py-16 lg:py-20">
      <SectionHeading
        eyebrow="Customer stories"
        title="Rated by real UAE buyers"
        description="Genuine gear, honest advice and delivery people actually talk about."
        align="center"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review, i) => (
          <Reveal key={review.id} as="article" delay={i * 70}>
            <figure className="flex h-full flex-col rounded-btn border border-cloud bg-white p-6 shadow-card">
              <Quote size={24} className="text-green" aria-hidden />
              <Rating value={review.rating} className="mt-3" />
              <blockquote className="mt-3 flex-1 text-caption leading-relaxed text-slate">
                {review.body}
              </blockquote>
              <figcaption className="mt-4 border-t border-cloud pt-4">
                <p className="text-body font-bold text-ink">{review.authorName}</p>
                <div className="mt-1 flex items-center gap-1.5 text-caption text-steel">
                  {review.location && <span>{review.location}</span>}
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-green-700">
                      <BadgeCheck size={13} /> Verified
                    </span>
                  )}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
