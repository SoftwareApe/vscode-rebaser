'use strict';
import * as vscode from 'vscode';

// Get the hashes and line indices of the commmits in the given document
export function changeRebaseCommand(editor: vscode.TextEditor, textEdit: vscode.TextEditorEdit, command: string) {
    let regex = /^(\w+) [0-9a-f]{7}/;
    let lines = editor.document.getText().split('\n');
    let selectedLines = getSelectedLines(editor.selections);
    let edits: vscode.Range[] = [];
    for (let idx = 0; idx < lines.length; idx++) {
        if (selectedLines.has(idx)) {
            let match = lines[idx].match(regex);
            if (match !== null && match.index !== undefined) {
                let edit = new vscode.Range(
                    new vscode.Position(idx, 0),
                    new vscode.Position(idx, match[1].length)
                );
                edits.push(edit);
            }
        }
    }
    for (const edit of edits) {
        textEdit.replace(edit, command);
    }
}

// Computes the set of all lines selected
function getSelectedLines(selections: vscode.Range[]) {
    let selectedLines = new Set<number>();
    for (const selection of selections) {
        let start = selection.start.line;
        let end = selection.end.line;
        // reverse selection needs to be considered
        if (end < start) {
            start = selection.end.line;
            end = selection.start.line;
        }
        // don't add last line if selection is 0 char selection. Otherwise the behavior is confusing
        // but if the last line is on the same line as the start, we should still consider the start line changed.
        end = end === start || selection.end.character > 0 ? end + 1 : end;
        for (let idx = start; idx < end; idx++) {
            selectedLines.add(idx);
        }
    }
    return selectedLines;
}
