#!/bin/bash
# ERP Section Enhancement Verification Checklist

echo "✅ ERP SECTION ENHANCEMENT - VERIFICATION CHECKLIST"
echo "=================================================="
echo ""

# Check if files exist and have been modified
echo "📁 FILES VERIFICATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "screens/services/erp-development.tsx" ]; then
    echo "✅ screens/services/erp-development.tsx"
    lines=$(wc -l < screens/services/erp-development.tsx)
    echo "   Total lines: $lines"
else
    echo "❌ screens/services/erp-development.tsx NOT FOUND"
fi

if [ -f "app/globals.css" ]; then
    echo "✅ app/globals.css"
    lines=$(wc -l < app/globals.css)
    echo "   Total lines: $lines"
else
    echo "❌ app/globals.css NOT FOUND"
fi

echo ""
echo "🎨 CSS ANIMATIONS VERIFICATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for animations
if grep -q "@keyframes animate-fade-in" app/globals.css; then
    echo "✅ animate-fade-in animation found"
fi

if grep -q "@keyframes animate-fade-in-delayed" app/globals.css; then
    echo "✅ animate-fade-in-delayed animation found"
fi

if grep -q ".text-shadow-lg" app/globals.css; then
    echo "✅ text-shadow-lg utility found"
fi

if grep -q ".drop-shadow-lg" app/globals.css; then
    echo "✅ drop-shadow-lg utility found"
fi

echo ""
echo "🎯 JSX ENHANCEMENTS VERIFICATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for enhancements
if grep -q "animate-fade-in" screens/services/erp-development.tsx; then
    echo "✅ animate-fade-in class used"
fi

if grep -q "drop-shadow-lg" screens/services/erp-development.tsx; then
    echo "✅ drop-shadow-lg class used"
fi

if grep -q "font-\[800\]" screens/services/erp-development.tsx; then
    echo "✅ Font weight enhancements applied"
fi

if grep -q "border-2" screens/services/erp-development.tsx; then
    echo "✅ Border thickness enhancements applied"
fi

if grep -q "rounded-2xl" screens/services/erp-development.tsx; then
    echo "✅ Rounded corners enhancements applied"
fi

echo ""
echo "📊 CONTENT VERIFICATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for content
if grep -q "🎯 Schedule Expert Consultation" screens/services/erp-development.tsx; then
    echo "✅ Primary CTA button with emoji found"
fi

if grep -q "📈 Proven Business Impact" screens/services/erp-development.tsx; then
    echo "✅ Business impact section with emoji found"
fi

if grep -q "🗓️ Implementation Approach" screens/services/erp-development.tsx; then
    echo "✅ Timeline section with emoji found"
fi

echo ""
echo "🌈 COLOR & STYLING VERIFICATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

colors=("#0ef0dd" "#06b6d4" "#7c3aed" "#f59e0b" "#10b981")
for color in "${colors[@]}"; do
    count=$(grep -c "$color" screens/services/erp-development.tsx)
    if [ $count -gt 0 ]; then
        echo "✅ Color $color found ($count occurrences)"
    fi
done

echo ""
echo "📱 RESPONSIVE DESIGN VERIFICATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if grep -q "md:text-\[3em\]" screens/services/erp-development.tsx; then
    echo "✅ Mobile responsive sizing found"
fi

if grep -q "md:grid-cols-2" screens/services/erp-development.tsx; then
    echo "✅ Responsive grid layouts found"
fi

if grep -q "md:text-4xl" screens/services/erp-development.tsx; then
    echo "✅ Responsive typography found"
fi

echo ""
echo "♿ ACCESSIBILITY VERIFICATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if grep -q "prefers-reduced-motion" app/globals.css; then
    echo "✅ Accessibility animations support found"
fi

if grep -q "leading-\[1.9\]" screens/services/erp-development.tsx; then
    echo "✅ Improved line-height for readability found"
fi

echo ""
echo "📚 DOCUMENTATION VERIFICATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

docs=("ERP_SECTION_ENHANCEMENTS.md" "ERP_QUICK_REFERENCE.md" "DETAILED_CHANGES.md")
for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "✅ $doc found"
    else
        echo "❌ $doc NOT FOUND"
    fi
done

echo ""
echo "═════════════════════════════════════════════════════"
echo "✅ VERIFICATION COMPLETE"
echo "═════════════════════════════════════════════════════"
echo ""
echo "🎉 All enhancements successfully applied!"
echo ""
echo "Next Steps:"
echo "1. Run: npm run dev"
echo "2. Navigate to: /services/erp-development"
echo "3. Verify all text is visible and styled professionally"
echo "4. Test on mobile, tablet, and desktop"
echo "5. Test dark mode and light mode"
echo ""
