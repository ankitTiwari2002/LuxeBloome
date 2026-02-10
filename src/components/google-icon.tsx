import { cn } from '@/lib/utils';

export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className)}
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Google</title>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l-2.347 2.347C13.96 11.52 13.227 11 12.48 11zM12 4C7.58 4 4 7.58 4 12s3.58 8 8 8c4.42 0 8-3.58 8-8s-3.58-8-8-8z"
      />
    </svg>
  );
}
