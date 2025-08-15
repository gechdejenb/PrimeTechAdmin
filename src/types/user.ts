export type UserProps = {
  _id: string;
  name: string;
  agentLevel: string;
  balance: number;
  isVerified: boolean;
  lastActive?: number;
  userId: string;
  _creationTime: number;
  referrerId?: string;
  sessionId?: string;
};