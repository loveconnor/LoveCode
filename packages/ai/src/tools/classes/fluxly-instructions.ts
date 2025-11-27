import { Icons } from '@fluxly/ui/icons';
import type { EditorEngine } from '@fluxly/web-client/src/components/store/editor/engine';
import { z } from 'zod';
import { ONLOOK_INSTRUCTIONS } from '../../prompt/constants';
import { ClientTool } from '../models/client';

export class FluxlyInstructionsTool extends ClientTool {
    static readonly toolName = 'fluxly_instructions';
    static readonly description = 'Get Fluxly-specific instructions and guidelines';
    static readonly parameters = z.object({});
    static readonly icon = Icons.FluxlyLogo;

    async handle(_input: z.infer<typeof FluxlyInstructionsTool.parameters>, _editorEngine: EditorEngine): Promise<string> {
        return ONLOOK_INSTRUCTIONS;
    }

    static getLabel(input?: z.infer<typeof FluxlyInstructionsTool.parameters>): string {
        return 'Reading Fluxly instructions';
    }
}