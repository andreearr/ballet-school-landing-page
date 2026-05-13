#!/usr/bin/env python3
"""Simple HTML validation without Playwright - Fixed"""
import re
from pathlib import Path

def check_html_file(filepath):
    """Check HTML file for common issues"""
    issues = []

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check for broken image references
    img_pattern = r'<img[^>]+src=["\']([^"\']+)["\']'
    images = re.findall(img_pattern, content)
    for img in images:
        if not img.startswith('http') and not img.startswith('data:') and not img.startswith('//'):
            img_path = Path(f"/workspace/israel-rueda-ballet/{img}")
            if not img_path.exists():
                issues.append(f"Missing image: {img}")

    # Check for broken CSS/JS references
    css_pattern = r'<link[^>]+href=["\']([^"\']+)["\']'
    css_files = re.findall(css_pattern, content)
    for css in css_files:
        if css.startswith('css/'):
            css_path = Path(f"/workspace/israel-rueda-ballet/{css}")
            if not css_path.exists():
                issues.append(f"Missing CSS: {css}")

    js_pattern = r'<script[^>]+src=["\']([^"\']+)["\']'
    js_files = re.findall(js_pattern, content)
    for js in js_files:
        if js.startswith('js/'):
            js_path = Path(f"/workspace/israel-rueda-ballet/{js}")
            if not js_path.exists():
                issues.append(f"Missing JS: {js}")

    # Check for WhatsApp links
    if 'wa.me' not in content:
        issues.append("Missing WhatsApp link")

    return issues

def main():
    base_path = "/workspace/israel-rueda-ballet"
    pages = ['index.html', 'clases.html', 'alquiler.html', 'contacto.html']

    print("=" * 60)
    print("Israel Rueda Ballet - HTML Validation")
    print("=" * 60)

    all_ok = True
    for page in pages:
        filepath = f"{base_path}/{page}"
        print(f"\n📄 {page}:")
        issues = check_html_file(filepath)
        if issues:
            for issue in issues:
                print(f"  ⚠️  {issue}")
            all_ok = False
        else:
            print(f"  ✅ No issues found - all resources valid")

    print("\n" + "=" * 60)
    if all_ok:
        print("✅ All HTML files passed validation!")
    else:
        print("⚠️  Some issues found")
    print("=" * 60)

    return 0 if all_ok else 1

if __name__ == "__main__":
    exit(main())
