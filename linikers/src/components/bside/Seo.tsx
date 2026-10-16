import Head from "next/head";

/**
 * Head próprio da rota /bside.
 *
 * Por quê um componente e não o `components/SEO.tsx` do portfólio: o SEO.tsx
 * força o sufixo "| LinikerS" no título e `og:site_name "LinikerS"`. Na rota
 * Bside a marca pública é só "Bside Digital Studio" (regra dura da direção
 * de arte), então o head é montado à mão, sem sufixo e sem menção ao portfólio.
 *
 * As fontes do Combo A (Orbitron + Manrope + JetBrains Mono) são pedidas aqui:
 * só esta família de rotas (/bside e demos) carrega os arquivos.
 */

const SITE = "https://linikers.cloud";

const FONTES =
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap";

interface BsideSeoProps {
  title: string;
  description: string;
  /** Caminho da rota, ex.: "/bside" (vira canonical e og:url). */
  path: string;
  /** Imagem de preview (og), ex.: "/bside/og-lp.png". */
  ogImage?: string;
  /** Demos usam noindex, follow. A LP fica indexável. */
  noindex?: boolean;
}

export default function BsideSeo({
  title,
  description,
  path,
  ogImage,
  noindex,
}: BsideSeoProps) {
  const url = `${SITE}${path}`;
  const ogUrl = ogImage ? `${SITE}${ogImage}` : undefined;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}

      {/* Identidade da rota: navy da marca e favicon próprio */}
      <meta name="theme-color" content="#0A1628" />
      <link rel="icon" href="/bside/favicon.svg" />

      {/* Open Graph próprio, sem sufixo de marca e sem "LinikerS" */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {ogUrl ? <meta property="og:image" content={ogUrl} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Bside Digital Studio" />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogUrl ? <meta name="twitter:image" content={ogUrl} /> : null}

      {/* Fontes do Combo A (DIRECAO-DE-ARTE-LP.md, seção 2) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href={FONTES} />
    </Head>
  );
}
