module.exports = {

"[project]/.next-internal/server/app/api/analyze/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/algorithms/betAdvice.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Bet advice logic for prediction market bot
__turbopack_context__.s({
    "getBetAdvice": (()=>getBetAdvice)
});
function getBetAdvice(input) {
    // (A) Odds Analysis
    const edge = input.botProbability - input.marketProbability;
    let oddsAdvice = '';
    if (edge > 0) {
        oddsAdvice = "This market is undervalued. You’re getting alpha here. Go for it.";
    } else {
        oddsAdvice = "Careful! The market is overpricing this. Risk is higher than reward ⚠️.";
    }
    // (B) Stake Size Advice (Kelly Criterion)
    // Remove or comment out 'stakeAdvice' if it is not used
    // if (input.bankroll && input.marketOdds > 1) {
    //   // Kelly formula: f* = (bp - q) / (odds - 1), where b = odds - 1, p = botProbability, q = 1 - p
    //   const b = input.marketOdds - 1;
    //   const p = input.botProbability;
    //   const q = 1 - p;
    //   const kelly = (b * p - q) / b;
    //   const percent = Math.max(0, Math.round(kelly * 100));
    //   stakeAdvice = `Optimal stake: ${percent}% of your bankroll.`;
    // } else {
    //   stakeAdvice = "No bankroll info provided. Can't compute optimal stake.";
    // }
    // (C) Market Trends (improved)
    let trendAdvice = '';
    if (input.priceHistory && input.priceHistory.length > 1) {
        const oldPrice = input.priceHistory[0];
        const newPrice = input.priceHistory[input.priceHistory.length - 1];
        const change = (newPrice - oldPrice) / oldPrice * 100;
        trendAdvice = `Price changed ${change.toFixed(2)}% over the period.`;
        if (Math.abs(change) > 20) {
            trendAdvice += " Could be risky 🚨.";
        } else if (change > 0) {
            trendAdvice += " Uptrend 📈.";
        } else if (change < 0) {
            trendAdvice += " Downtrend 📉.";
        } else {
            trendAdvice += " Flat trend.";
        }
    } else {
        trendAdvice = "No price history available for trend analysis.";
    }
    // (D) Sentiment Check (mocked)
    const sentimentAdvice = Math.random() > 0.5 ? "Sentiment is highly bullish on this outcome – 80% of recent posts agree." : "Sentiment is mixed. Proceed cautiously.";
    return {
        oddsAdvice,
        trendAdvice,
        sentimentAdvice,
        priceHistory: input.priceHistory
    };
}
}}),
"[project]/src/algorithms/linearRegression.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Predicts the next value in a sequence using simple linear regression.
 * @param data An array of numbers (e.g., price history).
 * @returns The predicted next value, or null if there's not enough data.
 */ __turbopack_context__.s({
    "predictNextPrice": (()=>predictNextPrice)
});
function predictNextPrice(data) {
    const n = data.length;
    if (n < 2) {
        // Not enough data to create a regression line
        return null;
    }
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    for(let i = 0; i < n; i++){
        const x = i;
        const y = data[i];
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXX += x * x;
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    if (isNaN(slope) || isNaN(intercept)) {
        // This can happen if the denominator is zero (e.g., if all prices are the same).
        // In this case, predict the next price to be the same as the last one.
        return data[n - 1];
    }
    // Predict the value for the next time step (x = n)
    const predictedPrice = slope * n + intercept;
    return predictedPrice;
}
}}),
"[project]/src/algorithms/polynomialRegression.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Predicts the next value in a sequence using 2nd-degree polynomial regression.
 * @param data An array of numbers (e.g., price history).
 * @returns The predicted next value, or null if there's not enough data.
 */ __turbopack_context__.s({
    "predictNextPricePolynomial": (()=>predictNextPricePolynomial)
});
function predictNextPricePolynomial(data) {
    const n = data.length;
    if (n < 3) {
        // Not enough data for quadratic regression
        return null;
    }
    // Fit y = ax^2 + bx + c
    let sumX = 0, sumX2 = 0, sumX3 = 0, sumX4 = 0;
    let sumY = 0, sumXY = 0, sumX2Y = 0;
    for(let i = 0; i < n; i++){
        const x = i;
        const y = data[i];
        sumX += x;
        sumX2 += x * x;
        sumX3 += x * x * x;
        sumX4 += x * x * x * x;
        sumY += y;
        sumXY += x * y;
        sumX2Y += x * x * y;
    }
    // Solve the normal equations for a, b, c
    // | n    sumX   sumX2 |   | c |   | sumY   |
    // | sumX sumX2  sumX3 | * | b | = | sumXY  |
    // | sumX2 sumX3 sumX4 |   | a |   | sumX2Y |
    const A = [
        [
            n,
            sumX,
            sumX2
        ],
        [
            sumX,
            sumX2,
            sumX3
        ],
        [
            sumX2,
            sumX3,
            sumX4
        ]
    ];
    const B = [
        sumY,
        sumXY,
        sumX2Y
    ];
    // Gaussian elimination
    function solve(A, B) {
        const n = B.length;
        for(let i = 0; i < n; i++){
            // Partial pivot
            let maxRow = i;
            for(let k = i + 1; k < n; k++){
                if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
            }
            [A[i], A[maxRow]] = [
                A[maxRow],
                A[i]
            ];
            [B[i], B[maxRow]] = [
                B[maxRow],
                B[i]
            ];
            // Eliminate
            for(let k = i + 1; k < n; k++){
                const c = A[k][i] / A[i][i];
                for(let j = i; j < n; j++){
                    A[k][j] -= c * A[i][j];
                }
                B[k] -= c * B[i];
            }
        }
        // Back substitution
        const x = Array(n).fill(0);
        for(let i = n - 1; i >= 0; i--){
            x[i] = B[i];
            for(let j = i + 1; j < n; j++){
                x[i] -= A[i][j] * x[j];
            }
            x[i] /= A[i][i];
        }
        return x;
    }
    let a = 0, b = 0, c = 0;
    try {
        [c, b, a] = solve(A, B);
    } catch  {
        return null;
    }
    // Predict the value for the next time step (x = n)
    const predicted = a * n * n + b * n + c;
    return predicted;
}
}}),
"[project]/src/algorithms/ema.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Calculates the Exponential Moving Average (EMA) for a given array of prices.
 * @param prices Array of price numbers
 * @param window Number of periods for the EMA
 * @returns The latest EMA value, or null if not enough data
 */ __turbopack_context__.s({
    "predictNextPriceEMA": (()=>predictNextPriceEMA)
});
function predictNextPriceEMA(prices, window = 7) {
    if (prices.length < window) return null;
    const k = 2 / (window + 1);
    let ema = prices[0];
    for(let i = 1; i < prices.length; i++){
        ema = prices[i] * k + ema * (1 - k);
    }
    return ema;
}
}}),
"[project]/src/app/api/analyze/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$algorithms$2f$betAdvice$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/algorithms/betAdvice.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$algorithms$2f$linearRegression$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/algorithms/linearRegression.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$algorithms$2f$polynomialRegression$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/algorithms/polynomialRegression.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$algorithms$2f$ema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/algorithms/ema.ts [app-route] (ecmascript)");
;
;
;
;
;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_PRICE_HISTORY_ENDPOINT = `https://api.g.alchemy.com/prices/v1/${ALCHEMY_API_KEY}/tokens/historical`;
const COINGECKO_IDS = {
    SOL: 'solana',
    BONK: 'bonk',
    BTC: 'bitcoin',
    DOGE: 'dogecoin',
    HYPE: 'hyperliquid',
    PENGU: 'pudgy-penguins',
    PUMP: 'pump-fun'
};
const TOKEN_CONTRACTS = {
    ETH: null,
    WBTC: '0x2260FAC5E5542a773AaA73edC008A79646d1F9912',
    WDOGE: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    SHIBA: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    PEPE: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
    TON: '0x2e9d63788249371f1dfc918a52f8d799f4a38c94'
};
function calculateMovingAverage(prices, window) {
    if (prices.length < window) return null;
    const sum = prices.slice(-window).reduce((a, b)=>a + b, 0);
    return sum / window;
}
function getTodayISOString() {
    return new Date().toISOString().split('T')[0] + 'T23:59:59Z';
}
function getPastISOString(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0] + 'T00:00:00Z';
}
async function fetchAlchemyHistory(token, contract, days) {
    if (!contract && token !== 'ETH') return [];
    const startTime = getPastISOString(days);
    const endTime = getTodayISOString();
    const body = contract ? {
        network: 'ethereum',
        address: contract,
        startTime,
        endTime
    } : {
        symbol: token,
        startTime,
        endTime
    };
    const res = await fetch(ALCHEMY_PRICE_HISTORY_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data?.data?.prices) {
        return data.data.prices.map((p)=>parseFloat(p.value)).filter((v)=>!isNaN(v));
    }
    return [];
}
async function fetchCoinGeckoHistory(contract, days) {
    const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contract}/market_chart?vs_currency=usd&days=${days}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data?.prices) {
            return data.prices.map((p)=>p[1]).filter((v)=>!isNaN(v));
        } else {
            console.log(`[CoinGecko] No price history found for contract: ${contract}`);
        }
    } catch (err) {
        console.error(`[CoinGecko] Error fetching price history for contract: ${contract}`, err);
    }
    return [];
}
async function fetchCoinGeckoIdHistory(id, days) {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data?.prices) {
            return data.prices.map((p)=>p[1]).filter((v)=>!isNaN(v));
        } else {
            console.log(`[CoinGecko] No price history found for id: ${id}`);
        }
    } catch (err) {
        console.error(`[CoinGecko] Error fetching price history for id: ${id}`, err);
    }
    return [];
}
const NODIT_API_URL = process.env.NODIT_API_URL || "http://localhost:3000/api/nodit";
async function fetchCurrentPriceNodit(token) {
    try {
        const res = await fetch(NODIT_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "get_price",
                params: [
                    token
                ],
                id: 1
            })
        });
        const data = await res.json();
        if (data?.result?.price) {
            return data.result.price;
        }
    } catch (err) {
        console.error(`[Nodit] Error fetching current price for ${token}`, err);
    }
    return null;
}
// Fetch current price using CoinGecko
async function fetchCurrentPriceCoinGecko(token, contract) {
    try {
        let url = "";
        if (token === "ETH") {
            url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`;
        } else if (COINGECKO_IDS[token]) {
            url = `https://api.coingecko.com/api/v3/simple/price?ids=${COINGECKO_IDS[token]}&vs_currencies=usd`;
        } else if (contract) {
            url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contract}&vs_currencies=usd`;
        } else {
            return null;
        }
        const res = await fetch(url);
        const data = await res.json();
        if (token === "ETH" && data?.ethereum?.usd) return data.ethereum.usd;
        if (COINGECKO_IDS[token] && data[COINGECKO_IDS[token]]?.usd) return data[COINGECKO_IDS[token]].usd;
        if (contract) {
            const key = Object.keys(data)[0];
            if (key && data[key]?.usd) return data[key].usd;
        }
    } catch (err) {
        console.error(`[CoinGecko] Error fetching current price for ${token}`, err);
    }
    return null;
}
async function POST(req) {
    try {
        const { token, priceToken, marketProbability, marketOdds, bankroll } = await req.json();
        if (typeof marketOdds !== 'number' || typeof token !== 'string') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid input'
            }, {
                status: 400
            });
        }
        let price = null;
        let priceHistory = [];
        let botProbability = 0.6; // fallback
        let ma7 = null;
        const lookupToken = priceToken || token;
        const contract = TOKEN_CONTRACTS[lookupToken];
        // Fetch current price using Nodit, fallback to CoinGecko
        price = await fetchCurrentPriceNodit(lookupToken);
        if (price === null) {
            price = await fetchCurrentPriceCoinGecko(lookupToken, contract === null ? undefined : contract);
        }
        if (COINGECKO_IDS[lookupToken]) {
            // Non-ERC20 tokens: use CoinGecko ID endpoints
            const history7 = await fetchCoinGeckoIdHistory(COINGECKO_IDS[lookupToken], 7);
            priceHistory = history7;
            ma7 = calculateMovingAverage(history7, 7);
            botProbability = ma7 && price ? Math.min(1, Math.max(0, ma7 / price)) : 0.6;
        } else if (lookupToken === 'ETH') {
            priceHistory = [
                3400,
                3450,
                3500
            ];
            botProbability = 0.6;
            ma7 = 3500;
        } else {
            const contract = TOKEN_CONTRACTS[lookupToken];
            if (!contract) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Unsupported token'
                }, {
                    status: 400
                });
            }
            // Try Alchemy first
            let history7 = await fetchAlchemyHistory(token, contract, 7);
            if (!history7.length) {
                // Fallback to CoinGecko
                history7 = await fetchCoinGeckoHistory(contract, 7);
            }
            priceHistory = history7;
            ma7 = calculateMovingAverage(history7, 7);
            botProbability = ma7 && price ? Math.min(1, Math.max(0, ma7 / price)) : 0.6;
        }
        const predictedPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$algorithms$2f$linearRegression$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictNextPrice"])(priceHistory);
        const predictedPricePolynomial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$algorithms$2f$polynomialRegression$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictNextPricePolynomial"])(priceHistory);
        const predictedPriceEMA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$algorithms$2f$ema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictNextPriceEMA"])(priceHistory);
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$algorithms$2f$betAdvice$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBetAdvice"])({
            marketProbability: marketProbability ?? 0.55,
            botProbability,
            marketOdds: marketOdds ?? 1.8,
            bankroll,
            priceHistory
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ...result,
            price,
            token,
            ma7,
            predictedPrice,
            predictedPricePolynomial,
            predictedPriceEMA
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__414cf908._.js.map