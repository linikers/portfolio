import BsideSeo from "@/components/bside/Seo";
import BsideLanding from "@/components/bside/Landing";

/**
 * /bside — one-page da Bside Digital Studio.
 *
 * Identidade própria (navy + ciano), sem Navbar/Footer do portfólio: o
 * _app.tsx condiciona por rota (`pathname.startsWith("/bside")`) e o
 * lib/conversaoWhatsapp.ts não intercepta os wa.me daqui.
 */
export default function BsidePage() {
  return (
    <>
      <BsideSeo
        title="Bside Digital Studio · Sites e sistemas em Maringá"
        description="Site pronto em até 7 dias, cardápio digital, agendamento online e automação de WhatsApp. Preço na tela e prévia antes de pagar. Atendemos Maringá e região."
        path="/bside"
        ogImage="/bside/og-lp.png"
      />
      <BsideLanding />
    </>
  );
}
