import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, className }) => {
  return (
    <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between mb-6', className)}>
      <h1 className="text-2xl font-semibold text-foreground mb-2 md:mb-0">{title}</h1>
      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            {breadcrumb.href ? (
              <a href={breadcrumb.href} className="hover:text-primary">
                {breadcrumb.label}
              </a>
            ) : (
              <span>{breadcrumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="h-4 w-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
