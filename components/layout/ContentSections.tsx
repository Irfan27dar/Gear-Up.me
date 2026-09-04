export interface Section {
  heading: string;
  body: string[];
}

export function ContentSections({ sections }: { sections: Section[] }) {
  return (
    <div className="shell py-12 lg:py-16">
      <div className="mx-auto max-w-prose space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-subhead font-bold text-teal">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-2 text-body leading-relaxed text-slate/85">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
