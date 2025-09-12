// // src/pages/Demo.jsx
// import React, { useEffect, useState } from "react";
// import Groups2Rounded from "@mui/icons-material/Groups2Rounded";
// import SubscriptionsRounded from "@mui/icons-material/SubscriptionsRounded";
// import DoNotDisturbOnRounded from "@mui/icons-material/DoNotDisturbOnRounded";
// import BarChartRounded from "@mui/icons-material/BarChartRounded";
// import Statscard from "../../../shared/components/Statscard";
// import TrendChart from "../../../shared/components/TrendChart";
// import DonutRow from "../../../shared/components/DonutRow";

// import { useDispatch, useSelector } from "react-redux";
// import { getallcustomers, selectallcustomer } from "../slice/Customerslice";
// // ^ named import for the selector

// export default function Stats() {
//   const dispatch = useDispatch();

//   // ✅ actually read the state value
//   const allcustomer = useSelector(selectallcustomer);

//   useEffect(() => {
//     dispatch(getallcustomers());
//   }, [dispatch]);

//   console.log("jsdhfkasdjf", allcustomer); // ✅ log the data, not the selector function

//   const items = [
//     {
//       title: "Total Customers",
//       value: 2935,
//       icon: <Groups2Rounded />,
//       changeValue: 10.2,
//       changeText: "+1.01% this week",
//       direction: "up",
//       color: "#5E6AD2",
//     },
//     {
//       title: "Active Subscription",
//       value: 2345,
//       icon: <SubscriptionsRounded />,
//       changeValue: 120,
//       changeText: "+2% this week",
//       direction: "up",
//       color: "#7C4DFF",
//     },
//     {
//       title: "Inactive Subscription",
//       value: 827,
//       icon: <DoNotDisturbOnRounded />,
//       changeValue: 2.56,
//       changeText: "-0.91% this week",
//       direction: "down",
//       color: "#7E57C2",
//     },
//     {
//       title: "Total Limit",
//       value: 24854,
//       icon: <BarChartRounded />,
//       changeValue: 7.2,
//       changeText: "+1.51% this week",
//       direction: "up",
//       color: "#3F76F6",
//     },
//   ];

//   const DATA = [
//     { month: "Jan", onboarded: 28, expired: 54 },
//     { month: "Feb", onboarded: 22, expired: 35 },
//     { month: "Mar", onboarded: 46, expired: 50 },
//     { month: "Apr", onboarded: 28, expired: 72 },
//     { month: "May", onboarded: 45, expired: 40 },
//     { month: "Jun", onboarded: 34, expired: 48 },
//     { month: "Jul", onboarded: 52, expired: 90 },
//     { month: "Aug", onboarded: 48, expired: 80 },
//     { month: "Sep", onboarded: 18, expired: 50 },
//     { month: "Oct", onboarded: 27, expired: 52 },
//     { month: "Nov", onboarded: 51, expired: 72 },
//     { month: "Dec", onboarded: 19, expired: 58 },
//   ];

//   const charts = [
//     {
//       total: 80,
//       slices: [
//         { name: "<5 Days", value: 48, color: "#EF4444" },
//         { name: "5-15 Days", value: 14, color: "#F59E0B" },
//         { name: "1month", value: 18, color: "#22C55E" },
//       ],
//     },
//     {
//       total: 236,
//       slices: [
//         { name: "Active", value: 120, color: "#22C55E" },
//         { name: "New", value: 60, color: "#4F46E5" },
//         { name: "Inactive", value: 56, color: "#9CA3AF" },
//       ],
//     },
//     {
//       total: 236,
//       slices: [
//         { name: "Demo", value: 60, color: "#F0ABFC" },
//         { name: "Professional", value: 176, color: "#4F46E5" },
//       ],
//     },
//     {
//       total: 236,
//       slices: [
//         { name: "Active", value: 90, color: "#22C55E" },
//         { name: "New", value: 66, color: "#4F46E5" },
//         { name: "Inactive", value: 80, color: "#9CA3AF" },
//       ],
//     },
//   ];

//   return (
//     <>
//       <Statscard items={items} />
//       <TrendChart
//         data={DATA}
//         title="Customer Onboarding Trend"
//         colors={{ onboarded: "#10B981", expired: "#6366F1" }}
//       />
//       <DonutRow title="Subscription" charts={charts} height={240} />
//     </>
//   );
// }



// src/pages/Demo.jsx
import React, { useEffect, useMemo } from "react";
import Groups2Rounded from "@mui/icons-material/Groups2Rounded";
import SubscriptionsRounded from "@mui/icons-material/SubscriptionsRounded";
import DoNotDisturbOnRounded from "@mui/icons-material/DoNotDisturbOnRounded";
import BarChartRounded from "@mui/icons-material/BarChartRounded";

import Statscard from "../../../shared/components/Statscard";
import TrendChart from "../../../shared/components/TrendChart";
import DonutRow from "../../../shared/components/DonutRow";

import { useDispatch, useSelector } from "react-redux";
import { getallcustomers, selectallcustomer } from "../slice/Customerslice";

export default function Stats() {
  const dispatch = useDispatch();
  const apiPayload = useSelector(selectallcustomer); // {status, message, data:{items,totalItemsCount}}

  useEffect(() => {
    dispatch(getallcustomers());
  }, [dispatch]);

  // ---------- Parse ----------
  const customers = apiPayload?.data?.items ?? [];
  const total = apiPayload?.data?.totalItemsCount ?? customers.length;

  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const startOfThisMonth = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
  }, []);
  const endOfPrevMonth = startOfThisMonth - 1;

  const daysLeft = (ms) =>
    typeof ms === "number" ? Math.ceil((ms - now) / oneDay) : null;

  // ---------- Helpers ----------
  const pctChange = (nowV, prevV) => {
    if (!Number.isFinite(prevV) || prevV === 0) return nowV > 0 ? 100 : 0;
    const pct = ((nowV - prevV) / prevV) * 100;
    // round to 2 decimals reliably
    return Math.round((pct + Number.EPSILON) * 100) / 100;
  };

  const formatChange = (pct) =>
    `${pct > 0 ? "+" : ""}${Math.abs(pct).toFixed(2)}% vs last month`;

  const dirFrom = (diff) => (diff > 0 ? "up" : diff < 0 ? "down" : "flat");

  const monthKeyFromMs = (ms) => {
    if (typeof ms !== "number") return null;
    const d = new Date(ms);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  const existedBy = (c, ms) =>
    typeof c.registrationTime === "number" && c.registrationTime <= ms;

  // ---------- Trend chart (last 12 months) ----------
  const TREND = useMemo(() => {
    const base = new Date();
    const monthKeys = [];
    const labels = [];
    const onboardedMap = {};
    const expiredMap = {};

    for (let i = 11; i >= 0; i--) {
      const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      monthKeys.push(key);
      labels.push(d.toLocaleString('en-US', { month: "short" })); // Jan, Feb...
      onboardedMap[key] = 0;
      expiredMap[key] = 0;
    }

    for (const c of customers) {
      const regKey = monthKeyFromMs(c.registrationTime);
      if (regKey && regKey in onboardedMap && c.registrationTime <= now) {
        onboardedMap[regKey] += 1;
      }
      if (typeof c.expiryTime === "number" && c.expiryTime <= now) {
        const expKey = monthKeyFromMs(c.expiryTime);
        if (expKey && expKey in expiredMap) {
          expiredMap[expKey] += 1;
        }
      }
    }

    return monthKeys.map((k, idx) => ({
      month: labels[idx],
      onboarded: onboardedMap[k],
      expired: expiredMap[k],
    }));
  }, [customers, now]);

  // ---------- Current snapshot counts ----------
  const activeNow = useMemo(
    () =>
      customers.filter(
        (c) => typeof c.expiryTime === "number" && c.expiryTime > now
      ).length,
    [customers, now]
  );
  const inactiveNow = customers.length - activeNow;

  // ---------- "As of end of previous month" snapshots (fixed) ----------
  const totalPrev = useMemo(
    () =>
      customers.filter(
        (c) =>
          typeof c.registrationTime === "number" &&
          c.registrationTime <= endOfPrevMonth
      ).length,
    [customers, endOfPrevMonth]
  );

  const activePrev = useMemo(
    () =>
      customers.filter(
        (c) =>
          existedBy(c, endOfPrevMonth) &&
          typeof c.expiryTime === "number" &&
          c.expiryTime > endOfPrevMonth
      ).length,
    [customers, endOfPrevMonth]
  );

  const inactivePrev = useMemo(
    () =>
      customers.filter(
        (c) =>
          existedBy(c, endOfPrevMonth) &&
          typeof c.expiryTime === "number" &&
          c.expiryTime <= endOfPrevMonth
      ).length,
    [customers, endOfPrevMonth]
  );

  const totalLimitNow = useMemo(
    () => customers.reduce((s, c) => s + Number(c.deviceLimit || 0), 0),
    [customers]
  );

  const totalLimitPrev = useMemo(
    () =>
      customers
        .filter((c) => existedBy(c, endOfPrevMonth))
        .reduce((s, c) => s + Number(c.deviceLimit || 0), 0),
    [customers, endOfPrevMonth]
  );

  // ---------- MoM change numbers ----------
  const totalDiff = total - totalPrev;
  const totalPct = pctChange(total, totalPrev);

  const activeDiff = activeNow - activePrev;
  const activePct = pctChange(activeNow, activePrev);

  const inactiveDiff = inactiveNow - inactivePrev;
  const inactivePct = pctChange(inactiveNow, inactivePrev);

  const limitDiff = totalLimitNow - totalLimitPrev;
  const limitPct = pctChange(totalLimitNow, totalLimitPrev);

  // ---------- Cards with MoM ----------
  const cards = [
    {
      title: "Total Customers",
      value: total,
      icon: <Groups2Rounded />,
      changeValue: Math.abs(totalPct),
      changeText: formatChange(totalPct),
      direction: dirFrom(totalDiff),
      color: "#5E6AD2",
    },
    {
      title: "Active Subscription",
      value: activeNow, // expiry > now
      icon: <SubscriptionsRounded />,
      changeValue: Math.abs(activePct),
      changeText: formatChange(activePct),
      direction: dirFrom(activeDiff),
      color: "#7C4DFF",
    },
    {
      title: "Inactive Subscription",
      value: inactiveNow, // expiry <= now
      icon: <DoNotDisturbOnRounded />,
      changeValue: Math.abs(inactivePct),
      changeText: formatChange(inactivePct),
      direction: dirFrom(inactiveDiff),
      color: "#7E57C2",
    },
    {
      title: "Total Limit",
      value: totalLimitNow,
      icon: <BarChartRounded />,
      changeValue: Math.abs(limitPct),
      changeText: formatChange(limitPct),
      direction: dirFrom(limitDiff),
      color: "#3F76F6",
    },
  ];

  // ---------- Donuts (broader status mapping) ----------
  const ACTIVE_SET = new Set([
    "customer.active",
    "customer.client",
    "customer.developer",
  ]);
  const NEW_SET = new Set(["customer.new", "customer.onpremise.trial"]);
  const INACTIVE_SET = new Set([
    "customer.expired",
    "customer.pause",
    "customer.denial",
    "customer.abandon",
    "customer.need.followup",
    "customer.followup.sent",
    "customer.no.signin",
    "customer.internal.test",
  ]);

  const donuts = useMemo(() => {
    let lt5 = 0,
      d5to15 = 0,
      gte30 = 0,
      expiredAlready = 0;
    let activeStatus = 0,
      newc = 0,
      inactiveStatus = 0;
    let trial = 0,
      pro = 0,
      enterprise = 0;

    for (const c of customers) {
      // expiry windows
      const dl = daysLeft(c.expiryTime);
      if (dl !== null) {
        if (dl < 0) expiredAlready++;
        else if (dl < 5) lt5++;
        else if (dl <= 15) d5to15++;
        else if (dl >= 30) gte30++;
      }

      // status buckets
      if (ACTIVE_SET.has(c.customerStatus)) activeStatus++;
      else if (NEW_SET.has(c.customerStatus)) newc++;
      else if (INACTIVE_SET.has(c.customerStatus)) inactiveStatus++;

      // plan types
      if (c.accountType === 0) trial++;
      else if (c.accountType === 1) pro++;
      else if (c.accountType === 2) enterprise++;
    }

    return [
      {
        total: lt5 + d5to15 + gte30 + expiredAlready,
        slices: [
          { name: "Expired", value: expiredAlready, color: "#9CA3AF" },
          { name: "<5 Days", value: lt5, color: "#EF4444" },
          { name: "5–15 Days", value: d5to15, color: "#F59E0B" },
          { name: "≥1 month", value: gte30, color: "#22C55E" },
        ],
      },
      {
        total: activeStatus + newc + inactiveStatus,
        slices: [
          { name: "Active", value: activeStatus, color: "#22C55E" },
          { name: "New", value: newc, color: "#4F46E5" },
          { name: "Inactive", value: inactiveStatus, color: "#9CA3AF" },
        ],
      },
      {
        total: trial + pro + enterprise,
        slices: [
          { name: "Trial", value: trial, color: "#F0ABFC" },
          { name: "Professional", value: pro, color: "#4F46E5" },
          { name: "Enterprise", value: enterprise, color: "#10B981" },
        ],
      },
    ];
  }, [customers]);

  return (
    <>
      <Statscard items={cards} />
      
      <TrendChart
        data={TREND}
        title="Customer Onboarding vs Expiry (last 12 months)"
        colors={{ onboarded: "#10B981", expired: "#6366F1" }}
      />
      <DonutRow title="Subscriptions & Expiry" charts={donuts} height={240} />
    </>
  );
}
