'use client';

import { useState } from 'react';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';

import type { FaqItem } from '@/resources/contact/types';

type FAQProps = {
  heading: string;
  items: FaqItem[];
  id?: string;
};

const FAQ = ({ heading, items, id }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headingId = id ? `${id}-heading` : 'faq-heading';

  return (
    <section
      id={id}
      className="w-full bg-surface-muted/50 px-4 py-12 md:py-16"
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="mb-8 text-center font-inria text-2xl font-bold text-foreground md:text-3xl"
      >
        {heading}
      </h2>
      <div className="mx-auto max-w-3xl space-y-3">
        {items.map((faq, index) => (
          <div
            key={faq.question}
            className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 p-4 text-left font-inria text-base font-semibold text-foreground transition-colors hover:text-primary md:text-lg"
              onClick={() =>
                setOpenIndex((prev) => (prev === index ? null : index))
              }
              aria-expanded={openIndex === index}
            >
              {faq.question}
              <span className="shrink-0">
                {openIndex === index ? (
                  <IoRemoveOutline size={24} className="text-primary" />
                ) : (
                  <IoAddOutline size={24} />
                )}
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-out ${
                openIndex === index
                  ? 'max-h-[min(24rem,80vh)] opacity-100'
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <p className="border-t border-border px-4 pb-4 pt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
