const tilISO = (d) => d.toISOString().slice(0, 16);

document.addEventListener('DOMContentLoaded', () => {
    const felt = document.getElementById('tidspunkt');
    const fraBy = document.getElementById('by');
    const tilBy = document.getElementById('by1');
    const knap = document.getElementById('bekraeft-knap');
    const vis = document.getElementById('vis-dato');

    //Opsætning, gemmefunktion
    if (felt && knap) {
        konfigDato(felt);

        knap.onclick = () => {
            const fejlTekst = document.getElementById('fejl-tekst');
            const modal = document.getElementById('bekraeft-modal');
            const modalData = document.getElementById('modal-data');

            if (!felt.value) { //js skal have dette, da det er kodet til at override html
                //Vis tekst i popup
                fejlTekst.textContent = "⚠️ Hov! Du skal lige vælge dato og tid først.";
                //Vis boksen
                fejlTekst.style.display = 'block';
                //ryst knappen
                knap.style.backgroundColor = "darkred";
                setTimeout(() => knap.style.backgroundColor = "forestgreen", 500);
                return;
            }
            fejlTekst.style.display = "none";

            const datoObjekt = new Date(felt.value);
            const datoFormat = datoObjekt.toLocaleDateString('da-DK', {
                day: 'numeric', month: 'long', year: 'numeric'
            });
            const tidsFormat = datoObjekt.toLocaleTimeString('da-DK', {
                hour: '2-digit', minute: '2-digit'
            });
            localStorage.setItem('valgtDato', felt.value);
            localStorage.setItem('by', fraBy.value);
            localStorage.setItem('by1', tilBy.value);

            modalData.innerHTML = `
            <p><strong>Fra:</strong> ${fraBy.value}</p>
            <p><strong>Til:</strong> ${tilBy.value}</p>
            <p><strong>Dato:</strong> ${datoFormat}</p>
            <p><strong>Tid:</strong> ${tidsFormat}</p>
            `;
             // --- VIS MODAL ---
            modal.style.display = "block";
            document.querySelector('.luk-kryds').onclick = () => modal.style.display = "none";
            document.getElementById('modal-ok-knap').onclick = () => {
                alert("Turen er gemt"); //her kan sendes til java
                modal.style.display = "none";
            }
        };
    }
    //visning af side
    if (vis) {
        const datoRaw = localStorage.getItem('valgtDato');
        const fra = localStorage.getItem('by');
        const til = localStorage.getItem('by1');

        if (datoRaw && fra && til) {
            const datoObjekt = new Date(datoRaw);
            //Formatering til pænt datoformat:
            const datoFormat = datoObjekt.toLocaleDateString('da-DK', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            //formatering af tid:
            const tidsFormat = datoObjekt.toLocaleTimeString('da-DK', {
                hour: '2-digit',
                minute: '2-digit'
            });

            vis.innerHTML = `
        <p><strong>Fra:</strong> ${fra}</p>
        <p><strong>Til:</strong> ${til}</p>
        <p><strong>Tidspunkt og dato:</strong><br> 
        Dato: ${datoFormat}<br>
        kl.: ${tidsFormat}</p>
    `;
        }
    }
});

function konfigDato(felt) {
    const nu = new Date();
    felt.min = tilISO(nu);
    const maxDato = new Date();
    maxDato.setFullYear(nu.getFullYear() + 2);
    felt.max = tilISO(maxDato);
}