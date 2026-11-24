# Brief de opciones · spec 003 (formato `references/design.md` §5)

```
Proyecto: AgroSana — Sitio de AgroSana, planta agroquímica de Zihuatanejo, Guerrero: catálogo de
  productos (fungicidas, fertilizantes, coadyuvantes, bioestimulantes) e información de contacto para
  agricultores de la región (frontend, HTML + CSS + JavaScript sin framework; iconos Font Awesome)
Modo: spec 003-act2-one-page
Objetivo: confianza técnica — que el agricultor sienta que trata con una casa agroquímica seria que
  conoce sus productos y le dice cómo usarlos con seguridad; ver de inmediato qué vende AgroSana y
  cómo contactarla (docs/design/brief.md)
Dirección creativa: seriedad técnica sin adornos; cercanía con el campo sin folclor (verde de marca,
  surco y etiqueta); legible al sol; verde = marca, un solo acento cálido como máximo; fuentes del
  sistema; movimiento sobrio, un único momento protagonista (docs/design/creative-direction.md)
Sistema de diseño: a definir (no hay system.md); marca: verde del sitio actual (#1b7d1b)
Contenido real: hero "Insumos para el campo de la Costa Grande" + texto de act2/index.html;
  Nosotros: Asesoría en campo · Productos de marcas reconocidas · Entrega en la Costa Grande;
  Productos: Frutime (Bioestimulantes), Bio pH (Coadyuvantes), HydroSpeed CaB-Max (Fertilizantes),
  Surfatek (Coadyuvantes), Prozycar (Fungicidas) con sus descripciones y fotos de etiqueta;
  filtro Todos/Fertilizantes/Fungicidas/Coadyuvantes/Bioestimulantes; ventana "Ver detalles";
  Uso seguro: 4 recomendaciones + "Ver más"; Contacto: 755 000 0000, contacto@agrosana.com,
  Zihuatanejo, Guerrero, lunes a sábado 8:00 a 18:00, "Datos de contacto de ejemplo para la
  práctica."; pie con aviso "Lee siempre la etiqueta antes de usar cualquier producto."
Artboards:
  - Opciones A, B y C, claramente distintas entre sí (el usuario pidió 3 con marca fija)
  - Cada una a 360, 768 y 1440 px (design.widths)
  - Estados: vacío (filtro sin productos), foco, deshabilitado, menú abierto, ventana de detalles
  - Movimiento como fotogramas anotados (inicio → medio → final), con versión sin movimiento
Restricciones: WCAG 2.1 AA (contraste ≥ 4.5:1, foco visible, toque ≥ 44 px), sin emojis, solo fuentes
  del sistema, solo modo claro; sin clichés de docs/design/anti-cliches.md ni rasgos de §6
```
