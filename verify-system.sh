#!/bin/bash

# End-to-End System Verification Script
# This script tests all critical endpoints and functionality

echo "🔍 Vendor Management System - End-to-End Verification"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Backend URL
BACKEND_URL="https://carbon-theorem-474515-b2.et.r.appspot.com"
FRONTEND_URL="https://santirio18-cmyk.github.io/Visitor-Management-System/"

# Test counter
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local method=$2
    local url=$3
    local data=$4
    local expected_status=$5
    
    echo -n "Testing $name... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$url")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$url" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "$expected_status" ]; then
        echo -e "${GREEN}✅ PASS${NC} (HTTP $http_code)"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC} (Expected HTTP $expected_status, got HTTP $http_code)"
        echo "   Response: $body"
        ((FAILED++))
        return 1
    fi
}

# 1. Health Check
echo "1️⃣  Testing Backend Health..."
test_endpoint "Health Check" "GET" "$BACKEND_URL/api/health" "" "200"
echo ""

# 2. API Root
echo "2️⃣  Testing API Root..."
test_endpoint "API Root" "GET" "$BACKEND_URL/" "" "200"
echo ""

# 3. Manager Login
echo "3️⃣  Testing Manager Login..."
LOGIN_DATA='{"email":"manager@warehouse.com","password":"manager123"}'
LOGIN_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
    -H "Content-Type: application/json" \
    -d "$LOGIN_DATA")

if echo "$LOGIN_RESPONSE" | grep -q "token"; then
    echo -e "${GREEN}✅ PASS${NC} - Manager login successful"
    TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    ((PASSED++))
else
    echo -e "${RED}❌ FAIL${NC} - Manager login failed"
    echo "   Response: $LOGIN_RESPONSE"
    TOKEN=""
    ((FAILED++))
fi
echo ""

# 4. Get Requests (if logged in)
if [ -n "$TOKEN" ]; then
    echo "4️⃣  Testing Get Requests (Authenticated)..."
    test_endpoint "Get Requests" "GET" "$BACKEND_URL/api/requests" "" "200" \
        -H "Authorization: Bearer $TOKEN"
    echo ""
fi

# 5. Frontend Accessibility
echo "5️⃣  Testing Frontend Accessibility..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL")
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Frontend is accessible (HTTP $FRONTEND_STATUS)"
    ((PASSED++))
else
    echo -e "${RED}❌ FAIL${NC} - Frontend not accessible (HTTP $FRONTEND_STATUS)"
    ((FAILED++))
fi
echo ""

# Summary
echo "=================================================="
echo "📊 Test Summary:"
echo -e "   ${GREEN}Passed: $PASSED${NC}"
echo -e "   ${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! System is operational.${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed. Please check the output above.${NC}"
    exit 1
fi


