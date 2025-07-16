import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ngWhatsappFormat',
    standalone: true,
})
export class NgWhatsappFormatPipe implements PipeTransform {

    private styleElement: HTMLStyleElement | null = null;

    constructor() {
        this.injectStyles();
    }

    private injectStyles() {
        if (typeof document !== 'undefined' && !this.styleElement) {
            this.styleElement = document.createElement('style');
            this.styleElement.innerHTML = `
                .whatsapp-bold {
                    font-weight: bold;
                }

                .whatsapp-italic {
                    font-style: italic;
                }

                .whatsapp-strike {
                    text-decoration: line-through;
                }

                .whatsapp-monospace {
                    font-family: monospace;
                    background-color: #f5f5f5;
                    padding: 2px 4px;
                    border-radius: 3px;
                }

                .whatsapp-inline-code {
                    font-family: monospace;
                    background-color: #f5f5f5;
                    padding: 2px 4px;
                    border-radius: 3px;
                }

                .whatsapp-quote {
                    border-left: 4px solid #ccc;
                    padding-left: 10px;
                    margin-left: 5px;
                    color: #555;
                }

                .whatsapp-list {
                    padding-left: 20px;
                    margin: 0;
                }

                .whatsapp-bullet,
                .whatsapp-numbered {
                    list-style-type: none;
                }
            `;
            document.head.appendChild(this.styleElement);
        }
    }

    transform(value: string): string {
        if (!value) {
            return value;
        }

        // Bold text starting and ending with *
        value = value.replace(
            /\*(\S(?:.*?\S)?)\*/g,
            '<span class="whatsapp-bold">$1</span>'
        );

        // Italic text starting and ending with _
        value = value.replace(
            /_(\S(?:.*?\S)?)_/g,
            '<span class="whatsapp-italic">$1</span>'
        );

        // Strike-through text starting and ending with ~
        value = value.replace(
            /~(\S(?:.*?\S)?)~/g,
            '<span class="whatsapp-strike">$1</span>'
        );

        // // Monospace with ``` (triple backticks)
        // value = value.replace(
        //   /```(.+?)```/gs,
        //   '<span class="whatsapp-monospace">$1</span>'
        // );

        // Inline code with ` (single backtick)
        value = value.replace(
            /`(\S(?:.*?\S)?)`/g,
            '<span class="whatsapp-inline-code">$1</span>'
        );

        // Quote with >
        value = value.replace(
            /^> (.+)$/gm,
            '<blockquote class="whatsapp-quote">$1</blockquote>'
        );

        // ✅ Parse URLs, including plain domains like google.com
        value = value.replace(
            /\b((https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([^\s<]*)?)/gi,
            (match, p1) => {
                let url = match;
                if (!/^https?:\/\//i.test(match)) {
                    url = `https://${match}`;
                }
                return `<a href="${url}" target="_blank" rel="noopener noreferrer">${match}</a>`;
            }
        );

        // // Bullet list (using * or -)
        // value = value.replace(
        //   /(^|\n)([*-]) (.+)/g,
        //   '$1<li class="whatsapp-bullet">$3</li>'
        // );
        // value = value.replace(
        //   /(<li(.+)<\/li>)/g,
        //   '<ul class="whatsapp-list">$1</ul>'
        // );

        // // Numbered list
        // value = value.replace(
        //   /(^|\n)(\d+)\. (.+)/g,
        //   '$1<li class="whatsapp-numbered">$2. $3</li>'
        // );
        // value = value.replace(
        //   /(<li(.+)<\/li>)/g,
        //   '<ol class="whatsapp-list">$1</ol>'
        // );

        return value;
    }

}
