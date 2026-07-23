# One-command Windows workflow

The ZIP is built with project files at the top level, so it extracts directly into `D:\MayekAma` without creating `D:\MayekAma\MayekAma`.

Use the single command provided by ChatGPT after downloading the ZIP. It will:

1. Stop only by requiring you to press Ctrl+C if an old server is running.
2. Delete `D:\MayekAma`.
3. Recreate `D:\MayekAma`.
4. Extract the new ZIP there.
5. Enter the folder.
6. Install dependencies.
7. Run the website.

If the terminal is already running a dev server, press `Ctrl+C` before using the one command.
