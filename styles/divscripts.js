const tilISO = (d) => d.toISOString().slice(0, 16);

document.addEventListener('DOMContentLoaded', () => {
    const felt = document.getElementById('tidspunkt');
    const fraBy = document.getElementById('by');
    const tilBy = document.getElementById('by1');
    const knap = document.getElementById('bekraet-knap');
    const vis = document.getElementById('vis-dato');

    //Opsætning, gemmefunktion
    if (felt && knap) {
        konfigDato(felt);

        knap.onclick = () => {
            if (!felt.value) { //js skal have dette, da det er kodet til at override html
                alert("Hov! Du skal lige vælge dato og tid først");
                return;
            }
            localStorage.setItem('valgtDato', felt.value);
            localStorage.setItem('by', fraBy.value);
            localStorage.setItem('by1', tilBy.value);
            window.location.href = "tilbyder_validering.html";
        };
    }
    //visning af side
    if (vis) {
        const dato = localStorage.getItem('valgtDato');
        const fra = localStorage.getItem('by');
        const til = localStorage.getItem('by1');

        if (dato && fra && til) {
            const enPaenDato = new Date(dato).toLocaleString('da-DK');
            vis.innerHTML = `
        <p><strong>Fra:</strong> ${fra}</p>
        <p><strong>Til:</strong> ${til}</p>
        <p><strong>Tidspunkt og dato:</strong><br> ${enPaenDato}</p>
    `;
        }
    }
});

function konfigDato(felt) {
    const nu = new Date();
    felt.min = tilISO(nu);
    nu.setFullYear(nu.getFullYear() + 2);
    felt.max = tilISO(nu);
}