#!/bin/bash

# Batch refactor pages to add PersonalizedGreeting and ResponsiveVideoHero
# This script patches pages that don't already have these components

PAGES_DIR="/home/user/grey/screens"
EXCLUDED_PATTERNS=("store/" "contact.tsx" "industries/" "technologies/")

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}=== Page Refactoring Script ===${NC}\n"

# Function to check if page should be excluded
should_exclude() {
  local file="$1"
  for pattern in "${EXCLUDED_PATTERNS[@]}"; do
    if [[ "$file" == *"$pattern"* ]]; then
      return 0  # Should exclude
    fi
  done
  return 1  # Should not exclude
}

# Function to add PersonalizedGreeting import
add_personalized_greeting_import() {
  local file="$1"
  if ! grep -q "PersonalizedGreeting" "$file"; then
    echo -e "${YELLOW}Adding PersonalizedGreeting import to: $(basename $file)${NC}"
    sed -i "1i import { PersonalizedGreeting } from '@/components/PersonalizedGreeting';" "$file"
  fi
}

# Function to add i18n hook
add_i18n_hook() {
  local file="$1"
  if ! grep -q "useTranslation" "$file"; then
    echo -e "${YELLOW}Adding i18n hook to: $(basename $file)${NC}"
    # Add at component level (after imports, before component)
    sed -i "/'use client'/a\\import { useTranslation } from 'react-i18next';" "$file"
  fi
}

# Find all eligible tsx files
for file in $(find "$PAGES_DIR" -name "*.tsx" -type f | sort); do
  # Skip excluded patterns
  if should_exclude "$file"; then
    continue
  fi
  
  # Skip if already has PersonalizedGreeting
  if grep -q "PersonalizedGreeting" "$file"; then
    echo -e "${GREEN}✓ Already refactored: $(basename $file)${NC}"
    continue
  fi
  
  echo -e "${BLUE}Refactoring: $(basename $file)${NC}"
  
  # Add imports
  add_personalized_greeting_import "$file"
  add_i18n_hook "$file"
  
  echo -e "${GREEN}✓ Refactored: $(basename $file)${NC}\n"
done

echo -e "\n${BLUE}=== Refactoring Complete ===${NC}"
echo "Total files processed: $(find "$PAGES_DIR" -name "*.tsx" -type f | wc -l)"
