'use strict';

// Get the hashes and line indices of the commmits in the given document
export function getHashesAndLines(doc: string): [string, number][] {
    let regex = /^\w+ ([0-9a-f]{7})/;
    const lines = doc.split('\n');
    let hashLines: [string, number][] = [];
    for (let idx = 0; idx < lines.length; idx++) {
        let match = lines[idx].match(regex);

        if (match !== null && match.index !== undefined) {
            hashLines.push([match[1].toString(), idx]);
        }
    }
    return hashLines;
}
