'use strict';
import * as vscode from 'vscode';
import { getGitCommitInfo, getGitToplevelFolder } from './git_interaction';
import { getHashesAndLines } from './scan_document';

// Helpers for adding code lenses

export class RebaseCodeLensProvider implements vscode.CodeLensProvider {
    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken)
        : vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
        let codeLenses : vscode.CodeLens[] = [];
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
                    console.log(commitInfo);
                    let command : vscode.Command = {
                        title: commitInfo,
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