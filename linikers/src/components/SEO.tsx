import Head from "next/head";
import { useRouter } from "next/router";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
}

const SITE = "https://linikers.cloud";
const DEFAULT_IMG = "/profileImg.jpg";

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMG,
  ogType = "website",
  noindex,
}: SEOProps) {
  const router = useRouter();
  const url = canonical || `${SITE}${router.asPath}`;
  const fullTitle = `${title} | LinikerS`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE}${ogImage}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="LinikerS" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE}${ogImage}`} />

      {/* No index */}
      {noindex && <meta name="robots" content="noindex" />}
    </Head>
  );
}
