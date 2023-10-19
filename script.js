// JavaScript: Header-Inhalt abrufen und einfügen
fetch('header.html')
.then(response => response.text())
.then(data => {
                document.getElementById('header').innerHTML = data;
});

// JavaScript: Footer-Inhalt abrufen und einfügen
fetch('footer.html')
.then(response => response.text())
.then(data => {
                document.getElementById('footer').innerHTML = data;
});