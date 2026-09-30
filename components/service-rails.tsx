"use client";

import { Children, cloneElement, isValidElement, useState, type ComponentProps, type ReactNode } from "react";

type RailProps = ComponentProps<"li"> & { "data-open"?: "" };

/**
 * Ricorda l'ultima card dei servizi su cui è passato il mouse, il dito o il
 * focus, così uscendo dalla lista resta aperta quella invece di tornare alla
 * prima. Su touch è il tocco (`onClick`) ad aprire la barra.
 * L'apertura durante l'hover resta CSS (vedi `.svc-rails` in globals.css):
 * qui si tiene solo lo stato "a riposo", marcato con `data-open`.
 *
 * I `<li>` arrivano già renderizzati dal Server Component: qui si aggiungono
 * solo attributo e handler. Senza JS resta `data-open` sul primo, dal render
 * lato server.
 */
export default function ServiceRails({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(0);

    return (
        <ul className="svc-rails grid grid-cols-1 gap-3">
            {Children.map(children, (child, index) =>
                isValidElement<RailProps>(child)
                    ? cloneElement(child, {
                          "data-open": index === open ? "" : undefined,
                          onPointerEnter: () => setOpen(index),
                          onClick: () => setOpen(index),
                          onFocus: () => setOpen(index),
                      })
                    : child,
            )}
        </ul>
    );
}
