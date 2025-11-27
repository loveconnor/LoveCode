'use client';

import { AdvancedTypography } from '../text-inputs/advanced-typography';
import { FontFamilySelector } from '../text-inputs/font/font-family-selector';
import { FontSizeSelector } from '../text-inputs/font/font-size';
import { FontWeightSelector } from '../text-inputs/font/font-weight';
import { TextAlignSelector } from '../text-inputs/text-align';
import { TextColor } from '../text-inputs/text-color';
import { Border } from '../dropdowns/border';
import { BorderColor } from '../dropdowns/border-color';
import { ColorBackground } from '../dropdowns/color-background';
import { Display } from '../dropdowns/display';
import { Height } from '../dropdowns/height';
import { Margin } from '../dropdowns/margin';
import { Opacity } from '../dropdowns/opacity';
import { Padding } from '../dropdowns/padding';
import { Radius } from '../dropdowns/radius';
import { Width } from '../dropdowns/width';

export const TextPanel = () => {
    return (
        <div className="flex flex-col gap-6 w-full [&_button]:min-w-0 [&_button]:w-full [&_button:has(input[type=number])]:gap-2 [&_button_input[type=number]]:!w-auto [&_button_input[type=number]]:!min-w-[3.5rem]">
            <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-foreground-primary uppercase tracking-wide px-1">Font</h3>
                <div className="flex flex-col gap-2">
                    <FontFamilySelector />
                    <div className="grid grid-cols-2 gap-2">
                        <FontWeightSelector />
                        <FontSizeSelector />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-foreground-primary uppercase tracking-wide px-1">Typography</h3>
                <div className="flex flex-col gap-2">
                    <TextColor />
                    <div className="grid grid-cols-2 gap-2">
                        <TextAlignSelector />
                        <AdvancedTypography />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-foreground-primary uppercase tracking-wide px-1">Background</h3>
                <div className="grid grid-cols-2 gap-2">
                    <ColorBackground />
                    <Opacity />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-foreground-primary uppercase tracking-wide px-1">Border</h3>
                <div className="grid grid-cols-3 gap-2">
                    <Border />
                    <BorderColor />
                    <Radius />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-foreground-primary uppercase tracking-wide px-1">Spacing</h3>
                <div className="grid grid-cols-2 gap-2">
                    <Padding />
                    <Margin />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-foreground-primary uppercase tracking-wide px-1">Layout</h3>
                <div className="flex flex-col gap-2">
                    <Display />
                    <div className="grid grid-cols-2 gap-2">
                        <Width />
                        <Height />
                    </div>
                </div>
            </div>
        </div>
    );
};
