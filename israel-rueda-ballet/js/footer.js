document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('footer.footer');
    if (!footer) return;

    fetch('fragments/footer.html')
        .then(function (res) { return res.text(); })
        .then(function (html) { footer.outerHTML = html; });
});
