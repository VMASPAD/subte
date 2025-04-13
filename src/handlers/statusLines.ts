import { invoke } from "@tauri-apps/api/core";

function searchTextInHtml(htmlContent: string) {
    const containsDangerClass = htmlContent.includes('text-danger');
    return {
      found: containsDangerClass,
      status: containsDangerClass ? 'text-danger' : 'servicio_normal'
    };
}

export async function lineA() { 
    const a = await invoke('get_htmlsubte', { 
      url: 'https://buenosaires.gob.ar/infraestructura/subte', 
      elementId: 'lineaA' 
    }) as string
    const statusInfo = searchTextInHtml(a)
     
    return {
        html: a,
        status: statusInfo.status
    };
}
export async function lineB() {
     
    const b = await invoke('get_htmlsubte', { 
      url: 'https://buenosaires.gob.ar/infraestructura/subte', 
      elementId: 'lineaB' 
    }) as string
    const statusInfo = searchTextInHtml(b)
     
    return {
        html: b,
        status: statusInfo.status
    };
}
export async function lineC() {
     
    const c = await invoke('get_htmlsubte', { 
      url: 'https://buenosaires.gob.ar/infraestructura/subte', 
      elementId: 'lineaC' 
    })as string
    const statusInfo = searchTextInHtml(c)
     
    return {
        html: c,
        status: statusInfo.status
    };
}
export async function lineD() {
     
    const d = await invoke('get_htmlsubte', { 
      url: 'https://buenosaires.gob.ar/infraestructura/subte', 
      elementId: 'lineaD' 
    })as string
    const statusInfo = searchTextInHtml(d)
     
    return {
        html: d,
        status: statusInfo.status
    };
}
export async function lineE() {
     
    const e = await invoke('get_htmlsubte', { 
      url: 'https://buenosaires.gob.ar/infraestructura/subte', 
      elementId: 'lineaE' 
    })as string
    const statusInfo = searchTextInHtml(e)
     
    return {
        html: e,
        status: statusInfo.status
    };
}
export async function lineH() {
     
    const h = await invoke('get_htmlsubte', { 
      url: 'https://buenosaires.gob.ar/infraestructura/subte', 
      elementId: 'lineaH' 
    })as string
    const statusInfo = searchTextInHtml(h)
     
    return {
        html: h,
        status: statusInfo.status
    };
}
export async function lineP() {
     
    const p = await invoke('get_htmlsubte', { 
      url: 'https://buenosaires.gob.ar/infraestructura/subte', 
      elementId: 'lineaP' 
    })as string
    const statusInfo = searchTextInHtml(p)
     
    return {
        html: p,
        status: statusInfo.status
    };
}