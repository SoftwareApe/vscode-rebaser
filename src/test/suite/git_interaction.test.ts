import * as assert from 'assert';
import { createPrinter } from 'typescript';
import { getGitToplevelFolder, extractAuthorAndFiles } from '../../git_interaction';

suite("Git Interaction Tests", function () {
    test("Valid toplevel folder", function() {
        assert.strictEqual("/abc/def", getGitToplevelFolder("/abc/def/.git/rebase/rebase-todo"));
    });
    test("Extract author and files", function() {
        let [author, files] = extractAuthorAndFiles(
            "author with spaces and / and \\ symbols\nsome/file.cpp\rwindows\\separated\\file.hpp\r\nsomething_else.py"
        );
        assert.strictEqual("author with spaces and / and \\ symbols", author);
        let filesExpected = [
            "file.cpp",
            "file.hpp",
            "something_else.py"
        ]
        for (let i = 0; i < filesExpected.length; i++)
        {
            assert.strictEqual(filesExpected[i], files[i]);
        }
    });
});