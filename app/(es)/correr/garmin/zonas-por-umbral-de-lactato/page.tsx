import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { ARTICULOS_GARMIN } from "@/lib/correr";
import { GarminArticle } from "@/components/garmin-article";

const articulo = ARTICULOS_GARMIN.find((a) => a.slug === "zonas-por-umbral-de-lactato")!;

export const metadata: Metadata = {
  title: articulo.titulo,
  description: articulo.descripcion,
  alternates: { canonical: `${SITE.url}/correr/garmin/zonas-por-umbral-de-lactato` },
};

export default function ZonasUmbralPage() {
  return (
    <GarminArticle articulo={articulo}>
      <p>
        Si tenés 30 segundos: medí tu umbral de lactato con banda de pecho, pasá las zonas
        generales y las de correr a <strong>% of LT</strong> en Garmin Connect, y cambialo también en la
        configuración del reloj. Si tenés diez minutos, seguí leyendo.
      </p>
      <p>
        Antes de tocar nada: si no sabés por qué conviene cambiarlas, está explicado en{" "}
        <Link href="/correr/garmin/zona-2">por qué un trote suave te marca zona 3</Link>.
      </p>

      <h2>Paso 0: medir el umbral</h2>
      <p>
        Lo podés hacer con el test guiado del reloj o con la detección automática: en los
        modelos actuales el reloj lo detecta y lo actualiza solo cuando corrés firme con banda
        de pecho. Sin banda no lo intentes: el sensor óptico no sirve para esto. Una vez hecho,
        tenés tu valor real y dejás de depender del máximo genérico.
      </p>

      <h2>Parte 1: desde una actividad en Garmin Connect</h2>
      <ol>
        <li>
          Abrí Garmin Connect y entrá a una actividad reciente (desde el inicio, en la actividad
          del día). Tocá la actividad para ver el detalle.
        </li>
        <li>
          Andá a la pestaña <strong>Charts</strong> y bajá hasta <strong>Time in Heart Rate Zones</strong>. Tocá el
          botón <strong>?</strong> de la derecha. Ojo: el de arriba, que es el de pulso, no el de abajo,
          que es el de potencia.
        </li>
        <li>
          En la pantalla de ayuda, tocá <strong>HR Zones on Device</strong>. Si entrás en &ldquo;Training with HR
          Zones&rdquo; vas a ver la explicación de fábrica del 50 % al 100 %, que es justo lo que
          querés dejar atrás.
        </li>
        <li>
          En <strong>Customization Options</strong>, tocá <strong>Update HR Zones</strong>.
        </li>
        <li>
          Vas a ver <strong>Based On: % of Max</strong> con las zonas clásicas de 50, 60, 70, 80 y 90 %.
          Tocá <strong>Based On</strong> y cambialo a <strong>% of LT</strong>.
        </li>
        <li>
          <strong>El detalle que casi todos se saltean:</strong> apenas lo pases a % of LT, tocá{" "}
          <strong>Reset</strong>, abajo a la derecha. Eso hace que Garmin recalcule los porcentajes
          reales del umbral (65, 80, 89, 95 y 100 %) en vez de arrastrar los números viejos de
          pulso máximo. Recién ahí, <strong>Save</strong>.
        </li>
        <li>
          <strong>El paso más importante: la pestaña de Correr.</strong> Arriba de todo hay cuatro íconos:
          corazón, corredor, ciclismo, natación. Tocá el corredor, fijate que{" "}
          <strong>Running Zones</strong> esté activado, poné Based On en % of LT, Reset y Save. Cuando
          corrés, el reloj usa estas zonas, no las generales. En mi caso el umbral general figura
          en 169 y el de correr en 164: el que manda en una carrera es el 164.
        </li>
      </ol>
      <p>
        Si preferís ir por el menú en vez de entrar desde una carrera, el camino es más o menos
        este (los nombres cambian según el modelo): <em>More</em> &rarr; <em>Garmin Devices</em> &rarr; tu
        reloj &rarr; <em>User Profile</em> &rarr; <em>Heart Rate &amp; Power Zones</em> &rarr; <em>Heart Rate</em> &rarr;{" "}
        <em>Zones</em> &rarr; <em>Running</em>.
      </p>

      <h2>Parte 2: desde la configuración del reloj</h2>
      <p>
        Este es el paso que me había olvidado en el primer video. Además de la app, el reloj
        tiene su propia configuración de zonas, y si no la revisás puede seguir usando las de
        fábrica aunque hayas hecho toda la Parte 1.
      </p>
      <ol>
        <li>En la pantalla de inicio de Garmin Connect, arriba a la derecha, tocá el ícono de tu reloj.</li>
        <li>En <strong>Settings</strong>, bajá hasta <strong>User Profile</strong>.</li>
        <li>Entrá a <strong>Heart Rate &amp; Power Zones</strong>. De paso ahí ves tu edad fitness.</li>
        <li>Elegí <strong>Heart Rate</strong>, no Power.</li>
        <li>
          Revisá tus valores: pulso máximo, umbral (LTHR) y pulso en reposo. Los míos: 180, 169 y
          51. Tocá <strong>Zones</strong>. Si abajo aparece <strong>Sport Heart Rate</strong> con zonas propias para
          correr, fijate que también estén en % LTHR.
        </li>
        <li>
          <strong>Based On</strong> de fábrica dice <strong>% Max. HR</strong>. Tocalo y elegí <strong>% LTHR</strong>.
        </li>
        <li>
          Listo: las zonas pasan a calcularse sobre tu umbral (53–64, 64–75, 75–85, 85–96 y
          96–107 %). Sincronizá y la app y el reloj quedan hablando el mismo idioma.
        </li>
      </ol>

      <h2>Qué cambió en la práctica</h2>
      <p>
        Con las zonas de fábrica, un trote cómodo a 140 bpm me lo marcaba como zona 3. Hoy es
        zona 2 real: mi zona 2 va de 131 a 145 bpm. En los rodajes suaves tengo una alerta que
        pita si paso los 145. En los días de calidad, le doy con todo.
      </p>
      <p>
        Todo esto con capturas de cada pantalla está en la guía, abajo. Es gratis y llega al mail.
      </p>
    </GarminArticle>
  );
}
