// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
    let disposable = vscode.commands.registerCommand('printrDebug.print', function () {
        // setup editor
        const editor = vscode.window.activeTextEditor;
        const document = editor.document;
        let selection = editor.selection;
        let selectedVar = document.getText(selection);
        let lineOfSelectedVar = selection.active.line + 1;

        // check if anything is selected in editor and insert 
        if (selectedVar.length) {
            editor.edit(printEdit => {
                // testing if the selected text line is last in the document, if so, adapt the debug insert construction
                if (lineOfSelectedVar >= document.lineCount  ) {
                    printEdit.insert(
                        new vscode.Position(lineOfSelectedVar, 0),
                            printrConstruct(selectedVar, 0)
                    );
                }
                else {
                    printEdit.insert(
                        new vscode.Position(lineOfSelectedVar, 0),
                            printrConstruct(selectedVar, 1)
                    );
                }
            }).then (() => {
                editor.selection = new vscode.Selection(selection.end, selection.end);
            });
        }
    });
    context.subscriptions.push(disposable);
}

function printrConstruct(selectedVar, params) {
    const printr_insert = "print_r (" + selectedVar + ");";
    const die_insert = "die();";
    if (!params) {
        return `
${printr_insert}
${die_insert}
`
    }
    else {
        return `${printr_insert}
${die_insert}
`
    }
}

exports.activate = activate;

module.exports = {
    activate,
}
