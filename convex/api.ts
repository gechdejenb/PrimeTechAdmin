import { type FunctionReference, anyApi } from "convex/server";
import { type GenericId as Id } from "convex/values";

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
  auth: {
    verifyTelegramWebApp: FunctionReference<
      "mutation",
      "public",
      { initData: string },
      any
    >;
  };
  cbeVerification: {
    verifyCbeTransactionAction: FunctionReference<
      "action",
      "public",
      {
        expectedAmount: number;
        expectedReceiverAccountLastDigits: string;
        transactionId: string;
      },
      any
    >;
  };
  cronHandlers: {
    index: {
      manageSessions: FunctionReference<"mutation", "public", any, any>;
      drawNumbers: FunctionReference<"mutation", "public", any, any>;
    };
  };
  telegramBot: {
    handleWebhook: FunctionReference<"action", "public", { update: any }, any>;
    handleBetSelection: FunctionReference<
      "action",
      "public",
      { betAmount: number; chatId: number; userId: string },
      any
    >;
  };
  telebirrVerification: {
    verifyTelebirrTransactionAction: FunctionReference<
      "action",
      "public",
      {
        expectedAmount: string;
        expectedMobileNumber: string;
        telebirrData: {
          creditedPartyNumber: string;
          fetchedAt: number;
          settledAmount: string;
          transactionId: string;
        };
        transactionId: string;
      },
      any
    >;
    verifyTelebirrTransactionAdvanced: FunctionReference<
      "action",
      "public",
      {
        expectedAmount: string;
        expectedMobileNumbers: Array<string>;
        telebirrData: {
          creditedPartyNumber: string;
          fetchedAt: number;
          settledAmount: string;
          transactionId: string;
        };
        transactionId: string;
      },
      any
    >;
  };
  boaVerification: {
    verifyBoaTransactionAction: FunctionReference<
      "action",
      "public",
      {
        expectedAmount: number;
        expectedReceiverAccount: string;
        expectedReceiverName: string;
        transactionReference: string;
      },
      any
    >;
    verifyBoaTransactionActionLegacy: FunctionReference<
      "action",
      "public",
      { expectedAmount: number; transactionReference: string },
      any
    >;
  };
  updateboaVerification: {
    verifyAndUpdateUserBalance: FunctionReference<
      "action",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        transactionId: string;
        userId: string;
      },
      any
    >;
    processBoaDepositWithData: FunctionReference<
      "action",
      "public",
      {
        amount: number;
        bankType: "boa";
        boaData: {
          creditedPartyNumber: string;
          fetchedAt: number;
          settledAmount: string;
          transactionId: string;
        };
        playerId: string;
        transactionId: string;
      },
      any
    >;
    updateUserBalance: FunctionReference<
      "mutation",
      "public",
      {
        amount: number;
        bankType: string;
        transactionId: string;
        userId: string;
      },
      any
    >;
    processEnhancedDeposit: FunctionReference<
      "action",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        playerId: string;
        transactionId: string;
      },
      any
    >;
    adjustUserBalance: FunctionReference<
      "mutation",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        transactionId: string;
        userId: string;
      },
      any
    >;
    createWithdrawalRequest: FunctionReference<
      "mutation",
      "public",
      {
        accountNumber: string;
        amount: number;
        bankType: "cbe" | "boa";
        fullName: string;
        phoneNumber?: string;
        userId: string;
      },
      any
    >;
    saveBankAccount: FunctionReference<
      "mutation",
      "public",
      {
        accountNumber: string;
        bankName: "cbe" | "boa";
        isDefault: boolean;
        name: string;
        phoneNumber?: string;
        userId: string;
      },
      any
    >;
    getUserBankAccounts: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    deleteBankAccount: FunctionReference<
      "mutation",
      "public",
      { accountId: string },
      any
    >;
  };
  game: {
    getOrCreatePlayer: FunctionReference<
      "mutation",
      "public",
      {
        betAmount?: 10 | 20 | 50 | 100;
        name: string;
        sessionId?: Id<"sessions"> | null;
        userId: string;
      },
      any
    >;
    sendTelegramMessage: FunctionReference<
      "action",
      "public",
      { message: string; userId: string },
      any
    >;
    updateUserActivity: FunctionReference<
      "mutation",
      "public",
      { sessionId?: Id<"sessions"> | null; userId: string },
      any
    >;
    updateActiveUsersAgentLevels: FunctionReference<
      "mutation",
      "public",
      { adminUserId?: string; timeThreshold?: number },
      any
    >;
    scheduledAgentLevelUpdate: FunctionReference<
      "mutation",
      "public",
      Record<string, never>,
      any
    >;
    updateAgentLevelOnNewReferral: FunctionReference<
      "mutation",
      "public",
      { newReferralUserId: string; referrerId: string },
      any
    >;
    getUserNotificationHistory: FunctionReference<
      "query",
      "public",
      { limit?: number; userId: string },
      any
    >;
    resetNotificationCooldown: FunctionReference<
      "mutation",
      "public",
      { notificationType?: "new_user" | "user_online"; userId: string },
      any
    >;
    getBatchNotificationStatus: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    resetBatchState: FunctionReference<
      "mutation",
      "public",
      Record<string, never>,
      any
    >;
    getRecentUserActivity: FunctionReference<
      "query",
      "public",
      { limit?: number },
      any
    >;
    getActiveUsersCount: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    testActivityBroadcast: FunctionReference<
      "mutation",
      "public",
      { testUserId: string; testUserName: string },
      any
    >;
    verifyDeductionStatus: FunctionReference<
      "query",
      "public",
      { playerId: Id<"players">; sessionId: Id<"sessions"> },
      any
    >;
    getOrCreateSession: FunctionReference<
      "mutation",
      "public",
      { betAmount: 10 | 20 | 50 | 100 },
      any
    >;
    getAllActiveSessionsForBet: FunctionReference<
      "query",
      "public",
      { betAmount: 10 | 20 | 50 | 100 },
      any
    >;
    getAvailableSessions: FunctionReference<
      "query",
      "public",
      { betAmount: 10 | 20 | 50 | 100 },
      any
    >;
    getPlayerBets: FunctionReference<
      "query",
      "public",
      { playerId: Id<"players">; sessionId: Id<"sessions"> },
      any
    >;
    getPlayerByUserId: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    createPlayer: FunctionReference<
      "mutation",
      "public",
      {
        name: string;
        selectedNumbers: Array<number>;
        sessionId: Id<"sessions">;
        userId: string;
      },
      any
    >;
    registerPlayer: FunctionReference<
      "mutation",
      "public",
      { cardId: number; playerId: Id<"players">; sessionId: Id<"sessions"> },
      any
    >;
    registerCards: FunctionReference<
      "mutation",
      "public",
      {
        cardIds: Array<number>;
        playerId: Id<"players">;
        sessionId: Id<"sessions">;
      },
      any
    >;
    placeBet: FunctionReference<
      "mutation",
      "public",
      {
        amount: 10 | 20 | 50 | 100;
        cardId: number;
        playerId: Id<"players">;
        sessionId: Id<"sessions">;
      },
      any
    >;
    cleanupOldBets: FunctionReference<
      "mutation",
      "public",
      { currentSessionId: Id<"sessions">; playerId: Id<"players"> },
      any
    >;
    listActiveSessions: FunctionReference<
      "query",
      "public",
      { betAmount: 10 | 20 | 50 | 100 },
      any
    >;
    listAvailableSessions: FunctionReference<
      "query",
      "public",
      { betAmount: 10 | 20 | 50 | 100; playerId?: string },
      any
    >;
    createSession: FunctionReference<
      "mutation",
      "public",
      {
        betAmount: 10 | 20 | 50 | 100;
        countdownEnd?: number;
        playerName?: string;
        status?: "waiting" | "active" | "ended";
      },
      any
    >;
    scheduledSessionStart: FunctionReference<
      "mutation",
      "public",
      { betAmount: 10 | 20 | 50 | 100 },
      any
    >;
    getSession: FunctionReference<
      "query",
      "public",
      { sessionId: Id<"sessions"> | null },
      any
    >;
    getSessionCountByBetAmount: FunctionReference<
      "query",
      "public",
      { betAmount: 10 | 20 | 50 | 100 },
      any
    >;
    getAllSessionCountsByBetAmount: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    getSessionDebugInfo: FunctionReference<
      "query",
      "public",
      { sessionId: Id<"sessions"> },
      any
    >;
    getSessionCountdown: FunctionReference<
      "query",
      "public",
      { sessionId: Id<"sessions"> },
      any
    >;
    leaveSession: FunctionReference<
      "mutation",
      "public",
      { playerId: Id<"players">; sessionId: Id<"sessions"> },
      any
    >;
    endSession: FunctionReference<
      "mutation",
      "public",
      { sessionId: Id<"sessions"> },
      any
    >;
    startSession: FunctionReference<
      "mutation",
      "public",
      { sessionId: Id<"sessions"> },
      any
    >;
    drawNumber: FunctionReference<
      "mutation",
      "public",
      { sessionId: Id<"sessions"> },
      any
    >;
    ensureSessionEnded: FunctionReference<
      "mutation",
      "public",
      { sessionId: Id<"sessions"> },
      any
    >;
    validateSessionActive: FunctionReference<
      "query",
      "public",
      { sessionId: Id<"sessions"> },
      any
    >;
    drawNumberPeriodically: FunctionReference<
      "mutation",
      "public",
      { sessionId: Id<"sessions"> },
      any
    >;
    getSessionHealth: FunctionReference<
      "query",
      "public",
      { sessionId: Id<"sessions"> },
      any
    >;
    claimBingo: FunctionReference<
      "mutation",
      "public",
      {
        betId: Id<"bet">;
        cardId: number;
        markedNumbers: Array<number | "FREE">;
        pattern: string;
        playerId: Id<"players">;
        sessionId: Id<"sessions">;
      },
      any
    >;
    notifyWinner: FunctionReference<
      "mutation",
      "public",
      {
        cardId: number;
        coordinates: Array<Array<number>>;
        pattern: string;
        sessionId: string;
        winnerName: string;
      },
      any
    >;
    createNewSession: FunctionReference<
      "mutation",
      "public",
      { betAmount: 10 | 20 | 50 | 100 },
      any
    >;
    createBet: FunctionReference<
      "mutation",
      "public",
      {
        betAmount: number;
        cardId: string;
        playerId: Id<"players">;
        sessionId: Id<"sessions">;
      },
      any
    >;
    insertCards: FunctionReference<
      "mutation",
      "public",
      { cards: Array<{ grid: Array<Array<number | "FREE">>; id: string }> },
      any
    >;
    markNumber: FunctionReference<
      "mutation",
      "public",
      {
        betId: Id<"bet">;
        cardId: number;
        number: number;
        playerId: Id<"players">;
      },
      any
    >;
    getWaitingSession: FunctionReference<
      "query",
      "public",
      { betAmount: 10 | 20 | 50 | 100 },
      any
    >;
    getBets: FunctionReference<
      "query",
      "public",
      { sessionId: Id<"sessions"> },
      any
    >;
    getSessionState: FunctionReference<
      "query",
      "public",
      { limit?: number; sessionId?: Id<"sessions"> | null },
      any
    >;
    cleanupOldSessions: FunctionReference<
      "mutation",
      "public",
      { batchSize?: number; olderThanDays?: number },
      any
    >;
    manualCleanup: FunctionReference<
      "action",
      "public",
      Record<string, never>,
      any
    >;
    checkBalanceDeductionStatus: FunctionReference<
      "query",
      "public",
      { playerId: Id<"players">; sessionId: Id<"sessions"> },
      any
    >;
    deductBalanceForActiveSession: FunctionReference<
      "mutation",
      "public",
      {
        amount: 10 | 20 | 50 | 100;
        playerId: Id<"players">;
        sessionId: Id<"sessions">;
        userId: string;
      },
      any
    >;
    checkBalanceBeforeJoin: FunctionReference<
      "query",
      "public",
      { amount: number; sessionId: Id<"sessions">; userId: string },
      any
    >;
    placeBetsForActiveSession: FunctionReference<
      "mutation",
      "public",
      {
        amount: 10 | 20 | 50 | 100;
        cardIds: Array<number>;
        playerId: Id<"players">;
        sessionId: Id<"sessions">;
      },
      any
    >;
    getUserTransactions: FunctionReference<
      "query",
      "public",
      { userId: Id<"users"> },
      any
    >;
    getUserByTelegramId: FunctionReference<
      "query",
      "public",
      { telegramId: string },
      any
    >;
    getBet: FunctionReference<
      "query",
      "public",
      { betId: Id<"bet">; playerId: Id<"players">; sessionId: Id<"sessions"> },
      any
    >;
    deductUserBalance: FunctionReference<
      "mutation",
      "public",
      {
        amount: number;
        playerId: Id<"players">;
        sessionId: Id<"sessions">;
        userId: string;
      },
      any
    >;
    verifyAndUpdateUserBalance: FunctionReference<
      "action",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        transactionId: string;
        userId: string;
      },
      any
    >;
    processBoaDepositWithData: FunctionReference<
      "action",
      "public",
      {
        amount: number;
        bankType: "boa";
        boaData: {
          creditedPartyNumber: string;
          fetchedAt: number;
          settledAmount: string;
          transactionId: string;
        };
        playerId: string;
        transactionId: string;
      },
      any
    >;
    processTelebirrDepositWithData: FunctionReference<
      "action",
      "public",
      {
        amount: number;
        bankType: "telebirr";
        playerId: string;
        telebirrData: {
          creditedPartyNumber: string;
          fetchedAt: number;
          settledAmount: string;
          transactionId: string;
        };
        transactionId: string;
      },
      any
    >;
    updateUserBalance: FunctionReference<
      "mutation",
      "public",
      {
        amount: number;
        bankType: string;
        transactionId: string;
        userId: string;
      },
      any
    >;
    processEnhancedDeposit: FunctionReference<
      "action",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        playerId: string;
        transactionId: string;
      },
      any
    >;
    adjustUserBalance: FunctionReference<
      "mutation",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        transactionId: string;
        userId: string;
      },
      any
    >;
    getUserBalance: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    updateUserName: FunctionReference<
      "mutation",
      "public",
      { name: string; userId: string },
      any
    >;
    getWaitingSessionByBetAmount: FunctionReference<
      "query",
      "public",
      { betAmount: 10 | 20 | 50 | 100 },
      any
    >;
    scheduledSessionCreation: FunctionReference<
      "mutation",
      "public",
      { betAmount: 10 | 20 | 50 | 100 },
      any
    >;
    getUserById: FunctionReference<"query", "public", { userId: string }, any>;
    getWinnerBroadcast: FunctionReference<
      "query",
      "public",
      { sessionId: Id<"sessions"> },
      any
    >;
    broadcastWinnerToSession: FunctionReference<
      "mutation",
      "public",
      {
        cardId: number;
        coordinates: Array<Array<number>>;
        markedNumbers: Array<number>;
        pattern: string;
        sessionId: Id<"sessions">;
        winnerName: string;
      },
      any
    >;
    createUser: FunctionReference<
      "mutation",
      "public",
      {
        agentLevel:
          | "Cub"
          | "Prowler"
          | "Hunter"
          | "Alpha"
          | "King"
          | "Legend"
          | null;
        balance: number;
        isVerified: boolean;
        name: string;
        referrerId: string | null;
        userId: string;
      },
      any
    >;
    getAllUsers: FunctionReference<"query", "public", any, any>;
    getAllTransactions: FunctionReference<"query", "public", any, any>;
    getAllWithdrwals: FunctionReference<"query", "public", any, any>;
    getAllBets:FunctionReference<"query", "public", any, any>;

      
    updateUserReferrer: FunctionReference<
      "mutation",
      "public",
      { referrerId: string; userId: string },
      any
    >;
    getReferredUsers: FunctionReference<
      "query",
      "public",
      { referrerId: string },
      any
    >;
    updateAllAgentLevels: FunctionReference<
      "mutation",
      "public",
      {
        adminUserId?: string;
        forceUpdate?: boolean;
        respectManualPromotions?: boolean;
      },
      any
    >;
    updateAgentLevel: FunctionReference<
      "mutation",
      "public",
      {
        adminUserId?: string;
        respectManualPromotions?: boolean;
        userId: string;
      },
      any
    >;
    getProtectedUsers: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    forceUpdateAllAgentLevels: FunctionReference<
      "mutation",
      "public",
      { adminUserId: string; confirmationCode: string },
      any
    >;
    promoteUserToLevel: FunctionReference<
      "mutation",
      "public",
      {
        bypassRequirements?: boolean;
        newLevel:
          | "Cub"
          | "Prowler"
          | "Hunter"
          | "Alpha"
          | "King"
          | "Legend"
          | "Admin";
        promotedBy: string;
        reason?: string;
        userId: string;
      },
      any
    >;
    promoteToNextLevel: FunctionReference<
      "mutation",
      "public",
      {
        bypassRequirements?: boolean;
        promotedBy: string;
        reason?: string;
        userId: string;
      },
      any
    >;
    demoteUser: FunctionReference<
      "mutation",
      "public",
      {
        demotedBy: string;
        newLevel: "Cub" | "Prowler" | "Hunter" | "Alpha" | "King" | "Legend";
        reason: string;
        userId: string;
      },
      any
    >;
    getPromotionHistory: FunctionReference<
      "query",
      "public",
      { limit?: number; userId?: string },
      any
    >;
    getAgentLevel: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getAgentLevelStats: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    getUserReferralDetails: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    requestAgentLevel: FunctionReference<
      "mutation",
      "public",
      { requestedLevel: "Hunter"; userId: string },
      any
    >;
    getVerificationRequests: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    processGame: FunctionReference<
      "mutation",
      "public",
      { gameId: string; totalBets: number; winnerId: string },
      any
    >;
    getUniqueCardsBySession: FunctionReference<
      "query",
      "public",
      { active: boolean; sessionId: Id<"sessions"> },
      any
    >;
    getSessionCards: FunctionReference<
      "query",
      "public",
      { sessionId: string },
      any
    >;
    getSessionCardData: FunctionReference<
      "query",
      "public",
      { returnType?: "cardIds" | "cardNumbers"; sessionId: Id<"sessions"> },
      any
    >;
    getPlayerSessionCards: FunctionReference<
      "query",
      "public",
      {
        includeCardNumbers?: boolean;
        playerId: Id<"players">;
        sessionId: Id<"sessions">;
      },
      any
    >;
    getSessionPlayersAndCards: FunctionReference<
      "query",
      "public",
      { includeCardNumbers?: boolean; sessionId: Id<"sessions"> },
      any
    >;
    createWithdrawalRequest: FunctionReference<
      "mutation",
      "public",
      {
        accountNumber: string;
        amount: number;
        bankType: "cbe" | "boa";
        fullName: string;
        phoneNumber?: string;
        userId: string;
      },
      any
    >;
    verifyWithdrawalStatus: FunctionReference<
      "mutation",
      "public",
      { withdrawalId: Id<"withdrawals"> },
      any
    >;
    createWithdrawalRequestTelebirr: FunctionReference<
      "mutation",
      "public",
      {
        accountNumber?: string;
        amount: number;
        bankType: "cbe" | "boa" | "telebirr";
        fullName: string;
        phoneNumber?: string;
        userId: string;
      },
      any
    >;
    restoreUserBalance: FunctionReference<
      "mutation",
      "public",
      { amount: number; reason: string; userId: string },
      any
    >;
    processWithdrawalRequest: FunctionReference<
      "action",
      "public",
      {
        accountNumber?: string;
        amount: number;
        bankType: "cbe" | "boa" | "telebirr";
        fullName: string;
        phoneNumber?: string;
        userId: string;
      },
      any
    >;
    completeTestWithdrawal: FunctionReference<
      "mutation",
      "public",
      { reference: string; success: boolean; userId: string },
      any
    >;
    getWithdrawalByReference: FunctionReference<
      "query",
      "public",
      { reference: string },
      any
    >;
    getUserWithdrawals: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getPendingWithdrawals: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    updateWithdrawalStatus: FunctionReference<
      "mutation",
      "public",
      {
        chapaTransferId?: string;
        processedAt?: number;
        status: string;
        withdrawalId: Id<"withdrawals">;
      },
      any
    >;
    revertWithdrawal: FunctionReference<
      "mutation",
      "public",
      {
        amount: number;
        failureReason: string;
        userId: string;
        withdrawalId: Id<"withdrawals">;
      },
      any
    >;
    saveBankAccount: FunctionReference<
      "mutation",
      "public",
      {
        accountNumber: string;
        bankName: "cbe" | "boa";
        isDefault: boolean;
        name: string;
        phoneNumber?: string;
        userId: string;
      },
      any
    >;
    getUserBankAccounts: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getAgentFollowers: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getTotalEarnings: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getBankAccounts: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getEarningsOverview: FunctionReference<
      "query",
      "public",
      { periodDays?: number; userId: string },
      any
    >;
    getAnalytics: FunctionReference<"query", "public", { userId: string }, any>;
    updateBankAccount: FunctionReference<
      "mutation",
      "public",
      {
        accountHolderName?: string;
        accountId: Id<"bankaccount">;
        accountNumber?: string;
        isDefault?: boolean;
        phoneNumber?: string;
        userId: string;
      },
      any
    >;
    deleteBankAccount: FunctionReference<
      "mutation",
      "public",
      { accountId: Id<"bankaccount">; userId: string },
      any
    >;
    getAgentEarningsHistory: FunctionReference<
      "query",
      "public",
      { limit?: number; periodDays?: number; userId: string },
      any
    >;
    getAgentLevelHistory: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getUserReferralStats: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getUserBalanceHistory: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getUserDetailsForDashboard: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getAgentAccounts: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getAgentAccountForDeposit: FunctionReference<
      "query",
      "public",
      { playerId: string },
      any
    >;
    recordPlayerDeposit: FunctionReference<
      "mutation",
      "public",
      {
        agentAccountDetails?: {
          accountHolderName: string;
          accountNumber: string;
          bankName: string;
          phoneNumber?: string;
        };
        agentName?: string;
        amount: number;
        bankType: "cbe" | "boa";
        depositType: "agent" | "platform";
        playerId: string;
        playerName: string;
        transactionId: string;
        userId?: string;
      },
      any
    >;
    verifyAndProcessDeposit: FunctionReference<
      "action",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        depositType: "agent" | "platform";
        expectedReceiverAccountLastDigits?: string;
        playerId: string;
        transactionId: string;
      },
      any
    >;
    getDepositByTransactionId: FunctionReference<
      "query",
      "public",
      { transactionId: string },
      any
    >;
    updateDepositStatus: FunctionReference<
      "mutation",
      "public",
      {
        depositId: Id<"playerDeposits">;
        status: "pending" | "verified" | "failed";
      },
      any
    >;
    saveAgentAccount: FunctionReference<
      "mutation",
      "public",
      {
        accountHolderName: string;
        accountNumber: string;
        bankName: "cbe" | "boa";
        phoneNumber?: string;
        userId: string;
      },
      any
    >;
    updateAgentAccount: FunctionReference<
      "mutation",
      "public",
      {
        accountHolderName: string;
        accountId: Id<"agentAccounts">;
        accountNumber: string;
        bankName: "cbe" | "boa";
        phoneNumber?: string;
      },
      any
    >;
    deleteAgentAccount: FunctionReference<
      "mutation",
      "public",
      { accountId: Id<"agentAccounts"> },
      any
    >;
    updatePlayerBalance: FunctionReference<
      "mutation",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        playerId: string;
        transactionId: string;
      },
      any
    >;
    deposit: FunctionReference<
      "mutation",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        playerId: string;
        transactionId: string;
      },
      any
    >;
    saveAgentBankAccount: FunctionReference<
      "mutation",
      "public",
      {
        accountHolderName: string;
        accountNumber: string;
        bankName: "cbe" | "boa";
        phoneNumber?: string;
        userId: string;
      },
      any
    >;
    getAgentDashboardSummary: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getAgentPlayerBalances: FunctionReference<
      "query",
      "public",
      { limit?: number; userId: string },
      any
    >;
    getAgentPlayerTransactions: FunctionReference<
      "query",
      "public",
      { limit?: number; playerId?: string; userId: string },
      any
    >;
    getAgentBankAccounts: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    deleteAgentBankAccount: FunctionReference<
      "mutation",
      "public",
      { accountId: Id<"agentAccounts"> },
      any
    >;
    updateAgentBankAccount: FunctionReference<
      "mutation",
      "public",
      {
        accountHolderName: string;
        accountId: Id<"agentAccounts">;
        accountNumber: string;
        bankName: "cbe" | "boa";
        phoneNumber?: string;
      },
      any
    >;
    getPlatformSettlementDashboard: FunctionReference<
      "query",
      "public",
      { adminUserId: string },
      any
    >;
    processAgentSettlements: FunctionReference<
      "mutation",
      "public",
      {
        action:
          | "approve_all"
          | "reject_all"
          | "approve_platform_owes"
          | "approve_agent_owes";
        adminUserId: string;
        agentUserId: string;
        notes?: string;
      },
      any
    >;
    getDetailedSettlementReport: FunctionReference<
      "query",
      "public",
      { adminUserId: string; agentUserId?: string; includeProcessed?: boolean },
      any
    >;
    getAllPlatformTransactions: FunctionReference<
      "query",
      "public",
      { adminUserId: string; limit?: number },
      any
    >;
    getPlatformPlayerBalances: FunctionReference<
      "query",
      "public",
      { limit?: number },
      any
    >;
    getPlatformOverallStats: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    getPlatformCurrentSettlementSummary: FunctionReference<
      "query",
      "public",
      { adminUserId: string },
      any
    >;
    getPlatformSettlementRequests: FunctionReference<
      "query",
      "public",
      {
        adminUserId: string;
        limit?: number;
        status?: "pending" | "approved" | "rejected";
      },
      any
    >;
    getAllPlatformPlayerBalances: FunctionReference<
      "query",
      "public",
      { adminUserId: string; limit?: number },
      any
    >;
    calculateAgentSettlements: FunctionReference<
      "mutation",
      "public",
      { adminUserId: string; sessionId: Id<"sessions"> },
      any
    >;
    getPlatformSettlementSummaryFixed: FunctionReference<
      "query",
      "public",
      { adminUserId: string },
      any
    >;
    reconcileSettlementsWithPaidEarnings: FunctionReference<
      "mutation",
      "public",
      { adminUserId: string },
      any
    >;
    verifySettlementAccuracy: FunctionReference<
      "query",
      "public",
      { adminUserId: string; settlementId: Id<"agentSettlementRequests"> },
      any
    >;
    getAgentSpecificSettlementSummary: FunctionReference<
      "query",
      "public",
      { adminUserId: string; agentUserId?: string },
      any
    >;
    getIndividualAgentSettlements: FunctionReference<
      "query",
      "public",
      { agentUserId: string; includeProcessed?: boolean },
      any
    >;
    auditAndFixAgentAttributions: FunctionReference<
      "mutation",
      "public",
      { adminUserId: string; dryRun?: boolean },
      any
    >;
    getAllAgentsWithSettlements: FunctionReference<
      "query",
      "public",
      { adminUserId: string },
      any
    >;
    processVerifiedDepositWithPlatformTracking: FunctionReference<
      "action",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        playerId: string;
        transactionId: string;
      },
      any
    >;
    checkTransactionExists: FunctionReference<
      "query",
      "public",
      { bankType: string; transactionId: string },
      any
    >;
    isTransactionProcessed: FunctionReference<
      "query",
      "public",
      { bankType: string; transactionId: string },
      any
    >;
    checkTransactionExistsEnhanced: FunctionReference<
      "query",
      "public",
      {
        bankType: string;
        extractedTransactionId?: string;
        transactionId: string;
      },
      any
    >;
    trackPlatformPlayerBalance: FunctionReference<
      "mutation",
      "public",
      {
        amount: number;
        bankType?: "cbe" | "boa";
        playerId: string;
        sessionId?: Id<"sessions">;
        transactionId: string;
        transactionType: string;
      },
      any
    >;
    trackAgentPlayerBalance: FunctionReference<
      "mutation",
      "public",
      {
        amount: number;
        bankType?: "cbe" | "boa";
        playerId: string;
        sessionId?: Id<"sessions">;
        transactionId: string;
        transactionType: string;
        userId: string;
      },
      any
    >;
    getAgentOverallStats: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    getAgentPlayerBalanceWithValidation: FunctionReference<
      "query",
      "public",
      { playerId: string; userId: string },
      any
    >;
    processVerifiedDepositToAgent: FunctionReference<
      "action",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        playerId: string;
        transactionId: string;
      },
      any
    >;
    validateAgentSelfDeposit: FunctionReference<
      "query",
      "public",
      { playerId: string },
      any
    >;
    getDepositRoutingInfo: FunctionReference<
      "query",
      "public",
      { playerId: string },
      any
    >;
    processGameResultsWithAgentSettlement: FunctionReference<
      "mutation",
      "public",
      {
        betAmount: number;
        playersList: Array<string>;
        sessionId: Id<"sessions">;
        totalPrizePool: number;
        winnerId: string;
        winnerPayout: number;
      },
      any
    >;
    reconcileAgentSettlements: FunctionReference<
      "mutation",
      "public",
      { adminUserId: string; agentUserId?: string },
      any
    >;
    getAgentSettlementRequests: FunctionReference<
      "query",
      "public",
      {
        limit?: number;
        status?: "pending" | "approved" | "completed" | "rejected";
        userId?: string;
      },
      any
    >;
    processSettlementRequest: FunctionReference<
      "mutation",
      "public",
      {
        action: "approve" | "reject" | "complete";
        adminId: string;
        notes?: string;
        settlementId: Id<"agentSettlementRequests">;
      },
      any
    >;
    getAgentCurrentSettlementSummary: FunctionReference<
      "query",
      "public",
      { userId: string },
      any
    >;
    claimBingoWithAgentSettlement: FunctionReference<
      "mutation",
      "public",
      {
        betId: Id<"bet">;
        cardId: number;
        markedNumbers: Array<number | "FREE">;
        pattern: string;
        playerId: Id<"players">;
        sessionId: Id<"sessions">;
      },
      any
    >;
    recordTransaction: FunctionReference<
      "mutation",
      "public",
      {
        amount: number;
        bankType: "cbe" | "boa";
        status: string;
        timestamp: number;
        transactionId: string;
        userId: Id<"users">;
      },
      any
    >;
    createPlatformSettlementRequest: FunctionReference<
      "mutation",
      "public",
      {
        agentId: string;
        amount: number;
        priority: "low" | "medium" | "high" | "urgent";
        reason: string;
      },
      any
    >;
    verifyAndProcessTransaction: FunctionReference<
      "action",
      "public",
      {
        transactionId: string;
        transactionType:
          | "player_deposit"
          | "player_withdrawal"
          | "agent_withdrawal"
          | "settlement_payment";
        verificationData: {
          additionalData?: any;
          bankType: "cbe" | "boa";
          expectedAccount: string;
          expectedAmount: number;
        };
      },
      any
    >;
    processAgentWithdrawal: FunctionReference<
      "mutation",
      "public",
      {
        accountDetails: {
          accountHolderName: string;
          accountNumber: string;
          bankType: "cbe" | "boa";
        };
        agentId: string;
        amount: number;
      },
      any
    >;
    processPlayerWithdrawal: FunctionReference<
      "mutation",
      "public",
      {
        accountDetails: {
          accountHolderName: string;
          accountNumber: string;
          bankType: "cbe" | "boa";
          phoneNumber?: string;
        };
        amount: number;
        playerId: string;
      },
      any
    >;
    requestWithdrawalFromPlatform: FunctionReference<
      "mutation",
      "public",
      {
        accountDetails: {
          accountHolderName: string;
          accountNumber: string;
          bankType: "cbe" | "boa";
          phoneNumber?: string;
        };
        agentId: string;
        amount: number;
        settlementBasis: boolean;
      },
      any
    >;
    requestWithdrawalFromAgent: FunctionReference<
      "mutation",
      "public",
      {
        adminUserId: string;
        agentId: string;
        amount: number;
        reason: string;
        settlementBasis: boolean;
      },
      any
    >;
    getAgentWithdrawals: FunctionReference<
      "query",
      "public",
      { agentId: string },
      any
    >;
    getPlayerWithdrawals: FunctionReference<
      "query",
      "public",
      { playerId: string },
      any
    >;
    getAllAgentWithdrawals: FunctionReference<
      "query",
      "public",
      {
        limit?: number;
        status?: "pending" | "approved" | "completed" | "rejected";
      },
      any
    >;
    getAllPlayerWithdrawals: FunctionReference<
      "query",
      "public",
      {
        limit?: number;
        status?: "pending" | "approved" | "completed" | "rejected";
      },
      any
    >;
  };
  telebirrTransactionAction: {
    telebirrTransactionAction: FunctionReference<
      "action",
      "public",
      {
        actionType: "initiate" | "verify";
        amount: number;
        callbackUrl: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        returnUrl: string;
        telegramChatId: string;
        transactionId?: string;
      },
      any
    >;
    chapaTransferAction: FunctionReference<
      "action",
      "public",
      {
        accountName?: string;
        accountNumber?: string;
        actionType: "initiate" | "verify";
        amount?: number;
        bankType?: "cbe" | "boa" | "telebirr";
        phoneNumber?: string;
        reference: string;
        userId: string;
        withdrawalId?: Id<"withdrawals">;
      },
      any
    >;
  };
  actions: {
    verifyChapaSignature: FunctionReference<
      "action",
      "public",
      { payload: string; secretKey: string; signature?: string },
      any
    >;
  };
};
export type InternalApiType = {};
