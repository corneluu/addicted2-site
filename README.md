# Addicted2 Romania — site de prezentare

Site static pentru serverul de Minecraft **Addicted2 Romania** (`play.addicted2.ro`): un singur server, Cracked + Premium, Java 1.8 – latest, cu SMP, Survival OP, Box PvP și BedWars.

Fără framework și fără build. Merge direct pe GitHub Pages așa cum e. Forumul nu mai e folosit de site.

## Ce e în folder

| Fișier | La ce folosește |
|---|---|
| `index.html` | Toată pagina (textele în română). CSS-ul primului ecran e scris direct în `<head>`. |
| `css/style.css` | Restul stilului (se încarcă fără să blocheze pagina). |
| `js/main.js` | Setările (sus de tot), traducerea EN, copierea IP-ului, statusul live, Discord, anunțuri și echipă. |
| `data/site.json` | **Anunțurile și echipa.** Singurul fișier pe care îl editezi des. |
| `img/` | Logo (`logo-320.webp`, `logo-640.webp`, `logo-640.png`), `og.png` (poza la share), `favicon.png`. |
| `fonts/russo-one.woff2` | Fontul titlurilor (5 KB, cu diacritice ă â î ș ț). |
| `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `.nojekyll` | Pentru browser, Google și GitHub Pages. |

## Anunțuri și echipă (`data/site.json`)

Pe GitHub: deschide `data/site.json` → creionul (Edit) → modifici → **Commit changes**. După 1–2 minute GitHub Pages republică site-ul.

JSON nu acceptă comentarii, așa că explicația e aici. Forma completă:

```json
{
  "announcements": [
    {
      "date": "2026-11-05",
      "title": "Titlul anunțului",
      "text": "Textul anunțului. Poți pune rânduri noi cu \n.",
      "title_en": "Titlul în engleză (opțional)",
      "text_en": "Textul în engleză (opțional)",
      "link": "https://link-opțional-la-discord-sau-magazin"
    }
  ],
  "staff": [
    { "name": "NumeleDinJoc", "rank": "Owner", "color": "#d0141a" },
    { "name": "AltNume", "rank": "Admin" }
  ]
}
```

Reguli:
- `date` e în formatul `AN-LUNĂ-ZI`. Anunțurile se pun singure în ordine, cel mai nou primul; se arată maxim 6.
- `link` e opțional și trebuie să înceapă cu `https://`. Fără link, anunțul e doar text.
- `title_en` / `text_en` sunt opționale; dacă lipsesc, varianta EN arată textul românesc.
- `name` = nickname-ul de Minecraft (2–16 caractere: litere, cifre, `_`). Capul jucătorului vine de pe mc-heads.net.
- `rank` = gradul. Gradele apar în ordinea în care le scrii prima oară în listă (pune Owner primul).
- `color` e opțional (culoarea gradului, format `#rrggbb`).
- Atenție la virgule: între elemente da, după ultimul nu. Dacă JSON-ul e stricat, site-ul merge mai departe, doar fără anunțuri și echipă. Poți verifica pe jsonlint.com.

Cât timp `announcements` e gol (`[]`), secțiunea Anunțuri arată un buton „Urmărește anunțurile pe Discord”. Cât timp `staff` e gol, secțiunea Echipa și linkurile spre ea sunt ascunse.

## IP, versiuni, Discord live (`js/main.js`)

Sus de tot în `js/main.js` e blocul **SETĂRI ADDICTED2**:
- `IP`: adresa serverului. Se schimbă peste tot pe site și la butonul de copiere.
- `VERSIONS`: textul cu versiunile (când serverul e online, se arată versiunea raportată de server).
- `DISCORD_GUILD_ID`: vezi mai jos. Gol = doar butonul de Discord, fără număr.
- `STATUS_API` și `REFRESH_MS`: de unde vin jucătorii online (api.mcsrvstat.us, gratuit) și la cât timp se reîmprospătează (60 s, doar cât tab-ul e deschis în față).

Linkurile (Discord, Magazin, Instagram, TikTok) sunt scrise în `index.html` (și textul EN din `js/main.js`). Caută adresa veche (Ctrl+F) și înlocuiește-o peste tot.

### Numărul de membri online pe Discord (opțional)
1. Pe Discord: **Server Settings → Widget → Enable Server Widget** (pornit).
2. Pe aceeași pagină copiezi **Server ID** (un număr lung).
3. În `js/main.js` pui ID-ul între ghilimele: `DISCORD_GUILD_ID: '123456789012345678',`.

Apare „· N” pe butonul Discord din primul ecran și „N online pe Discord” la Comunitate. Dacă widget-ul e oprit, site-ul arată doar butonul.

## Poze (capturi de ecran)
Acum nu există capturi, toate desenele sunt făcute în cod. Locurile pentru poze sunt marcate în `index.html` cu comentarii „Screenshot slot”:
- primul ecran (hero): o captură largă de la spawn;
- fiecare mod de joc (`.band`): o captură în locul desenului pixelat.

Pune pozele în `img/` ca **WebP** (sub ~120 KB fiecare, 1280–1600 px lățime), cu `width`, `height`, `alt` și `loading="lazy"` (fără `lazy` doar la poza din primul ecran).

## Publicare pe GitHub Pages
1. Repository nou, de ex. `corneluu/addicted2-site`, cu conținutul acestui folder în rădăcină.
2. **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Site-ul apare la `https://corneluu.github.io/addicted2-site/`. Toate căile sunt relative, deci merge la fel și pe domeniul propriu.

## Mutare pe addicted2.ro
1. În `index.html`, schimbă cele **3 rânduri** de sub comentariul „Domeniu” (`canonical`, `og:url`, `og:image`) din `https://corneluu.github.io/addicted2-site/` în `https://addicted2.ro/`. Fă același înlocuire și în blocul JSON-LD de mai jos (Ctrl+F → înlocuiește tot).
2. În `robots.txt` și `sitemap.xml` schimbă adresa la fel.
3. Creează în rădăcină un fișier `CNAME` care conține doar: `addicted2.ro`
   (sau setează domeniul în **Settings → Pages → Custom domain**, care creează fișierul singur).
4. DNS la firma unde e domeniul:
   - 4 înregistrări **A** pentru `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (opțional IPv6) 4 înregistrări **AAAA** pentru `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - 1 înregistrare **CNAME** pentru `www` → `corneluu.github.io`
   - **Nu atinge** înregistrarea pentru `play.addicted2.ro` (aia e serverul de Minecraft).
5. După ce DNS-ul se propagă (minute – câteva ore), bifează **Enforce HTTPS** în Settings → Pages.

## Test local
Orice server static merge, de exemplu din folderul site-ului: `npx http-server -p 8123`, apoi `http://localhost:8123/`. Deschis direct ca fișier (`file://`) pagina se vede, dar anunțurile din `site.json` nu se încarcă (browserul blochează asta).
