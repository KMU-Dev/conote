export function getType(mimeType: string) {
    return mimeType.slice(0, mimeType.indexOf('/'));
}

export function getSubtype(mimeType: string) {
    let semicolonIndex: number | undefined = mimeType.indexOf(';');
    semicolonIndex = semicolonIndex === -1 ? undefined : semicolonIndex;
    return mimeType.slice(mimeType.indexOf('/') + 1, semicolonIndex);
}

export function getParamaters(mimeType: string) {
    const semicolonIndex = mimeType.indexOf(';');
    return semicolonIndex === -1 ? undefined : mimeType.slice(semicolonIndex + 1);
}

export function matchMimeType(definition: string, mimeType: string) {
    const definitionType = getType(definition);
    const definitionSubtype = getSubtype(definition);
    const definitionParams = getParamaters(definition);
    const fileType = getType(mimeType);
    const fileSubtype = getSubtype(mimeType);
    const fileParams = getParamaters(mimeType);

    return definitionType === fileType &&
        definitionSubtype === '*' ?
            true : (
                definitionSubtype === fileSubtype &&
                (definitionParams ? definitionParams === fileParams : true)
            );
}

export function classifyAccept(accept: string) {
    const rawAccepts = accept.split(',').map((s) => s.trim());
    const mimeTypes = rawAccepts.filter((s) => s.includes('/'));
    const extensions = rawAccepts.filter((s) => !s.includes('/'));
    return { mimeTypes, extensions };
}

export function matchAccept(accept: string, file: File) {
    const { mimeTypes, extensions } = classifyAccept(accept);
    const split = file.name.split('.');
    const fileExtension = `.${split[split.length - 1]}`;

    if (file.type) {
        let isMimeTypeMatch = false;
        for (const mimeType of mimeTypes) {
            if (matchMimeType(mimeType, file.type)) {
                isMimeTypeMatch = true;
                break;
            }
        }
        
        return isMimeTypeMatch || extensions.includes(fileExtension);
    }

    return extensions.includes(fileExtension);
}

export function humanFileSize(bytes: number, si=false, dp=1) {
    const thresh = si ? 1000 : 1024;
  
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
  
    const units = si 
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;
  
    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  
  
    return bytes.toFixed(dp) + ' ' + units[u];
}
