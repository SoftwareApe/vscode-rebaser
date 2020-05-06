'use strict';
import { execSync } from 'child_process';

// Helpers for interacting with git
// execute (fast) shell command synchronously
function shellCommand(cwd: string, cmd : string) : string | undefined {
    try {
        const output = execSync(cmd, { encoding: 'ascii', cwd: cwd });
        return output.toString();
    } 
    catch (error) {
        console.log("Error: Commit hash not found or git not installed.");
        return undefined;
    }
}

// Get information on a specific git commit
export function getGitCommitInfo(gitToplevel: string, hash: string): string | undefined {
    // Get commiter name and all files affected
    let commitInfo =
        shellCommand(gitToplevel, `git show --pretty=format:'%cn %b' --name-only ${hash}`);
    console.log(commitInfo);
    return commitInfo;
}

// Rebase TODOs are located in the .git folder, we need to execute the commands in the right context
export function getGitToplevelFolder(fsPath: string): string | undefined {
    // Normalize \ -> / if we're on windows
    fsPath = fsPath.replace('\\', '/');

    let gitFolderIndex = fsPath.lastIndexOf('/.git/');
    return gitFolderIndex === -1 ? undefined : fsPath.substring(0, gitFolderIndex);
}