import React from 'react'
import PrefetchLink from './prefetch-link'
function NavbarLinks({ pathname, url, children }: { pathname: string, url: string, children: React.ReactNode,   onClick?: () => void; }) {
    return (
        <li className={`px-2 py-1 hover:scale-110 transition-transform fade-left  ${pathname === url ? "border-b border-white" : ""}`}>
            <PrefetchLink href={url} >
                {children}
            </PrefetchLink>
        </li>
    )
}

export default NavbarLinks