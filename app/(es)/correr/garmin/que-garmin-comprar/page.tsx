import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { ARTICULOS_GARMIN } from "@/lib/correr";
import { GarminArticle } from "@/components/garmin-article";

const articulo = ARTICULOS_GARMIN.find((a) => a.slug === "que-garmin-comprar")!;

export const metadata: Metadata = {
  title: articulo.titulo,
  description: articulo.descripcion,
  alternates: { canonical: `${SITE.url}/correr/garmin/que-garmin-comprar` },
};

export default function QueGarminPage() {
  return (
    <GarminArticle articulo={articulo}>
      <p>
        Me lo preguntaron N veces. Antes de los modelos, tres cosas: el reloj más caro no te va a
        hacer bajar de las 3 horas en maratón; no tiene sentido comprar uno que te quede chico a
        los seis meses si te empezás a tomar esto en serio; y con Garmin pasa algo bueno: cuando
        sale el modelo nuevo, el de la generación anterior hace casi lo mismo por bastante menos
        plata.
      </p>
      <p>
        Dos avisos. El test guiado de umbral de lactato no está en todos los modelos: chequealo
        en la ficha antes de comprar. Y la banda de pecho, siempre (
        <Link href="/correr/garmin/banda-de-pecho">por qué</Link>). Los precios son de referencia, en
        dólares, a octubre de 2026, y cambian seguido.
      </p>

      <h2>1. Para empezar sin tirar la plata (de 0 a tus primeros 10K o 21K)</h2>
      <p>
        <strong>Forerunner 165</strong>, unos USD 249. Pantalla AMOLED, buen GPS, sueño y HRV nocturno. Es
        más básico en métricas de carga de entrenamiento que sus hermanos mayores, pero si
        corrés dos a cuatro veces por semana te sobra reloj. Y no es un reloj de novatos: hay
        gente sub-3 que lo usa. He visto gente correr 30 minutos en 10K con un Casio de los 80.
      </p>

      <h2>2. El punto dulce (maratonistas y corredores estructurados)</h2>
      <p>
        <strong>Forerunner 265</strong> (desde USD 349) contra <strong>Forerunner 570</strong> (USD 549). Acá se destraba
        el ecosistema serio: GPS multibanda, Training Readiness y carga aguda. El 570 es el
        reemplazo: pantalla más brillante, parlante y micrófono. Para correr, el 265 hace
        prácticamente lo mismo, es liviano y se consigue bastante más barato. Es la mejor
        relación precio/calidad de la lista.
      </p>

      <h2>3. Tope de gama liviano con mapas (maratón, trail, triatlón)</h2>
      <p>
        <strong>Forerunner 965</strong> (bajó de precio) contra <strong>Forerunner 970</strong> (USD 749). Todo lo
        anterior, más batería, bisel de titanio y mapas a color en la muñeca, que es clave si
        viajás y salís a correr por ciudades que no conocés. El 970 suma cristal de zafiro y
        linterna LED. El 965 hace casi todo igual por bastante menos.
      </p>

      <h2>4. El tanque (el mío es un Fenix 8)</h2>
      <p>
        <strong>Fenix 8</strong> (bajó de precio) contra <strong>Fenix 9</strong> (desde USD 999) y <strong>9 Pro</strong>{" "}
        (desde USD 1.099). Más robusto que la línea Forerunner, batería de semanas, linterna LED
        (parece una pavada hasta que corrés de noche) y queda bien tanto para un fondo de 30 km
        como para ir a trabajar. El 9 trae pantalla el doble de brillante, 64 GB para mapas y, en
        el Pro, opción satelital inReach. Si lo comprara hoy, igual miraría el 8: en el día a día
        hace casi exactamente lo mismo. Y Garmin dijo que va a seguir actualizando los modelos
        viejos, algo que antes no pasaba.
      </p>

      <h2>5. El accesorio obligatorio, compres lo que compres</h2>
      <p>
        Banda de pecho: HRM-Pro Plus, HRM-Fit, HRM 200 o HRM 600, entre USD 130 y 170. El
        sensor de la muñeca sirve para dormir y para trotes suaves; en las series llega tarde.
        Para medir tu umbral real y clavar las zonas, necesitás banda.
      </p>

      <h2>En una línea</h2>
      <ul>
        <li>Empezás: Forerunner 165.</li>
        <li>Corrés en serio y querés gastar bien: Forerunner 265.</li>
        <li>Querés mapas y batería: Forerunner 965.</li>
        <li>Querés uno para años y para todo: Fenix 8.</li>
        <li>En todos los casos: banda.</li>
      </ul>
      <p>
        Los links de compra, con los precios actualizados, están en la guía de abajo. Son links de
        afiliado de Amazon: si comprás por ahí me llevo una comisión chica y a vos no te cuesta más.
      </p>
    </GarminArticle>
  );
}
