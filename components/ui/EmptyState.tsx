import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: { href: string; label: string };
}

export function EmptyState({ icon: Icon = PackageOpen, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-btn border border-dashed border-cloud bg-white px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-cloud text-steel">
        <Icon size={28} />
      </div>
      <div>
        <p className="text-subhead font-bold text-ink">{title}</p>
        {description && <p className="mt-1 max-w-sm text-body text-slate/70">{description}</p>}
      </div>
      {action && (
        <Button href={action.href} variant="green">
          {action.label}
        </Button>
      )}
    </div>
  );
}
