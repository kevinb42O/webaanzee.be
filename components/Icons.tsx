import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

const cx = (base: string, extra?: string) => (extra ? `${base} ${extra}` : base);

export const IconCheck = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={cx('w-5 h-5', className)} {...props}>
    <path d="M5 12.5l4 4.5L19 6" />
  </svg>
);

export const IconTimesCircle = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={cx('w-5 h-5', className)} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 9l6 6M15 9l-6 6" />
  </svg>
);

export const IconPhone = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cx('w-5 h-5', className)} {...props}>
    <path d="M6.8 3h2.4c.3 0 .6.2.6.5l.5 3.1a.7.7 0 01-.2.6l-1.6 1.6a12 12 0 005.7 5.7l1.6-1.6a.7.7 0 01.6-.2l3.1.5c.3 0 .5.3.5.6v2.4c0 .3-.2.6-.5.7-1 .3-2 .5-3.2.5A15.7 15.7 0 014 6.8c0-1.1.2-2.2.5-3.2.1-.3.4-.5.7-.5z" />
  </svg>
);

export const IconMail = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cx('w-5 h-5', className)} {...props}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
    <path d="M4.5 7l7.5 5 7.5-5" />
  </svg>
);

export const IconWhatsapp = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" className={cx('w-6 h-6', className)} {...props}>
    <path d="M12.04 2a9.9 9.9 0 00-8.6 14.7L2 22l5.5-1.4A9.95 9.95 0 1012.04 2zm0 1.7a8.2 8.2 0 110 16.4 8.1 8.1 0 01-4-.9l-.3-.1-3.2.8.8-3.1-.2-.3a8.2 8.2 0 016.9-12.8z" />
    <path d="M9.1 8.6c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.3 1 2.5.2.3 1.8 2.9 4.5 3.9 2.2.8 2.7.7 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2 0-.1-.1-.2-.2-.2h-.6c-.2 0-.4.1-.6.2l-.2.3c-.2.3-.4.5-.5.6-.1.1-.3.1-.5 0h-.3c-.2 0-.5-.1-1-.3-.6-.2-1.7-.8-2.4-1.7-.3-.4-.5-.7-.6-.9-.1-.2 0-.3.1-.5l.2-.2.1-.3c.1-.1 0-.2 0-.3l-.6-1.5c-.1-.1-.1-.2-.3-.2h-.3z" />
  </svg>
);

export const IconCamera = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cx('w-6 h-6', className)} {...props}>
    <rect x="3.5" y="6.5" width="17" height="13" rx="2" />
    <path d="M9 6.5l1-2h4l1 2" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

export const IconPencil = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cx('w-6 h-6', className)} {...props}>
    <path d="M4 16.5V20h3.5L19 8.5 15.5 5 4 16.5z" />
    <path d="M13 6l4 4" />
  </svg>
);

export const IconMobile = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cx('w-6 h-6', className)} {...props}>
    <rect x="7" y="3" width="10" height="18" rx="2" />
    <path d="M10 18h4" />
  </svg>
);

export const IconPlus = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={cx('w-5 h-5', className)} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconQuote = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={cx('w-7 h-7', className)} {...props}>
    <path d="M10 7H7a3 3 0 00-3 3v4a3 3 0 003 3h1v-4H7v-2h3V7z" />
    <path d="M20 7h-3a3 3 0 00-3 3v4a3 3 0 003 3h1v-4h-1v-2h3V7z" />
  </svg>
);

export const IconInstagram = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={cx('w-5 h-5', className)} {...props}>
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
  </svg>
);

export const IconFacebook = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" className={cx('w-5 h-5', className)} {...props}>
    <path d="M13.5 9.5H16l.4-3h-2.9V5.4c0-.8.4-1.4 1.6-1.4H16V1.3C15.3 1.2 14.4 1 13.3 1 10.8 1 9 2.6 9 5.1v1.4H6.5v3H9V22h3.5z" />
  </svg>
);

export const IconLinkedIn = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={cx('w-5 h-5', className)} {...props}>
    <path d="M6.5 9h-3v11h3V9z" />
    <circle cx="5" cy="5" r="1.7" />
    <path d="M10 20h3v-6.3c0-1.2.9-2.2 2.1-2.2 1.1 0 1.9.8 1.9 2.2V20h3v-7.1C20 10 18.6 8.5 16.3 8.5c-1.6 0-2.6.8-3.2 1.6V9h-3v11z" />
  </svg>
);

export const IconTrendUp = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={18}
    height={18}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cx('w-4 h-4', className)}
    {...props}
  >
    <path d="M4 17l6-6 4 4 6-8" />
    <path d="M14 7h6v6" />
  </svg>
);

export const IconStar = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={20}
    height={20}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cx('w-5 h-5', className)}
    {...props}
  >
    <path d="M12 3.5l2.3 4.7 5.2.8-3.8 3.8.9 5.3L12 15.8l-4.6 2.3.9-5.3-3.8-3.8 5.2-.8z" />
  </svg>
);

export const IconLocation = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={20}
    height={20}
    fill="currentColor"
    stroke="none"
    className={cx('w-5 h-5', className)}
    {...props}
  >
    <path d="M12 3.5a6 6 0 00-6 6c0 3.7 3.6 7.6 5.3 9.3.4.4 1 .4 1.4 0C14.4 17 18 13.2 18 9.5a6 6 0 00-6-6z" />
    <circle cx="12" cy="9.5" r="2.2" />
  </svg>
);

export const IconShield = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={20}
    height={20}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cx('w-5 h-5', className)}
    {...props}
  >
    <path d="M12 3L4 7v5c0 4.5 3.4 8.6 8 9.5 4.6-.9 8-5 8-9.5V7l-8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const StarRating: React.FC<{ rating: number; size?: string; activeColor?: string }> = ({
  rating,
  size = 'w-4 h-4',
  activeColor = 'text-amber-400',
}) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={`star-${i}`}
        className={`${size} ${i < rating ? activeColor : 'text-white/20'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);