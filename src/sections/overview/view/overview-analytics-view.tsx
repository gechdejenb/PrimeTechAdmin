import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';
import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
import { getAllUsers, getAllTransactions, getAllWithdrawals, getAllBets } from '../../../convexCLient/report';
import { UserProps } from 'src/types/user';
import { Box } from '@mui/material';

export function OverviewAnalyticsView() {
  const [userCounts, setUserCounts] = useState({
    total: 0,
    series: [0, 0, 0, 0, 0, 0, 0],
    percent: 0,
  });
  const [platformRevenue, setPlatformRevenue] = useState({
    total: 0,
    series: [0, 0, 0, 0, 0, 0, 0, 0],
    percent: 0,
  });
  const [dailySales, setDailySales] = useState({
    total: 0,
    series: [0, 0, 0, 0, 0, 0, 0, 0],
    dayCategories: ['Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7', 'Aug 8', 'Aug 9', 'Aug 10'],
    percent: 0,
  });
  const [ledgerBalance, setLedgerBalance] = useState({
    total: 0,
    series: [0, 0, 0, 0, 0, 0, 0, 0],
    percent: 0,
  });
  const [depositsWithdrawals, setDepositsWithdrawals] = useState({
    categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    series: [
      { name: 'Deposits', data: [0, 0, 0, 0, 0, 0, 0] },
      { name: 'Withdrawals', data: [0, 0, 0, 0, 0, 0, 0] },
    ],
  });
  const [betAmounts, setBetAmounts] = useState({
    series: [
      { label: 'Bet 10', value: 0 },
      { label: 'Bet 20', value: 0 },
      { label: 'Bet 50', value: 0 },
      { label: 'Bet 100', value: 0 },
    ],
  });
  const [activeBetsCount, setActiveBetsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch users
        const users = await getAllUsers() as UserProps[];
        const agentLevels = ['Cub', 'Prowler', 'Hunter', 'Alpha', 'King', 'Legend', 'Admin'];
        const counts = agentLevels.map(
          (level) => users.filter((user) => user.agentLevel === level).length
        );

        const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
        const oneDayMs = 24 * 60 * 60 * 1000;
        const eatOffsetMs = 3 * 60 * 60 * 1000; // UTC+3 for EAT
        const currentDate = Date.now(); // Live current date in UTC
        const currentDateEAT = currentDate + eatOffsetMs; // Adjust to EAT
        const currentDayStart = new Date(currentDateEAT).setHours(0, 0, 0, 0) - eatOffsetMs; // Start of today in UTC
        const currentDayEnd = currentDayStart + oneDayMs; // End of today in UTC
        const previousDayStart = currentDayStart - oneDayMs; // Start of yesterday in UTC
        const currentPeriodStart = currentDate - oneWeekMs; // Last 7 days
        const previousPeriodStart = currentDate - 2 * oneWeekMs; // Previous 7 days

        const currentUserCount = users.filter(
          (user) => user._creationTime >= currentPeriodStart
        ).length;
        const previousUserCount = users.filter(
          (user) =>
            user._creationTime >= previousPeriodStart && user._creationTime < currentPeriodStart
        ).length;

        const userPercent = previousUserCount > 0
          ? ((currentUserCount - previousUserCount) / previousUserCount) * 100
          : currentUserCount > 0 ? 100 : 0;

        setUserCounts({
          total: users.length,
          series: counts,
          percent: Number(userPercent.toFixed(1)),
        });

        // Fetch transactions, withdrawals, and bets
        const transactions = await getAllTransactions();
        const withdrawals = await getAllWithdrawals();
        const bets = await getAllBets();
        const platformTransactions = transactions.filter(
          (tx) => tx.transactionId && tx.transactionId.startsWith('platform_share_')
        );
        const telebirrTransactions = transactions.filter(
          (tx) => tx.transactionId && tx.transactionId.startsWith('TB_')
        );
        const processingWithdrawals = withdrawals.filter(
          (wd) => wd.status === 'processing'
        );

        // Count active bets
        const activeBets = bets.filter((bet) => bet.active === true).length;
        setActiveBetsCount(activeBets);

        // Platform Revenue
        const totalRevenue = platformTransactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const currentRevenue = platformTransactions
          .filter((tx) => tx.timestamp >= currentPeriodStart)
          .reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const previousRevenue = platformTransactions
          .filter((tx) => tx.timestamp >= previousPeriodStart && tx.timestamp < currentPeriodStart)
          .reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const revenuePercent = previousRevenue > 0
          ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
          : currentRevenue > 0 ? 100 : 0;

        const currentYear = new Date(currentDateEAT).getFullYear();
        const revenueMonthly = Array(8).fill(0); // Jan–Aug
        platformTransactions.forEach((tx) => {
          const date = new Date(tx.timestamp + eatOffsetMs);
          const year = date.getFullYear();
          const month = date.getMonth();
          if (year === currentYear && month >= 0 && month < 8) {
            revenueMonthly[month] += (tx.amount || 0);
          }
        });

        setPlatformRevenue({
          total: totalRevenue,
          series: revenueMonthly,
          percent: Number(revenuePercent.toFixed(1)),
        });

        // Daily Sales (platform_share_ for current day)
        const todaySales = platformTransactions
          .filter((tx) => tx.timestamp >= currentDayStart && tx.timestamp < currentDayEnd)
          .reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const yesterdaySales = platformTransactions
          .filter((tx) => tx.timestamp >= previousDayStart && tx.timestamp < currentDayStart)
          .reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const salesPercent = yesterdaySales > 0
          ? ((todaySales - yesterdaySales) / yesterdaySales) * 100
          : todaySales > 0 ? 100 : 0;

        const salesDaily = Array(8).fill(0);
        const dayCategories = [];
        for (let i = 7; i >= 0; i--) {
          const dayStart = currentDayStart - i * oneDayMs;
          const dayEnd = dayStart + oneDayMs;
          const dayTotal = platformTransactions
            .filter((tx) => tx.timestamp >= dayStart && tx.timestamp < dayEnd)
            .reduce((sum, tx) => sum + (tx.amount || 0), 0);
          salesDaily[7 - i] = dayTotal;
          const date = new Date(dayStart + eatOffsetMs);
          dayCategories.push(`${date.toLocaleString('en-US', { month: 'short', day: 'numeric' })}`);
        }

        setDailySales({
          total: todaySales,
          series: salesDaily,
          dayCategories,
          percent: Number(salesPercent.toFixed(1)),
        });

        // Ledger Balance (TB_ transactions for client deposits)
        const totalLedger = telebirrTransactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const currentLedger = telebirrTransactions
          .filter((tx) => tx.timestamp >= currentPeriodStart)
          .reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const previousLedger = telebirrTransactions
          .filter((tx) => tx.timestamp >= previousPeriodStart && tx.timestamp < currentPeriodStart)
          .reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const ledgerPercent = previousLedger > 0
          ? ((currentLedger - previousLedger) / previousLedger) * 100
          : currentLedger > 0 ? 100 : 0;

        const ledgerMonthly = Array(8).fill(0); // Jan–Aug
        telebirrTransactions.forEach((tx) => {
          const date = new Date(tx.timestamp + eatOffsetMs);
          const year = date.getFullYear();
          const month = date.getMonth();
          if (year === currentYear && month >= 0 && month < 8) {
            ledgerMonthly[month] += (tx.amount || 0);
          }
        });

        setLedgerBalance({
          total: totalLedger,
          series: ledgerMonthly,
          percent: Number(ledgerPercent.toFixed(1)),
        });

        // Deposits and Withdrawals (daily for last 7 days with day names)
        const depositsDaily = Array(7).fill(0);
        const withdrawalsDaily = Array(7).fill(0);
        const dayNameCategories = [];
        for (let i = 6; i >= 0; i--) {
          const dayStart = currentDayStart - i * oneDayMs;
          const dayEnd = dayStart + oneDayMs;
          depositsDaily[6 - i] = telebirrTransactions
            .filter((tx) => tx.timestamp >= dayStart && tx.timestamp < dayEnd)
            .reduce((sum, tx) => sum + (tx.amount || 0), 0);
          withdrawalsDaily[6 - i] = processingWithdrawals
            .filter((wd) => wd.requestedAt >= dayStart && wd.requestedAt < dayEnd)
            .reduce((sum, wd) => sum + (wd.amount || 0), 0);
          const date = new Date(dayStart + eatOffsetMs);
          dayNameCategories.push(date.toLocaleString('en-US', { weekday: 'long' }));
        }

        setDepositsWithdrawals({
          categories: dayNameCategories,
          series: [
            { name: 'Deposits', data: depositsDaily },
            { name: 'Withdrawals', data: withdrawalsDaily },
          ],
        });

        // Bet Amounts (count bets by amount where balanceDeducted is true)
        const betCounts = {};
        bets.forEach((bet) => {
          const hasDeducted = Object.values(bet.balanceDeducted || {}).some((deducted) => deducted === true);
          if (hasDeducted) {
            const amount = bet.amount || 0;
            betCounts[amount] = (betCounts[amount] || 0) + 1;
          }
        });

        const betSeries = Object.keys(betCounts)
          .map((amount) => ({
            label: `Bet ${amount}`,
            value: betCounts[amount],
          }))
          .sort((a, b) => parseFloat(a.label.replace('Bet ', '')) - parseFloat(b.label.replace('Bet ', '')));

        setBetAmounts({
          series: betSeries.length > 0 ? betSeries : [
            { label: 'Bet 10', value: 0 },
            { label: 'Bet 20', value: 0 },
            { label: 'Bet 50', value: 0 },
            { label: 'Bet 100', value: 0 },
          ],
        });

        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setUserCounts({ total: 0, series: [0, 0, 0, 0, 0, 0, 0], percent: 0 });
        setPlatformRevenue({ total: 0, series: [0, 0, 0, 0, 0, 0, 0, 0], percent: 0 });
        setDailySales({ total: 0, series: [0, 0, 0, 0, 0, 0, 0, 0], dayCategories: [], percent: 0 });
        setLedgerBalance({ total: 0, series: [0, 0, 0, 0, 0, 0, 0, 0], percent: 0 });
        setDepositsWithdrawals({
          categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          series: [
            { name: 'Deposits', data: [0, 0, 0, 0, 0, 0, 0] },
            { name: 'Withdrawals', data: [0, 0, 0, 0, 0, 0, 0] },
          ],
        });
        setBetAmounts({
          series: [
            { label: 'Bet 10', value: 0 },
            { label: 'Bet 20', value: 0 },
            { label: 'Bet 50', value: 0 },
            { label: 'Bet 100', value: 0 },
          ],
        });
        setActiveBetsCount(0);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardContent maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  if (error) {
    return (
      <DashboardContent maxWidth="xl">
        <Typography color="error">{error}</Typography>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent maxWidth="xl">
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
          fontWeight: 'bold',
          color: 'primary.main',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 1.2,
          '&:hover': {
            color: 'primary.dark',
            transition: 'color 0.3s ease-in-out',
          },
        }}
      >
        Active Games: {activeBetsCount}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Daily Sales"
            percent={dailySales.percent}
            total={dailySales.total}
            icon={<img alt="Daily Sales" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: dailySales.dayCategories || ['Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7', 'Aug 8', 'Aug 9', 'Aug 10'],
              series: dailySales.series,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Users"
            percent={userCounts.percent}
            total={userCounts.total}
            color="secondary"
            icon={<img alt="Total Users" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Cub', 'Prowler', 'Hunter', 'Alpha', 'King', 'Legend', 'Admin'],
              series: userCounts.series,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Platform Revenue"
            percent={platformRevenue.percent}
            total={platformRevenue.total}
            color="warning"
            icon={<img alt="Platform Revenue" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: platformRevenue.series,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Ledger Balance"
            percent={ledgerBalance.percent}
            total={ledgerBalance.total}
            color="error"
            icon={<img alt="Ledger Balance" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: ledgerBalance.series,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Bet Amounts Played"
            chart={{
              series: betAmounts.series,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Deposits and Withdrawals by Players"
            subheader="Daily totals for the last 7 days"
            chart={{
              categories: depositsWithdrawals.categories,
              series: depositsWithdrawals.series,
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}