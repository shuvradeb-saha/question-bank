# Configure Visual Studio Code

1.  Make sure that you update VSCode regularly.
2.  Install the following extensions:
    * \+ debugger-for-chrome
    * \+ es7-react-js-snippets
    * \+ vscode-eslint
    * \+ prettier-vscode
3.  Now use the following configuration for vscode. You can use user settings or workspace settings as you please :-)

```
{
    "editor.fontFamily": "Fira Code",
    "editor.fontSize": 14,
    "editor.fontLigatures": true,
    "editor.formatOnSave": true,
    "javascript.validate.enable": false,
    "files.autoSave": "onWindowChange"
}
```

This should make you code auto format as soon as you save. The "Fira Code" font is just a nice font to use for coding :-)

## Linter

The code also has eslint enabled via eslint (https://standardjs.com/). So, please take care of the lint errors. There should be absolutely no red squigglies in the code. If there is, it better have some sort of comment on why it has that. We'll eventually enable linting before production build. So, any lint error will fail the production build.
