#!/bin/bash

# Quick Performance Test Script
# Tests basic metrics for northernbadiatours.com

echo "🚀 Testing Website Performance..."
echo "=================================="
echo ""

DOMAIN="https://northernbadiatours.com"

# Test 1: Response Time
echo "📊 Response Time Test:"
RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}" $DOMAIN)
echo "   Total Time: ${RESPONSE_TIME}s"
echo ""

# Test 2: HTTP Status
echo "📡 HTTP Status Check:"
HTTP_CODE=$(curl -o /dev/null -s -w "%{http_code}" $DOMAIN)
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Site is accessible (HTTP $HTTP_CODE)"
else
    echo "   ⚠️  HTTP Status: $HTTP_CODE"
fi
echo ""

# Test 3: DNS Resolution Time
echo "🌐 DNS Resolution:"
DNS_TIME=$(curl -o /dev/null -s -w "%{time_namelookup}" $DOMAIN)
echo "   DNS Lookup: ${DNS_TIME}s"
echo ""

# Test 4: Connection Time
echo "🔌 Connection Time:"
CONNECT_TIME=$(curl -o /dev/null -s -w "%{time_connect}" $DOMAIN)
echo "   Connect: ${CONNECT_TIME}s"
echo ""

# Test 5: SSL Handshake
echo "🔒 SSL Handshake:"
SSL_TIME=$(curl -o /dev/null -s -w "%{time_appconnect}" $DOMAIN)
echo "   SSL: ${SSL_TIME}s"
echo ""

# Test 6: Start Transfer
echo "📥 Start Transfer:"
START_TRANSFER=$(curl -o /dev/null -s -w "%{time_starttransfer}" $DOMAIN)
echo "   Start Transfer: ${START_TRANSFER}s"
echo ""

echo "=================================="
echo "✅ Basic tests complete!"
echo ""
echo "💡 For detailed performance analysis:"
echo "   1. Use Hostinger Page Speed tool (hPanel)"
echo "   2. Use Google PageSpeed Insights:"
echo "      https://pagespeed.web.dev/?url=$DOMAIN"
echo "   3. Use GTmetrix: https://gtmetrix.com/"
echo ""

