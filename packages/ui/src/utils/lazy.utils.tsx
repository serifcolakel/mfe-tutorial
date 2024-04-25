import { Loader } from 'lucide-react';
import { ComponentType, Suspense } from 'react';

/**
 * @description A higher-order component that adds suspense to a component
 * @param {ComponentType<P>} WrappedComponent - The component to wrap with suspense
 * @param {NonNullable<React.ReactNode>} fallback - The fallback component to display while the wrapped component is loading
 * @returns The wrapped component with suspense
 */
function withSuspense<P extends object>(
  WrappedComponent: ComponentType<P>,
  fallback?: NonNullable<React.ReactNode>
) {
  function WithSuspense(props: P) {
    return (
      <Suspense
        fallback={
          fallback ?? (
            <div className="flex flex-col items-center justify-center w-full h-screen gap-y-4">
              <Loader className="animate-spin" size="4rem" />
              <span className="text-xl text-center text-primary-500">
                Loading...
              </span>
            </div>
          )
        }
      >
        <WrappedComponent {...props} />
      </Suspense>
    );
  }

  WithSuspense.displayName = `WithSuspense(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithSuspense;
}

export { withSuspense };
