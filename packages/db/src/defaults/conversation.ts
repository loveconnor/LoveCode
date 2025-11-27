import type { Conversation as DbConversation } from '@fluxly/db';
import { AgentType } from '@fluxly/models';
import { v4 as uuidv4 } from 'uuid';

export const createDefaultConversation = (projectId: string): DbConversation => {
    return {
        id: uuidv4(),
        projectId,
        createdAt: new Date(),
        updatedAt: new Date(),
        displayName: 'New Conversation',
        suggestions: [],
        agentType: AgentType.ROOT,
    };
};
