import { ConvexClient } from 'convex/browser';
import { api } from '../../convex/api';

const convexUrl = import.meta.env.VITE_CONVEX_URL_bingo;
const convex = new ConvexClient(convexUrl);

/**
 * Get all users from the Convex "users" table
 */
export async function getAllUsers() {
  try {
    const users = await convex.query(api.game.getAllUsers, {});
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function getAllTransactions() {
  try {
    const transactions = await convex.query(api.game.getAllTransactions, {});
    return transactions;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function getAllWithdrawals() {
  try {
    const withdrawals = await convex.query(api.game.getAllWithdrwals, {});
    return withdrawals;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function getAllBets() {
  try {
    const bets = await convex.query(api.game.getAllBets, {});
    return bets;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}



