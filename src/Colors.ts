export class Colors {

    private static instance: Colors;

    private computedStyle: CSSStyleDeclaration;

    private constructor() {
        this.computedStyle = getComputedStyle(document.documentElement);
    }

    static get(): Colors {
        if (!this.instance) {
            this.instance = new Colors();
        }

        return this.instance;
    }

    getTextColor(): string {
        return this.computedStyle.getPropertyValue('--text');
    }

    getBackgroundColor(): string {
        return this.computedStyle.getPropertyValue('--background');
    }

    getForegroundColor(): string {
        return this.computedStyle.getPropertyValue('--foreground');
    }

    getAccentColor(): string {
        return this.computedStyle.getPropertyValue('--accent');
    }
}
