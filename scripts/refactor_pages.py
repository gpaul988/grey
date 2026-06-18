#!/usr/bin/env python3
"""
Batch refactor grey.git pages to add:
1. PersonalizedGreeting component
2. i18n translations support
3. ResponsiveVideoHero (if using raw video tag)
"""

import os
import re
from pathlib import Path

SCREENS_DIR = Path("/home/user/grey/screens")
EXCLUDED_PATTERNS = ["store/", "contact.tsx", "industries/", "technologies/"]

# Pages that should have PersonalizedGreeting + i18n
ELIGIBLE_PAGES = [
    "Home.tsx",
    "blog.tsx",
    "blog/[slug].tsx",
    "case-studies.tsx",
    "case-studies/[slug].tsx",
    "company.tsx",
    "careers.tsx",
    "audit.tsx",
    "faq.tsx",
    "partners.tsx",
    "portfolio.tsx",
    "quote-request.tsx",
    "support.tsx",
    "Startups.tsx",
    "Our-Approach.tsx",
    "Links.tsx",
    "Form.tsx",
    "open-ticket.tsx",
    "feeling.tsx",
]

# All service pages
SERVICE_PAGES = [
    "IoT-Development.tsx",
    "Javascript.tsx",
    "Laravel-Development.tsx",
    "MVP.tsx",
    "Mobile-Application-Development.tsx",
    "Net-Development.tsx",
    "Nextjs-Development.tsx",
    "Nodejs-Development.tsx",
    "PHP-Development.tsx",
    "Python-Development.tsx",
    "React-Native-Development.tsx",
    "Reactjs-Development.tsx",
    "Ruby-on-Rails.tsx",
    "Social-Networking.tsx",
    "Software-Development.tsx",
    "Typescript.tsx",
    "Vuejs-Development.tsx",
    "Web-Application.tsx",
    "Web-Design.tsx",
    "Web-Development.tsx",
    "ai-development-services.tsx",
    "android-development.tsx",
    "angular-development.tsx",
    "app-store-optimization.tsx",
    "backend-development.tsx",
    "blockchain-development.tsx",
    "branding.tsx",
    "cms-development.tsx",
    "crm-development.tsx",
    "cross-platform-development.tsx",
    "digital-marketing.tsx",
    "discovery-phase.tsx",
    "erp-development.tsx",
    "flutter-development.tsx",
    "frontend-development.tsx",
    "hybrid-app-development.tsx",
    "ios-development.tsx",
    "seo.tsx",
    "ui-ux-design.tsx",
    "unity-development.tsx",
]


def should_exclude(filepath: str) -> bool:
    """Check if file matches excluded patterns."""
    for pattern in EXCLUDED_PATTERNS:
        if pattern in filepath:
            return True
    return False


def has_personalized_greeting(content: str) -> bool:
    """Check if file already imports PersonalizedGreeting."""
    return "PersonalizedGreeting" in content or "PersonalizationProvider" in content


def has_i18n(content: str) -> bool:
    """Check if file already imports i18n."""
    return "useTranslation" in content or "i18n" in content


def add_personalized_greeting_import(content: str) -> str:
    """Add PersonalizedGreeting import if missing."""
    if has_personalized_greeting(content):
        return content

    # Find the right place to add import (after 'use client')
    if "'use client';" in content:
        content = content.replace(
            "'use client';",
            "'use client';\n\nimport { PersonalizedGreeting } from '@/components/PersonalizedGreeting';",
            1,
        )
    elif '"use client";' in content:
        content = content.replace(
            '"use client";',
            '"use client";\n\nimport { PersonalizedGreeting } from "@/components/PersonalizedGreeting";',
            1,
        )
    else:
        # Add at the top after first import
        content = re.sub(
            r"(import [^\n]+;)",
            r"\1\n\nimport { PersonalizedGreeting } from '@/components/PersonalizedGreeting';",
            content,
            count=1,
        )

    return content


def add_i18n_hook(content: str) -> str:
    """Add useTranslation hook if missing."""
    if has_i18n(content):
        return content

    # Add import
    if "'use client';" in content:
        content = content.replace(
            "'use client';",
            "'use client';\n\nimport { useTranslation } from 'react-i18next';",
            1,
        )
    else:
        content = re.sub(
            r"(import [^\n]+;)",
            r"\1\n\nimport { useTranslation } from 'react-i18next';",
            content,
            count=1,
        )

    # Add hook call inside component (after component declaration)
    # Look for "const ComponentName = () => {" pattern
    component_pattern = r"(const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{)"

    def add_hook_to_component(match):
        return match.group(1) + "\n  const { t, i18n } = useTranslation('common');"

    content = re.sub(component_pattern, add_hook_to_component, content, count=1)

    return content


def refactor_page(filepath: str) -> bool:
    """Refactor a single page."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content

        # Skip if already refactored
        if has_personalized_greeting(content) and has_i18n(content):
            print(f"✓ Already refactored: {Path(filepath).name}")
            return False

        # Add imports and hooks
        if not has_personalized_greeting(content):
            content = add_personalized_greeting_import(content)
            print(f"  + Added PersonalizedGreeting import")

        if not has_i18n(content):
            content = add_i18n_hook(content)
            print(f"  + Added i18n hook")

        # Write back if changed
        if content != original_content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"✓ Refactored: {Path(filepath).name}")
            return True
        else:
            print(f"- No changes needed: {Path(filepath).name}")
            return False

    except Exception as e:
        print(f"✗ Error processing {filepath}: {e}")
        return False


def main():
    print("=" * 60)
    print("  PHASE 7: PAGE REFACTORING")
    print("=" * 60)
    print()

    # Get all eligible pages
    all_eligible = ELIGIBLE_PAGES + [f"services/{page}" for page in SERVICE_PAGES]

    refactored = 0
    skipped = 0

    for page_path in all_eligible:
        full_path = SCREENS_DIR / page_path

        if should_exclude(str(full_path)):
            print(f"⊘ Excluded: {page_path}")
            skipped += 1
            continue

        if full_path.exists():
            if refactor_page(str(full_path)):
                refactored += 1
            else:
                skipped += 1
        else:
            print(f"✗ Not found: {page_path}")

    print()
    print("=" * 60)
    print(f"Summary: {refactored} refactored, {skipped} skipped/unchanged")
    print("=" * 60)


if __name__ == "__main__":
    main()
