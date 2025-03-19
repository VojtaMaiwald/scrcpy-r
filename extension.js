const vscode = require('vscode');

function activate(context) {
	let disposable = vscode.commands.registerCommand('scrcpy-r.start', function () {
		const terminal = vscode.window.createTerminal('Scrcpy Recording');
		terminal.show();
		const now = new Date();
		const formattedDate = now.toLocaleString('cs-CZ', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/[., ]/g, '_').replace(/:/g, '');
		terminal.sendText(`scrcpy -r ${formattedDate}.mp4 && ffmpeg -i ${formattedDate}.mp4 -vf "fps=15,scale=iw/2:-1:flags=lanczos" -gifflags +transdiff -y ${formattedDate}.gif`);
	});

	context.subscriptions.push(disposable);
	// Create a simple webview
	const panel = vscode.window.createWebviewPanel(
		'scrcpyRecording', // Identifies the type of the webview
		'Scrcpy Recording', // Title of the webview
		vscode.ViewColumn.One, // Editor column to display the webview
		{
			enableScripts: true,
			localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
		}
	);
	panel.webview.html = getWebviewContent();
}

function getWebviewContent() {
	return `
        <html>
            <body>
                <h1>Scrcpy Recording</h1>
                <p>Recording in progress...</p>
            </body>
        </html>
    `;
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
