import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { ARTICULOS_GARMIN } from "@/lib/correr";
import { GarminArticle } from "@/components/garmin-article";

const articulo = ARTICULOS_GARMIN.find((a) => a.slug === "banda-de-pecho")!;

export const metadata: Metadata = {
  title: articulo.titulo,
  description: articulo.descripcion,
  alternates: { canonical: `${SITE.url}/correr/garmin/banda-de-pecho` },
};

export default function BandaPage() {
  return (
    <GarminArticle articulo={articulo}>
      <p>
        Respuesta corta: si entrenás más o menos en serio, sí. Yo nunca corro sin ella. Si me la
        olvido, vuelvo a casa a buscarla.
      </p>

      <h2>Para qué sirve el sensor de la muñeca y para qué no</h2>
      <p>
        El sensor óptico de la muñeca anda perfecto en el día a día: sueño, pulso en reposo, HRV,
        Body Battery. Y en un trote suave y parejo también se defiende. Me pasó con todos los
        Fenix que tuve: el problema aparece cuando el pulso cambia rápido.
      </p>
      <p>
        En las series y en los cambios de ritmo, la muñeca <strong>llega tarde</strong>. Con frío en las
        manos, peor. Y hay salidas en las que directamente te da datos que no son. Si tus zonas,
        tu umbral y tu carga de entrenamiento se calculan sobre ese pulso, todo lo que viene
        después arrastra el error.
      </p>
      <p>
        Hay dos cosas que sin banda no podés hacer bien: medir tu umbral de lactato real y clavar
        las zonas sin atraso. Las dos son la base de{" "}
        <Link href="/correr/garmin/zonas-por-umbral-de-lactato">configurar las zonas por umbral</Link>.
      </p>

      <h2>Qué banda</h2>
      <p>
        Tuve banda Garmin desde las primeras, y siempre compré Garmin, así que de otras marcas no
        te puedo decir nada más que &ldquo;sé que andan&rdquo;.
      </p>
      <ul>
        <li>
          <strong>HRM-Pro Plus.</strong> La que uso. Parece que la están descontinuando. La compré dos
          veces porque la primera la rompí cambiándole la pila. Funciona bien, pero la pila es su
          punto débil.
        </li>
        <li>
          <strong>HRM 600.</strong> La nueva: se carga por USB (chau pilas), tiene más métricas de carrera
          (cadencia, zancada, oscilación vertical, tiempo de contacto) y el módulo se desacopla de
          la tira elástica, así que la tira va a la lavadora. Si sos nerd de los datos, es esta.
          Lo de que sea más precisa en cinta que la Pro no está claro: las opiniones no muestran
          una ventaja; la diferencia real es la batería recargable y las métricas.
        </li>
        <li>
          <strong>HRM 200.</strong> La básica. Mide el pulso, que es lo que importa, y también tiene el
          módulo desmontable. Si solo querés pulso confiable, alcanza.
        </li>
        <li>
          <strong>HRM-Fit.</strong> La versión pensada para mujeres, que se engancha al top deportivo.
        </li>
      </ul>
      <p>
        Lo del módulo desmontable no es un detalle: llevo dos años con la misma banda y te podés
        imaginar cómo huele si pasás una semana sin lavarla. Con las nuevas la tirás en la lavadora
        y te olvidás.
      </p>

      <h2>Lo que haría si tuviera que comprar hoy</h2>
      <p>
        Compres el reloj que compres, la banda es el accesorio obligatorio. Entre 130 y 170
        dólares según el modelo. Si estás eligiendo también el reloj, mirá{" "}
        <Link href="/correr/garmin/que-garmin-comprar">qué Garmin comprar según cuánto corrés</Link>.
      </p>
    </GarminArticle>
  );
}
