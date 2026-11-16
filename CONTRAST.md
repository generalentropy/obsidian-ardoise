# Contrast

Contrast ratios of the colours Ardoise uses, measured with the [WCAG 2](https://www.w3.org/TR/WCAG22/#contrast-minimum) formula. Ardoise aims for level AA:

- 4.5:1 for text
- 3:1 for large text (24px and up) and for icons, borders and controls

Translucent colours (tag pills, highlights, callout backgrounds, links to missing notes) are measured as they appear, laid over the note background.

This file is generated from `theme.css` by `node tools/contrast.mjs`.

## Dark mode

### Note text

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| Body text | `#e2ded6` | `#2d343d` | 9.37:1 | Pass |
| Bold | `#f2efe9` | `#2d343d` | 10.96:1 | Pass |
| Secondary text | `#abb2b9` | `#2d343d` | 5.87:1 | Pass |
| Faint text (h6, list markers, done tasks) | `#78828c` | `#2d343d` | 3.22:1 | **Below** (4.5:1) |
| Blockquote | `#abb2b9` | `#2d343d` | 5.87:1 | Pass |
| Link | `#dbb57c` | `#2d343d` | 6.53:1 | Pass |
| Link to a missing note (60% opacity) | `#958163` | `#2d343d` | 3.37:1 | **Below** (4.5:1) |
| Tag | `#a9c7a1` | `#404a4c` | 4.94:1 | Pass |
| Highlighted text | `#e2ded6` | `#655d51` | 4.82:1 | Pass |

### Headings

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| Heading 1 (about 27px) | `#dcbd8f` | `#2d343d` | 7.02:1 | Pass |
| Heading 2 | `#a7c1de` | `#2d343d` | 6.78:1 | Pass |
| Heading 3 | `#a9c7a1` | `#2d343d` | 6.81:1 | Pass |
| Heading 4 | `#e2ded6` | `#2d343d` | 9.37:1 | Pass |
| Heading 5 | `#abb2b9` | `#2d343d` | 5.87:1 | Pass |
| Heading 6 | `#78828c` | `#2d343d` | 3.22:1 | **Below** (4.5:1) |

### Code

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| Inline code | `#e0aba6` | `#22282f` | 7.47:1 | Pass |
| Code block text | `#d6d1c7` | `#22282f` | 9.77:1 | Pass |
| Comment | `#78828c` | `#22282f` | 3.80:1 | **Below** (4.5:1) |
| String | `#a9c7a1` | `#22282f` | 8.05:1 | Pass |
| Function | `#9db7cf` | `#22282f` | 7.16:1 | Pass |
| Keyword | `#b4a9cf` | `#22282f` | 6.74:1 | Pass |
| Property | `#92c1c0` | `#22282f` | 7.51:1 | Pass |
| Value | `#d9a47e` | `#22282f` | 6.77:1 | Pass |
| Tag | `#d1a3bf` | `#22282f` | 6.87:1 | Pass |
| Important | `#d68c8c` | `#22282f` | 5.66:1 | Pass |
| Operator | `#abb2b9` | `#22282f` | 6.94:1 | Pass |
| Punctuation | `#8a939c` | `#22282f` | 4.77:1 | Pass |

### Callout titles

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| Blue (note, info) | `#9db7cf` | `#38414c` | 4.98:1 | Pass |
| Cyan (tip, abstract) | `#92c1c0` | `#37424a` | 5.19:1 | Pass |
| Green (success) | `#a6bea2` | `#394247` | 5.15:1 | Pass |
| Orange (warning, question) | `#d9a47e` | `#3e3f44` | 4.77:1 | Pass |
| Red (danger, bug) | `#d68c8c` | `#3e3d45` | 4.09:1 | **Below** (4.5:1) |
| Purple (example) | `#b4a9cf` | `#3b404c` | 4.73:1 | Pass |

### Interface

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| File explorer | `#abb2b9` | `#262c33` | 6.58:1 | Pass |
| File explorer, active file | `#e2ded6` | `#353e48` | 8.09:1 | Pass |
| Tab | `#78828c` | `#262c33` | 3.60:1 | **Below** (4.5:1) |
| Active tab | `#e2ded6` | `#2d343d` | 9.37:1 | Pass |
| Status bar | `#78828c` | `#262c33` | 3.60:1 | **Below** (4.5:1) |
| Text on accent (buttons) | `#22282f` | `#dbb57c` | 7.73:1 | Pass |
| Icons | `#abb2b9` | `#262c33` | 6.58:1 | Pass |
| Checkbox border | `#78828c` | `#2d343d` | 3.22:1 | Pass |
| Checked box | `#dbb57c` | `#2d343d` | 6.53:1 | Pass |

### Alternate checkbox icons

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| Yellow (question, star, idea, key) | `#d9c48a` | `#2d343d` | 7.31:1 | Pass |
| Orange (important, cons, bookmark) | `#d9a47e` | `#2d343d` | 5.73:1 | Pass |
| Red (location, fire, down) | `#d68c8c` | `#2d343d` | 4.78:1 | Pass |
| Green (savings, pros, up) | `#a6bea2` | `#2d343d` | 6.29:1 | Pass |
| Purple (win) | `#b4a9cf` | `#2d343d` | 5.70:1 | Pass |
| Faint (cancelled, forwarded, scheduling) | `#78828c` | `#2d343d` | 3.22:1 | Pass |

## Light mode

### Note text

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| Body text | `#2f3740` | `#eef0f2` | 10.56:1 | Pass |
| Bold | `#1d242b` | `#eef0f2` | 13.72:1 | Pass |
| Secondary text | `#5b6672` | `#eef0f2` | 5.12:1 | Pass |
| Faint text (h6, list markers, done tasks) | `#7b8590` | `#eef0f2` | 3.28:1 | **Below** (4.5:1) |
| Blockquote | `#5b6672` | `#eef0f2` | 5.12:1 | Pass |
| Link | `#8c5f1f` | `#eef0f2` | 4.87:1 | Pass |
| Link to a missing note (60% opacity) | `#b39973` | `#eef0f2` | 2.38:1 | **Below** (4.5:1) |
| Tag | `#4c7246` | `#dbe3dd` | 4.20:1 | **Below** (4.5:1) |
| Highlighted text | `#2f3740` | `#e1d2bb` | 8.11:1 | Pass |

### Headings

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| Heading 1 (about 27px) | `#946a2e` | `#eef0f2` | 4.22:1 | Pass |
| Heading 2 | `#3f6690` | `#eef0f2` | 5.23:1 | Pass |
| Heading 3 | `#4c7246` | `#eef0f2` | 4.83:1 | Pass |
| Heading 4 | `#2f3740` | `#eef0f2` | 10.56:1 | Pass |
| Heading 5 | `#5b6672` | `#eef0f2` | 5.12:1 | Pass |
| Heading 6 | `#7b8590` | `#eef0f2` | 3.28:1 | **Below** (4.5:1) |

### Code

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| Inline code | `#974842` | `#dfe4e8` | 4.94:1 | Pass |
| Code block text | `#3a434d` | `#dfe4e8` | 7.85:1 | Pass |
| Comment | `#7b8590` | `#dfe4e8` | 2.93:1 | **Below** (4.5:1) |
| String | `#4c7246` | `#dfe4e8` | 4.31:1 | **Below** (4.5:1) |
| Function | `#3f6690` | `#dfe4e8` | 4.67:1 | Pass |
| Keyword | `#6c5a9c` | `#dfe4e8` | 4.58:1 | Pass |
| Property | `#2f7a78` | `#dfe4e8` | 3.93:1 | **Below** (4.5:1) |
| Value | `#a8602e` | `#dfe4e8` | 3.75:1 | **Below** (4.5:1) |
| Tag | `#9c4f7d` | `#dfe4e8` | 4.28:1 | **Below** (4.5:1) |
| Important | `#b04a4a` | `#dfe4e8` | 4.18:1 | **Below** (4.5:1) |
| Operator | `#5b6672` | `#dfe4e8` | 4.57:1 | Pass |
| Punctuation | `#6f7a85` | `#dfe4e8` | 3.42:1 | **Below** (4.5:1) |

### Callout titles

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| Blue (note, info) | `#3f6690` | `#dde2e8` | 4.59:1 | Pass |
| Cyan (tip, abstract) | `#2f7a78` | `#dbe4e6` | 3.90:1 | **Below** (4.5:1) |
| Green (success) | `#4c7246` | `#dee3e1` | 4.26:1 | **Below** (4.5:1) |
| Orange (warning, question) | `#a8602e` | `#e7e2de` | 3.72:1 | **Below** (4.5:1) |
| Red (danger, bug) | `#b04a4a` | `#e8dfe1` | 4.11:1 | **Below** (4.5:1) |
| Purple (example) | `#6c5a9c` | `#e1e1e9` | 4.51:1 | Pass |

### Interface

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| File explorer | `#5b6672` | `#e5e9ec` | 4.79:1 | Pass |
| File explorer, active file | `#2f3740` | `#dce2e7` | 9.23:1 | Pass |
| Tab | `#7b8590` | `#e5e9ec` | 3.07:1 | **Below** (4.5:1) |
| Active tab | `#2f3740` | `#eef0f2` | 10.56:1 | Pass |
| Status bar | `#7b8590` | `#e5e9ec` | 3.07:1 | **Below** (4.5:1) |
| Text on accent (buttons) | `#eef0f2` | `#8c5f1f` | 4.87:1 | Pass |
| Icons | `#5b6672` | `#e5e9ec` | 4.79:1 | Pass |
| Checkbox border | `#7b8590` | `#eef0f2` | 3.28:1 | Pass |
| Checked box | `#8c5f1f` | `#eef0f2` | 4.87:1 | Pass |

### Alternate checkbox icons

| Element | Colour | Background | Ratio | AA |
| --- | --- | --- | ---: | --- |
| Yellow (question, star, idea, key) | `#8d7424` | `#eef0f2` | 3.95:1 | Pass |
| Orange (important, cons, bookmark) | `#a8602e` | `#eef0f2` | 4.20:1 | Pass |
| Red (location, fire, down) | `#b04a4a` | `#eef0f2` | 4.68:1 | Pass |
| Green (savings, pros, up) | `#4c7246` | `#eef0f2` | 4.83:1 | Pass |
| Purple (win) | `#6c5a9c` | `#eef0f2` | 5.13:1 | Pass |
| Faint (cancelled, forwarded, scheduling) | `#7b8590` | `#eef0f2` | 3.28:1 | Pass |

## Style Settings options

The options offered in the [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin. The tables above use the defaults: slate background, ochre accent.

### Accent colours

Ratios below 4.5:1 are in bold.

| Accent | Mode | Link | Text on accent | Highlighted text |
| --- | --- | ---: | ---: | ---: |
| Ochre | Dark | 6.53:1 | 7.73:1 | 4.82:1 |
| Ochre | Light | 4.87:1 | 4.87:1 | 8.11:1 |
| Blue | Dark | 6.78:1 | 8.02:1 | 4.70:1 |
| Blue | Light | 5.23:1 | 5.23:1 | 7.61:1 |
| Sage | Dark | 6.81:1 | 8.05:1 | 4.70:1 |
| Sage | Light | 4.83:1 | 4.83:1 | 7.76:1 |
| Rose | Dark | 6.31:1 | 7.47:1 | 4.90:1 |
| Rose | Light | 5.53:1 | 5.53:1 | 7.59:1 |
| Lavender | Dark | 5.70:1 | 6.74:1 | 5.09:1 |
| Lavender | Light | 5.13:1 | 5.13:1 | 7.62:1 |

### Warm background

Every row above, measured again on the warm background: 102 of 126 pass. Rows whose ratio moves by 0.05 or more:

| Element | Mode | Slate | Warm | AA |
| --- | --- | ---: | ---: | --- |
| Bold | Light | 13.72:1 | 13.78:1 | Pass |
| File explorer | Light | 4.79:1 | 4.74:1 | Pass |
| File explorer, active file | Light | 9.23:1 | 9.18:1 | Pass |
| Icons | Light | 4.79:1 | 4.74:1 | Pass |
