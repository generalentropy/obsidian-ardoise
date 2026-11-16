# Contributing to Ardoise

Thanks for your interest in Ardoise! Bug fixes, fixes for new Obsidian versions, support for plugins, contrast improvements and new Style Settings options are all welcome.

Ardoise aims to stay calm and readable. For a larger visual change, please open an issue first so we can talk about it before you spend time on it.

## Reporting a bug

Before opening an issue, please search the [existing issues](https://github.com/generalentropy/obsidian-ardoise/issues). When you report a bug, include:

- your Obsidian version, and your system (Windows, macOS, Linux, iOS or Android)
- your Ardoise version
- dark or light mode, and the Style Settings options you use, if any
- the steps to reproduce it, and a screenshot
- whether it still happens with your CSS snippets and other plugins turned off

## Working on the theme

1. Fork the repository, then clone it into the themes folder of a test vault. The folder must be called `Ardoise`:

   ```sh
   git clone https://github.com/<your-username>/obsidian-ardoise.git "<vault>/.obsidian/themes/Ardoise"
   ```

2. In Obsidian, choose Ardoise in **Settings → Appearance → Themes**.
3. Edit `theme.css`. Obsidian reloads the theme each time you save.
4. Use the developer tools (`Ctrl+Shift+I`, or `Cmd+Option+I` on macOS) to find the elements and variables you need.

There is no build step: `theme.css` is the source.

## How `theme.css` is organised

1. **Style Settings block**: the options shown in the Style Settings plugin
2. **Dark palette** and **Light palette**: every colour of the theme, one block per mode
3. **Mapping to Obsidian variables**: links the palette to Obsidian's own variables
4. **Typography**, then small rules for specific elements
5. **Style Settings options**: the rules behind each option
6. **Alternate checkboxes**
7. **Embedded fonts**: generated, do not edit by hand (see below)

## Guidelines

- Use the palette variables (`--ochre`, `--text-soft`, `--bg-page`…) rather than hard-coded colours. A new colour belongs in both palettes.
- Check your change in both dark and light mode.
- Keep the existing variable names, such as `--ochre`: users override them in their own snippets.
- Write comments in plain English.
- Keep each pull request to one fix or one feature.
- Do not change the version in `manifest.json`: releases are handled by the maintainer.

### Colours and contrast

Ardoise aims for WCAG AA contrast. If you change a colour, regenerate the contrast report and commit it with your change:

```sh
node tools/contrast.mjs
```

It needs no install and rewrites [`CONTRAST.md`](CONTRAST.md). In your pull request, mention any ratio that drops below its target.

### Style Settings options

- Options are declared in the `@settings` block at the top of `theme.css`. Give each one a `title.fr` and `description.fr` along with the English text.
- Prefix class names with `ardoise-` (for example `ardoise-accent-blue`).
- Without the plugin, the theme must look exactly as it does by default. The default choice of an option should need no CSS rule.
- `node tools/contrast.mjs` also measures the accent colours, backgrounds and higher contrast option offered in Style Settings. With **Higher contrast** on, every row must pass.

### Fonts

The fonts are embedded at the bottom of `theme.css`. To change them, edit the files in [`fonts`](fonts), then run:

```sh
npm install --prefix tools
node tools/build-fonts.mjs
```

Bundled fonts must use a license that allows it, such as the SIL Open Font License. Add the license file to the `fonts` folder.

## Commit messages

Start with a short prefix: `feat:`, `fix:`, `docs:`, `refactor:` or `chore:`. For example: `fix(canvas): readable group labels in dark mode`.

## License

By contributing, you agree that your contribution is released under the [MIT License](LICENSE), like the rest of the theme.
