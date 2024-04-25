/* eslint-disable max-len */
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';
import * as React from 'react';

import { cn } from '../../lib';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        icon: 'hover:bg-accent hover:text-accent-foreground',
        none: '',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 px-2.5 py-1.5',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  tooltip?: string;
  loading?: boolean;
  loadingContent?: React.ReactNode;
}

function ButtonLoadingIndicator({
  icon,
  className,
  children,
}: {
  icon: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn('flex flex-row gap-x-2 items-center', className)}>
      {icon}
      {children}
    </p>
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      tooltip,
      children,
      loading,
      loadingContent = 'Processing...',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    const canShowTooltip =
      tooltip && tooltip.length > 0 && !asChild && !props.disabled;

    const isDisabled = props.disabled || loading;
    const isIcon = variant === 'icon';

    if (!canShowTooltip) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
          disabled={isDisabled}
        >
          {loading ? (
            <ButtonLoadingIndicator
              icon={<Loader className="w-4 h-4 animate-spin" />}
            >
              {!isIcon && loadingContent}
            </ButtonLoadingIndicator>
          ) : (
            children
          )}
        </Comp>
      );
    }

    return (
      <TooltipProvider key={tooltip}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              {...props}
              disabled={isDisabled}
            >
              {loading ? (
                <ButtonLoadingIndicator
                  icon={<Loader className="w-4 h-4 animate-spin" />}
                >
                  {!isIcon && loadingContent}
                </ButtonLoadingIndicator>
              ) : (
                children
              )}
            </Comp>
          </TooltipTrigger>
          <TooltipContent>
            {tooltip}
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

Button.displayName = 'Button';
ButtonLoadingIndicator.displayName = 'ButtonLoadingIndicator';

export { Button, ButtonLoadingIndicator, buttonVariants };
