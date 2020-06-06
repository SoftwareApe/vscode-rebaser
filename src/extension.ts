'use strict';
import * as vscode from 'vscode';
import { RebaseCodeLensProvider } from './code_lenses';
import { changeRebaseCommand } from './change_rebase';

const rebaseId = 'git-rebase';
const rebaseSelector: vscode.DocumentSelector = { language: rebaseId };

// Get all visible git rebase editors
// function getRebaseEditors(): vscode.TextEditor[] {
//     return vscode.window.visibleTextEditors.filter(e => e.document.languageId === rebaseId);
// }

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        // Register code lens provider
        vscode.languages.registerCodeLensProvider(rebaseSelector, new RebaseCodeLensProvider()),
        // Register keybinding callback handler
        vscode.commands.registerTextEditorCommand(
            "rebaser.changeRebaseCommand",
            (editor: vscode.TextEditor, textEdit: vscode.TextEditorEdit, args: any) => {
                changeRebaseCommand(editor, textEdit, args.text);
            }
        )
    );
}

// this method is called when your extension is deactivated
export function deactivate() {
}