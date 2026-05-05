interface BrandMarkProps {
  className?: string;
}

const brandImageClass = (className: string) => `${className} object-contain`;

export const FCChainNetworkSeal = ({ className = 'w-full h-full' }: BrandMarkProps) => (
  <img
    src="/products/future_citizen_chain_logo_2_1774103158185.png"
    alt="FC Chain Network Seal"
    className={brandImageClass(className)}
    loading="eager"
    decoding="async"
  />
);

export const FCCTokenMark = ({ className = 'w-full h-full' }: BrandMarkProps) => (
  <img
    src="/fcc_token_asset.webp"
    alt="FCC Token Mark"
    className={brandImageClass(className)}
    loading="eager"
    decoding="async"
  />
);

export const FCCTokenNavyOnLight = ({ className = 'w-full h-full' }: BrandMarkProps) => (
  <img
    src="/fcc_token_asset.webp"
    alt="FCC token mark navy on light variant"
    className={brandImageClass(className)}
    loading="eager"
    decoding="async"
  />
);

export const FCCTokenMonochrome = ({ className = 'w-full h-full' }: BrandMarkProps) => (
  <img
    src="/fcc_token_asset.webp"
    alt="FCC token mark monochrome variant"
    className={brandImageClass(className)}
    loading="eager"
    decoding="async"
  />
);

export const FCATextCrest = ({ className = 'w-full h-full' }: BrandMarkProps) => (
  <img
    src="/hero-logo.webp"
    alt="Future Citizen Authority Crest"
    className={brandImageClass(className)}
    loading="eager"
    decoding="async"
  />
);
