function maxProfitK(prices, k) {
    const n = prices.length;
    if (n <= 1 || k <= 0) {
        return 0;
    }
    if (k >= n / 2) {
        let maxProfit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                maxProfit += prices[i] - prices[i - 1];
            }
        }
        return maxProfit;
    }
    const dp = [];
    for (let i = 0; i <= k; i++) {
        dp[i] = new Array(n).fill(0);
    }
    for (let t = 1; t <= k; t++) {
        let maxDiff = -prices[0];
        for (let i = 1; i < n; i++) {
            dp[t][i] = Math.max(dp[t][i - 1], prices[i] + maxDiff);
            maxDiff = Math.max(maxDiff, dp[t - 1][i] - prices[i]);
        }
    }
    return dp[k][n - 1];
}

const prices = [3, 2, 6, 5, 0, 3];
const k = 2;
console.log(maxProfitK(prices, k));