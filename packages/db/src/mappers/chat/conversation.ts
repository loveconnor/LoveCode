import type { Conversation as DbConversation } from "@fluxly/db";
import { AgentType, type ChatConversation } from "@fluxly/models";

export const fromDbConversation = (conversation: DbConversation): ChatConversation => {
    return {
        ...conversation,
        title: conversation.displayName || null,
        agentType: conversation.agentType || AgentType.ROOT,
        suggestions: conversation.suggestions || [],
    }
}

export const toDbConversation = (conversation: ChatConversation): DbConversation => {
    return {
        ...conversation,
        projectId: conversation.projectId,
        displayName: conversation.title || null,
        agentType: conversation.agentType,
        suggestions: conversation.suggestions || [],
    }
}
