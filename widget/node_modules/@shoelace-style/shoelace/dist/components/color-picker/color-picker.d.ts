import { LitElement } from 'lit';
import '../../components/button-group/button-group';
import '../../components/button/button';
import '../../components/dropdown/dropdown';
import '../../components/icon/icon';
import '../../components/input/input';
import '../../components/visually-hidden/visually-hidden';
import type SlDropdown from '../../components/dropdown/dropdown';
import type SlInput from '../../components/input/input';
export default class SlColorPicker extends LitElement {
    static styles: import("lit").CSSResult;
    input: SlInput;
    previewButton: HTMLButtonElement;
    dropdown: SlDropdown;
    private readonly formSubmitController;
    private isSafeValue;
    private lastValueEmitted;
    private readonly localize;
    private inputValue;
    private hue;
    private saturation;
    private lightness;
    private alpha;
    value: string;
    label: string;
    format: 'hex' | 'rgb' | 'hsl';
    inline: boolean;
    size: 'small' | 'medium' | 'large';
    noFormatToggle: boolean;
    name: string;
    disabled: boolean;
    invalid: boolean;
    hoist: boolean;
    opacity: boolean;
    uppercase: boolean;
    swatches: string[];
    lang: string;
    connectedCallback(): void;
    getFormattedValue(format?: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'): string;
    reportValidity(): boolean | Promise<void>;
    setCustomValidity(message: string): void;
    handleCopy(): void;
    handleFormatToggle(): void;
    handleAlphaDrag(event: Event): void;
    handleHueDrag(event: Event): void;
    handleGridDrag(event: Event): void;
    handleAlphaKeyDown(event: KeyboardEvent): void;
    handleHueKeyDown(event: KeyboardEvent): void;
    handleGridKeyDown(event: KeyboardEvent): void;
    handleInputChange(event: CustomEvent): void;
    handleInputKeyDown(event: KeyboardEvent): void;
    normalizeColorString(colorString: string): string;
    parseColor(colorString: string): {
        hsl: {
            h: number;
            s: number;
            l: number;
            string: string;
        };
        hsla: {
            h: number;
            s: number;
            l: number;
            a: number;
            string: string;
        };
        rgb: {
            r: number;
            g: number;
            b: number;
            string: string;
        };
        rgba: {
            r: number;
            g: number;
            b: number;
            a: number;
            string: string;
        };
        hex: string;
        hexa: string;
    } | null;
    setColor(colorString: string): boolean;
    setLetterCase(string: string): string;
    syncValues(): Promise<void>;
    handleAfterHide(): void;
    handleEyeDropper(): void;
    handleFormatChange(): void;
    handleOpacityChange(): void;
    handleValueChange(oldValue: string | undefined, newValue: string): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-color-picker': SlColorPicker;
    }
}
