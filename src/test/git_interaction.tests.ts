import * as assert from 'assert';
import { getGitToplevelFolder } from '../git_interaction';

suite("Git Interaction Tests", function () {
    test("Valid toplevel folder", function() {
        assert.equal("/abc/def/", getGitToplevelFolder("/abc/def/.git/rebase/rebase-todo"));
    });
});