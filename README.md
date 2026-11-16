# Ardoise

A clean, calm theme in dark and light.

> **New in 1.3.0:** Ardoise now supports [Style Settings](#with-style-settings) 🎉

![Downloads](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Freleases.obsidian.md%2Fstats%2Ftheme&query=%24.Ardoise.download&label=downloads&logo=obsidian&logoColor=e2ded6&labelColor=2d343d&color=47515c) ![Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fgeneralentropy%2Fobsidian-ardoise%2Fmain%2Fmanifest.json&query=%24.version&label=version&labelColor=2d343d&color=47515c) ![License](https://img.shields.io/github/license/generalentropy/obsidian-ardoise?labelColor=2d343d&color=47515c) ![Last commit](https://img.shields.io/github/last-commit/generalentropy/obsidian-ardoise?labelColor=2d343d&color=47515c)

![Ardoise in dark and light mode](screenshot.png)

_Ardoise_ is French for slate. In dark mode, chalk-coloured text sits on a blue-grey slate. In light mode, slate-coloured text sits on a pale blue-grey sheet. Ochre is the accent, with touches of blue, sage and rose.

<a href="https://buymeacoffee.com/generalentropy"><img src="assets/buy-me-a-coffee.svg" alt="Buy me a coffee" width="184" height="44"></a>

## Features

- Dark and light modes: easy on the eyes, with high contrast for body text (about 9:1 or more)
- One colour per heading level: ochre, blue, sage
- Pill-shaped tags, quiet tabs and status bar, thin scrollbars
- [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) support: warm background, five accent colours, heading colours and font, line width
- Fonts included:
  - Hanken Grotesk for text and interface
  - Fraunces for headings
  - Geist Mono for code

Ardoise aims for WCAG AA contrast. See [CONTRAST.md](CONTRAST.md) for the details.

## Customisation

Ardoise uses its own accent, so the accent colour in **Settings → Appearance** has no effect. Use one of the two ways below instead.

### With Style Settings

Install the [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin, then open **Settings → Style Settings → Ardoise**.

| Setting | Choices |
| --- | --- |
| Background | Slate (default) or Warm |
| Accent colour | Ochre (default), Blue, Sage, Rose or Lavender |
| Heading colours | Ochre, blue, sage (default), the accent colour, or the text colour |
| Use the text font for headings | Off (Fraunces, default) or on |
| Line width | 560 to 1000 px, 680 by default. Needs **Settings → Editor → Readable line length** |

Every accent colour meets WCAG AA in both modes, on both backgrounds. See [CONTRAST.md](CONTRAST.md).

### With a CSS snippet

Colours are CSS variables near the top of `theme.css`, with one block for each mode: `--bg-page` (note background), `--text` (body text), `--ochre` (accent), `--blue`, `--sage` and `--rose`. You can override them with a CSS snippet:

```css
.theme-dark {
  --ochre: #e0b070;
}
```

To use your body font for headings too:

```css
body {
  --heading-font: var(--font-text);
}
```

Fonts set in **Settings → Appearance → Font** take precedence over the theme's fonts.

## Credits

The bundled fonts are licensed under the SIL Open Font License 1.1. Their license files are in the `fonts` folder.

- [Hanken Grotesk](https://github.com/marcologous/hanken-grotesk), © The Hanken Grotesk Project Authors
- [Fraunces](https://github.com/undercasetype/Fraunces), © The Fraunces Project Authors
- [Geist Mono](https://github.com/vercel/geist-font), © The Geist Project Authors

The alternate checkbox icons come from [Minimal](https://github.com/kepano/obsidian-minimal) by Steph Ango, released under the MIT License.

## License

The theme is released under the [MIT License](LICENSE). The bundled fonts keep their own license (OFL 1.1).
