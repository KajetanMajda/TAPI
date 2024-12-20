# Twoje zadania

---

Siema, zapisałem Ci listę co pamiętam, że szefu kazał zrobić zanim pojechał na urlop kolejny.
Jak czegoś nie zrozumesz to pisz (najlepiej do kogoś innego)

1. Szef prosił, aby utworzyć typ Pracownika, a jak dobrze wiemy u nas pracownik składa się z:
   - Id (które jest koniecznie wymagane, ale szef przypisuje je sam dopiero jak pokręci nosem)
   - Imię
   - Nazwisko
   - Stanowisko (szef coś mówił, że u nas są niby tylko cztery możliwe: "szef", "anetka","pani basia", "podbutnik")
   - Pseudonim (bo szefu twierdzi, że to ważne, ale nie mówi dlaczego)
   - Opis
   - Pensja (szefu kazał, żeby się składała z liczby i waluty, ale nie dość, że uparł się, że to nie może być obiekt ani nowy typ ani interfejs, to jeszcze mu się ubzdurało, że waluta ma być enumem, a jedyne waaluty w których "mamy się ciszyć, że cokolwiek dostajemy" to `Złoty_Polski_Peelen` `Erło_jedne_niemieckie` `Dolar_fajny_taki_amerykanski`)
   - Zwolnij (to ma być metoda, która może przyjąć dowolną liczbę powodów zwolnienia w razie gdyby się wkurzył, i zakłada, że będzie się wkurzał często, więc chce poza stringiem jako powodem, mieć opcję podać też liczbę, a już on sobie przypisze jaka liczba oznacza jaki powód, no i móc też inne typy sobie wymyślać w przyszłości)
2. Pani Basia chce swój typ, ubzdurała sobie, że musi mieć wpisane
   - graNaSkrzypcach (bo się niby szkoli i twierdzi, że gra już "pięknie")
   - bezNiejTenZakładUpadnie (bo... w sumie to ma rację)
   ale szefu nie chce dać jej całego nowego typu, powiedział, ze zezwala tylko typ z tymi dwoma polami
3. Szefu mówił, że typ pracownika ma być jeden i koniec, on nie pozwala, na żodyn inny.
4. Szefu twierdzi też, że piesek to pracownik, ale jakoś mu to z typami nie przeszkadza, i pies ma mieć typ (i weź to ogarnij)
5. Jak szefu mówi, że coś zrobi to mówi! i jedyne priorytety jakie wyznaje to:
   - "brak"
   - "na kiedyś"
   - "jak się upomną"
6. Jak to wszystko skończysz, to dotypuj jeszcze funkcję do tego generowania raportów, ma być generyczna
7. A jak już przy raportach jesteś, to tam trzeba też dodać typy:
   - Raport, jako główny typ, ma tylko podawać: `efektywność` liczoną cyferkami, i szefa `priorytet` (te co wcześniej masz napisane)
   - RaportPracownika, ten ma mówić o `obniżonejEfektywności` (była, czy nie była) no i `spadekPensji` o ile obciąć kasę, bo szefu nie zakłada innej opcji
   - RaportPracowników, po prostu lista raportów pracowników, taki obiekt gdzie `id -> raportPracownika`
   - RaportPieseczka, on ma bzika na punkcie tego ~~kundla~~ pieseczka, ma mieć `szczekanie`,`isPies` oraz `aKtoToJestTakimSłodkimPieseczkiem` i wszystkie mają być tylko prawdziwe
8. Szefu mówił też, że cytuję "raport nie dziecko, nie dziedziczy"
9. Ta funkcja do zwalniania pracowników to się jednak przyda..., ma wypisać numer kiedy jest numer powodu, albo stringa jak jest podany, a jak jest żadne z tych to ma napisać "NIE UDAŁO SIĘ ZWOLNIĆ, ZOSTAJĘ W TYM GRAJDOŁKU!"
10. A raporty przypisane do zmiennych, to mają mieć podany typ jak coś

Dobrej zabawy iks de