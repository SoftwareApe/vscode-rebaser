// Test the functions for scanning the document

import * as assert from 'assert';
import { getHashesAndLines } from '../../scan_document';

suite("Scan Document Tests", function () {
    test("Find hashes in rebase TODO", function() {
        let doc = `pick 2c4089d remove wrongly placed duplicate dependency
r b316c71 updated release notes
pick c5d827e Added copy to clipboard using clipboardy for summation
pick d7ccec6 bump version and update readme

# Rebase von 9b7803d..9a839ed auf 9b7803d (4 Kommandos)
#
# Befehle:
# p, pick = Commit verwenden
# r, reword = Commit verwenden, aber Commit-Beschreibung bearbeiten
# e, edit = Commit verwenden, aber zum Nachbessern anhalten
# s, squash = Commit verwenden, aber mit vorherigem Commit vereinen
# f, fixup = wie "squash", aber diese Commit-Beschreibung verwerfen
# x, exec = Befehl (Rest der Zeile) mittels Shell ausführen
# d, drop = Commit entfernen
#
# Diese Zeilen können umsortiert werden; Sie werden von oben nach unten
# ausgeführt.
#
# Wenn Sie hier eine Zeile entfernen, wird DIESER COMMIT VERLOREN GEHEN.
#
# Wenn Sie jedoch alles löschen, wird der Rebase abgebrochen.
#
# Leere Commits sind auskommentiert.
`;

        let expected = [
            ["2c4089d", 0],
            ["b316c71", 1],
            ["c5d827e", 2],
            ["d7ccec6", 3],
        ];
        
        let hashLines = getHashesAndLines(doc);
        assert.strictEqual(hashLines.length, expected.length, "Mismatch in number of lines found in document.");
        for (let idx = 0; idx < expected.length; idx++) {
            assert.deepStrictEqual(expected[idx], hashLines[idx], `Mismatched hash or line in line ${idx}.`);
        }
    });
});