'use strict';
import * as vscode from 'vscode';
import { getGitCommitInfo, getGitToplevelFolder } from './git_interaction';
import { getHashesAndLines } from './scan_document';

// Helpers for adding code lenses

export class RebaseCodeLensProvider implements vscode.CodeLensProvider {
    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken)
        : vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
        let codeLenses: vscode.CodeLens[] = [];
        let gitToplevel = getGitToplevelFolder(document.uri.fsPath);
        if (gitToplevel !== undefined) {
            let hashLines = getHashesAndLines(document.getText());
            for (const [hash, idx] of hashLines) {
                let range = new vscode.Range(
                    new vscode.Position(idx, 0),
                    new vscode.Position(idx, 1000)
                );

                const commitInfo = getGitCommitInfo(gitToplevel, hash);
                if (commitInfo !== undefined) {
                    let codeLens = new vscode.CodeLens(range);
                    // Process commit info, so that only filenames without paths are present
                    let commitInfoArray = commitInfo.split(/[\s\n\r]/).filter(s => s !== "");
                    let author = commitInfoArray[0];
                    let files = commitInfoArray.slice(1, undefined)
                                .map(file => file.replace(/^.*[\\\/]/, ''))
                                .sort()
                                .join(", ");
                    let commitInfoFiltered = [author, ":", files].join(" ");
                    console.log(commitInfoFiltered);
                    let command: vscode.Command = {
                        title: commitInfoFiltered,
                        arguments: [],
                        command: ""
                    };
                    codeLens.command = command;
                    codeLenses.push(codeLens);
                }
            }
        }

        return codeLenses;
    }

    public resolveCodeLens?(codeLens: vscode.CodeLens, token: vscode.CancellationToken):
        vscode.CodeLens | Thenable<vscode.CodeLens> {
        return codeLens;
    }
}