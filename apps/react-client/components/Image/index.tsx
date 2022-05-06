import { ImageProps } from 'next/image';
import NextImage from 'next/image';

export default function Image(props: ImageProps) {
  const { src, placeholder, ...rest } = props;
  // placeholder={placeholder ?? 'blur'}
  return <NextImage src={src ?? '/'} {...rest} />;
}
