#!/usr/bin/env python3
"""
Israel Rueda Ballet - Validation Script
Validates all HTML pages for:
- No 404 errors on media assets
- No console errors
- Page renders correctly
"""

import asyncio
import os
from pathlib import Path
from playwright.async_api import async_playwright

async def validate_page(page, url, page_name):
    """Validate a single page"""
    errors = []
    media_errors = []

    console_messages = []

    async def handle_console(msg):
        if msg.type == 'error':
            console_messages.append(f"Console Error: {msg.text}")

    page.on('console', handle_console)

    try:
        print(f"  Loading {page_name}...")
        response = await page.goto(url, wait_until='domcontentloaded', timeout=30000)

        if response.status != 200:
            errors.append(f"{page_name}: HTTP {response.status}")

        # Wait for page to load
        await page.wait_for_load_state('networkidle', timeout=10000)

        # Check for media 404s
        images = await page.query_selector_all('img')
        for img in images:
            src = await img.get_attribute('src')
            if src and not src.startswith('data:') and not src.startswith('http'):
                full_path = Path(f"/workspace/israel-rueda-ballet/{src}")
                if not full_path.exists():
                    media_errors.append(f"Image not found: {src}")

        # Check video sources
        videos = await page.query_selector_all('video source')
        for video in videos:
            src = await video.get_attribute('src')
            if src:
                full_path = Path(f"/workspace/israel-rueda-ballet/{src}")
                if not full_path.exists():
                    media_errors.append(f"Video not found: {src}")

        # Check CSS and JS files
        styles = await page.query_selector_all('link[rel="stylesheet"]')
        for style in styles:
            href = await style.get_attribute('href')
            if href and not href.startswith('http') and not href.startswith('https'):
                full_path = Path(f"/workspace/israel-rueda-ballet/{href}")
                if not full_path.exists():
                    media_errors.append(f"CSS not found: {href}")

        scripts = await page.query_selector_all('script[src]')
        for script in scripts:
            src = await script.get_attribute('src')
            if src and not src.startswith('http'):
                full_path = Path(f"/workspace/israel-rueda-ballet/{src}")
                if not full_path.exists():
                    media_errors.append(f"JS not found: {src}")

        if console_messages:
            errors.extend(console_messages)

    except Exception as e:
        errors.append(f"{page_name}: {str(e)}")

    return {
        'page': page_name,
        'errors': errors,
        'media_errors': media_errors,
        'console_errors': console_messages
    }

async def main():
    """Main validation function"""
    print("=" * 60)
    print("Israel Rueda Ballet - Site Validation")
    print("=" * 60)

    base_path = "/workspace/israel-rueda-ballet"
    pages = [
        ('index.html', 'Inicio'),
        ('clases.html', 'Clases'),
        ('alquiler.html', 'Alquiler'),
        ('contacto.html', 'Contacto')
    ]

    results = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        for filename, page_name in pages:
            file_path = f"file://{base_path}/{filename}"
            result = await validate_page(page, file_path, page_name)
            results.append(result)

        await browser.close()

    # Print results
    print("\n" + "=" * 60)
    print("VALIDATION RESULTS")
    print("=" * 60)

    total_errors = 0
    total_media_errors = 0

    for result in results:
        print(f"\n📄 {result['page']}:")
        if result['media_errors']:
            print(f"  ⚠️  Media Errors ({len(result['media_errors'])}):")
            for err in result['media_errors']:
                print(f"      - {err}")
            total_media_errors += len(result['media_errors'])
        if result['console_errors']:
            print(f"  ⚠️  Console Errors ({len(result['console_errors'])}):")
            for err in result['console_errors']:
                print(f"      - {err}")
            total_errors += len(result['console_errors'])
        if not result['media_errors'] and not result['console_errors']:
            print(f"  ✅ No errors found")

    print("\n" + "=" * 60)
    print(f"SUMMARY: {len(results)} pages checked")
    print(f"Media Errors: {total_media_errors}")
    print(f"Console Errors: {total_errors}")
    print("=" * 60)

    if total_errors == 0 and total_media_errors == 0:
        print("\n✅ All pages passed validation!")
        return 0
    else:
        print("\n⚠️  Some issues found - please review above")
        return 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    exit(exit_code)
