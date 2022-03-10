import Image, { ImageProps } from 'next/image';

export function IzImage(props: ImageProps) {
  const { src, placeholder, ...rest } = props;
  // placeholder={placeholder ?? 'blur'}
  return <Image src={src ?? '/'} {...rest} />;
}
