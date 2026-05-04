interface BrandMarkProps {
  className?: string;
}

const brandImageClass = (className: string) => `${className} object-contain`;

export const FCChainNetworkSeal = ({ className = 'w-full h-full' }: BrandMarkProps) => (
  <img
    src="/brand/fc-chain-network-seal.png"
    alt="FC Chain Network Seal"
    className={brandImageClass(className)}
    loading="eager"
  />
);

export const FCCTokenMark = ({ className = 'w-full h-full' }: BrandMarkProps) => (
  <img
    src="/brand/fcc-token-mark-transparent.png"
    alt="FCC Token Mark"
    className={brandImageClass(className)}
    loading="eager"
  />
);

export const FCCTokenNavyOnLight = ({ className = 'w-full h-full' }: BrandMarkProps) => (
  <img
    src="/brand/fcc-token-navy-on-light-transparent.png"
    alt="FCC token mark navy on light variant"
    className={brandImageClass(className)}
    loading="eager"
  />
);

export const FCCTokenMonochrome = ({ className = 'w-full h-full' }: BrandMarkProps) => (
  <img
    src="/brand/fcc-token-monochrome-clean.png"
    alt="FCC token mark monochrome variant"
    className={brandImageClass(className)}
    loading="eager"
  />
);

export const FCATextCrest = ({ className = 'w-full h-full' }: BrandMarkProps) => (
  <img
    src="/brand/fca-authority-crest.png"
    alt="Future Citizen Authority Crest"
    className={brandImageClass(className)}
    loading="eager"
  />
);
