'use strict';
import * as vscode from 'vscode';
import { RebaseCodeLensProvider } from './code_lenses';

const rebaseId = 'git-rebase';
const rebaseSelector: vscode.DocumentSelector = { language: rebaseId };

// Get all visible git rebase editors
// function getRebaseEditors(): vscode.TextEditor[] {
//     return vscode.window.visibleTextEditors.filter(e => e.document.languageId === rebaseId);
// }

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerCodeLensProvider(rebaseSelector, new RebaseCodeLensProvider()));
}

// this method is called when your extension is deactivated
export function deactivate() {
}