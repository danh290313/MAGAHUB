import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
interface Props {
  href: string;
  as?: string;
  children: ReactNode;
  className?: string;
}
export default function MyLink({ children, ...props }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;
  const [fetched, setFetched] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (isVisible && !fetched) {
      router.prefetch(props.href);
    }
    setFetched(true);
  }, [isVisible]);
  return (
    <Link {...props} ref={ref} onMouseOver={(e) => router.prefetch(props.href)}>
      {children}
    </Link>
  );
}
