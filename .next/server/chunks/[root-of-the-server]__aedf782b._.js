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
        oddsAdvice = "This market is undervalued. You’re getting alpha here. Go for it 🤑.";
    } else {
        oddsAdvice = "Careful! The market is overpricing this. Risk is higher than reward ⚠️.";
    }
    // (B) Stake Size Advice (Kelly Criterion)
    let stakeAdvice = '';
    if (input.bankroll && input.marketOdds > 1) {
        // Kelly formula: f* = (bp - q) / (odds - 1), where b = odds - 1, p = botProbability, q = 1 - p
        const b = input.marketOdds - 1;
        const p = input.botProbability;
        const q = 1 - p;
        const kelly = (b * p - q) / b;
        const percent = Math.max(0, Math.round(kelly * 100));
        stakeAdvice = `Optimal stake: ${percent}% of your bankroll.`;
    } else {
        stakeAdvice = "No bankroll info provided. Can't compute optimal stake.";
    }
    // (C) Market Trends (mocked)
    let trendAdvice = '';
    if (input.priceHistory && input.priceHistory.length > 1) {
        const oldPrice = input.priceHistory[0];
        const newPrice = input.priceHistory[input.priceHistory.length - 1];
        const change = (newPrice - oldPrice) / oldPrice * 100;
        if (Math.abs(change) > 20) {
            trendAdvice = `Warning: Odds have shifted ${change.toFixed(1)}% in the last period. Could be risky 🚨.`;
        } else {
            trendAdvice = `Market is stable. Change: ${change.toFixed(1)}%.`;
        }
    } else {
        trendAdvice = "No price history available for trend analysis.";
    }
    // (D) Sentiment Check (mocked)
    const sentimentAdvice = Math.random() > 0.5 ? "Sentiment is highly bullish on this outcome – 80% of recent posts agree." : "Sentiment is mixed. Proceed cautiously.";
    return {
        oddsAdvice,
        stakeAdvice,
        trendAdvice,
        sentimentAdvice
    };
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
;
;
async function POST(req) {
    try {
        const { marketProbability, botProbability, marketOdds, bankroll, priceHistory } = await req.json();
        if (typeof marketProbability !== 'number' || typeof botProbability !== 'number' || typeof marketOdds !== 'number') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid input'
            }, {
                status: 400
            });
        }
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$algorithms$2f$betAdvice$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBetAdvice"])({
            marketProbability,
            botProbability,
            marketOdds,
            bankroll,
            priceHistory
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__aedf782b._.js.map