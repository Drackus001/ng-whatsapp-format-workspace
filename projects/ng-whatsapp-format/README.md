# ngWhatsappFormat Angular Pipe

Format WhatsApp-style text in your Angular applications!

This package provides the `NgWhatsappFormatPipe`, a powerful Angular pipe for parsing and rendering WhatsApp-like formatted text (bold, italic, strike, inline code, quotes, and links) as styled HTML.

## Features

- **Bold**, _Italic_, ~Strike-through~, `Inline Code`
- WhatsApp-style > blockquotes
- Recognizes and autolinks URLs and plain domains (`google.com`)
- Injects CSS styles dynamically
- Standalone Angular pipe (Angular 14+ compatible)
- Secure output: only intended for controlled text inputs (trusted sources)

## Installation

```bash
npm install ng-whatsapp-format
```

## Usage

### 1. Import the Pipe

In your Angular module or component:

```typescript
import { NgWhatsappFormatPipe } from "ng-whatsapp-format-pipe";
```

If using the pipe stand-alone (Angular 14+), simply register it in your component:

```typescript
@Component({
  selector: "your-component",
  standalone: true,
  imports: [NgWhatsappFormatPipe],
})
export class YourComponent {}
```

### 2. Use the Pipe in Templates

```html
<div [innerHTML]="yourTextValue | ngWhatsappFormat"></div>
```

> **Tip:** Always bind to `innerHTML` for styled output! Do not use `{{ text | ngWhatsappFormat }}`.

## Supported Formats

| WhatsApp Syntax | Renders as         | Example Input   | Output                          |
| --------------- | ------------------ | --------------- | ------------------------------- |
| `*bold*`        | **Bold**           | `*bold*`        | **bold**                        |
| `_italic_`      | _Italic_           | `_italic_`      | _italic_                        |
| `~strike~`      | ~~Strike-through~~ | `~strike~`      | ~~strike~~                      |
| `\`inline\``    | `Inline code`      | `\`code\``      | `code`                          |
| `> quote`       | Blockquote         | `> quoted text` | > quoted text                   |
| `google.com`    | Clickable link     | `google.com`    | [google.com](http://google.com) |

## Example

**TypeScript:**

```typescript
message = "*Bold* _Italic_ ~Strike~ `Code` > Quote google.com";
```

**Template:**

```html
<div [innerHTML]="message | ngWhatsappFormat"></div>
```

**Renders as:**

**Bold** _Italic_ ~~Strike~~ `Code`

> Quote

[google.com](http://google.com)

## Notes

- Styles are injected only once per application run
- Multi-line bullet and numbered lists, and triple backtick monospace are not enabled in this version, but can be enhanced by uncommenting related code in the source

## License

MIT

## Contributing

Contributions are welcome! Please create issues or submit pull requests to help improve this package.

---

_Let me know if you'd like this published on GitHub or NPM with proper structure (e.g., module metadata, package.json, etc.)._
