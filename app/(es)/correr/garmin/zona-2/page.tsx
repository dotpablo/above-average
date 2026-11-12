import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { ARTICULOS_GARMIN } from "@/lib/correr";
import { GarminArticle } from "@/components/garmin-article";

const articulo = ARTICULOS_GARMIN.find((a) => a.slug === "zona-2")!;

export const metadata: Metadata = {
  title: articulo.titulo,
  description: articulo.descripcion,
  alternates: { canonical: `${SITE.url}/correr/garmin/zona-2` },
};

export default function Zona2Page() {
  return (
    <GarminArticle articulo={articulo}>
      <p>
        Si tu Garmin te marca zona 3 o zona 4 en un trote que vos sentís suave, lo más probable
        es que no sea tu estado físico: son las zonas de fábrica.
      </p>

      <h2>De dónde salen las zonas que trae el reloj</h2>
      <p>
        Garmin calcula las zonas de fábrica como porcentaje de tu pulso máximo (<strong>% of Max</strong>).
        Y si nunca lo cambiaste, ese máximo no lo midió nadie: sale de una fórmula genérica,
        <strong> 220 menos tu edad</strong>. A los 46, el reloj asume que tu máximo es 174 y arma cinco
        zonas del 50 % al 100 % de ese número, sin saber nada de cómo estás entrenado.
      </p>
      <p>
        El resultado es que un corredor entrenado, con el corazón acostumbrado a trabajar
        alto, ve zona 3 o zona 4 en salidas que son claramente fáciles. Y el que le hace caso al
        reloj termina frenando en los rodajes o, peor, creyendo que &ldquo;zona 2&rdquo; es caminar.
      </p>

      <h2>Qué cambia cuando las calculás por umbral de lactato</h2>
      <p>
        La alternativa es basar las zonas en el <strong>umbral de lactato</strong> (<strong>% of LT</strong>
        o <strong>% LTHR</strong>): el pulso al que tu cuerpo deja de poder sostener el esfuerzo de forma
        aeróbica. A diferencia del máximo por fórmula, el umbral se mide: el reloj lo detecta
        solo cuando corrés firme con banda de pecho, o lo hacés con el test guiado.
      </p>
      <p>
        Mi caso: con las zonas de fábrica, un trote cómodo a <strong>140 bpm</strong> me lo marcaba como
        zona 3. Con las zonas por umbral, ese mismo trote es <strong>zona 2 real</strong>. Mi zona 2 va de
        131 a 145 bpm, y mi umbral de correr está en 164.
      </p>
      <p>
        Mismo corredor, mismo trote, mismo pulso. Lo único que cambió fue la referencia.
      </p>

      <h2>Cómo lo uso en el día a día</h2>
      <ul>
        <li>
          En los rodajes suaves tengo una alerta que pita si paso el tope de zona 2 (145 bpm).
          En 146 ya piso zona 3. Si pita, bajo el ritmo.
        </li>
        <li>En los días de calidad, le doy con todo. Ahí las zonas no me importan tanto.</li>
        <li>
          Nunca corro sin banda de pecho: el sensor de la muñeca llega tarde en los cambios de
          ritmo y las zonas se calculan sobre datos que no son los de ese momento.
        </li>
      </ul>

      <h2>Un detalle que me costó darme cuenta</h2>
      <p>
        Garmin tiene <strong>dos juegos de zonas</strong>: las generales (ícono del corazón) y las de
        correr (ícono del corredor). Si activás las de correr, son las que usa el reloj cuando
        salís a correr. Yo había cambiado las generales y las de correr seguían como venían de
        fábrica. Tardé bastante en entender por qué los números no me cerraban.
      </p>
      <p>
        El paso a paso completo, en la app y en el reloj, está en{" "}
        <Link href="/correr/garmin/zonas-por-umbral-de-lactato">cómo configurar las zonas por umbral de lactato</Link>.
      </p>
    </GarminArticle>
  );
}
