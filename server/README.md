# AGH Trips - Dokumentacja

## Instalacja zależnosci

1. **package.json** - Proszę otworzyć plik znajdujący się w katalogu głównym projektu.
2. **install** - Instaluje potrzebne zależności do uruchomienia projektu .
3. **start** - uruchamia jednocześnie serwer oraz klienta.

## Co zostało zrobione:
### I część projektu
- [x] **Zadanie 2 [5 PKT]** - Komponenty do wyświetlania wycieczek
- [x] **Zadanie 3 [1 PKT]** - Usuwanie wycieczki
- [x] **Zadanie 4 [2 PKT]** - Dodawanie wycieczki
- [x] **Zadanie 5 [1 PKT]** - Ocenianie wycieczki
- [x] **Zadanie 6 [1 PKT]** - Filtrowanie listy wycieczek
    - po ocenie [1 PKT]
    - po cenie [1 PKT]
-  [x] **Zadanie 7 [2 PKT]** - Komponent do wyświetlania sumarycznej wartości rezerwacji
- [x] **Zadanie 8 [2 PKT]** - Koszyk
- [x] **Zadanie 9 [2 PKT]** - Historia zakupów
  - Przypomnienie o wycieczce [1 PKT]
- [x] **Zadanie 10 [2 PKT]** - Uporzadkowanie widokow
  - mapa z lokalizacją wycieczki [1 PKT]
-[x] ekstra za estetyczne rozwiazanie [1 PKT]

### II część projektu
- [x] **Zadanie 1 [3 PKT]** - Podgląd szczegółowy wycieczki
- [x] **Zadanie 2 [1 PKT]** - Paginacja
- [x] **Zadanie 3** - Backend
- zdefiniowanie modelu danych [2 PKT]
- routing i endpointy [2 PKT]
- kontrolery [5 PKT]

### III część projektu
- [x] **Zadanie 1 [2 PKT]** - Rejestracja
- [x] **Zadanie 2 [4 PKT]** - uwierzytelnianie po stronie backendu i frontendu
- [x] **Zadanie 3 [1 PKT]** - Zmiana trybu persystencji
  - refreshtoken [2 PKT]
- [x] **Zadanie 4 [1 PKT]** - Role
- [x] **Zadanie 5 [1 PKT]** - Recenzja tylko po zakupie
- [x] **Zadanie 6 [1 PKT]** - Panel admina/managera
- [x] **Zadanie 7 [2 PKT]** - Websockety
- [x] **Zadanie 8 [1 PKT]** - Guardy
- [x] **Zadanie 9 [1 PKT]** - Jedna sesja na uzytkownika
- [x] **Zadanie 10 [1 PKT]** - Zarządzanie rolami
- [x] **Zadanie 11 [1 PKT]** - Zarządzanie użytkownikami
- [x] **Zadanie 12 [2 PKT]** - Korzystanie z bibliotek komponentow
- [x] **Zadanie 13 [2 PKT]** - Jakość kodu


## Sumarycznie: 58 punktów

### Konspekt:


# TripApiService

## Opis
`TripApiService` to serwis Angularowy zapewniający funkcjonalności zarządzania wycieczkami (`Trip`) w aplikacji. Umożliwia wykonywanie operacji CRUD na wycieczkach oraz obsługuje dodatkowe funkcje, takie jak filtrowanie i streamowanie danych wycieczek.

## Funkcje

### `getTrip(id: TripId): Observable<Trip>`
Pobiera szczegóły pojedynczej wycieczki na podstawie jej ID.

### `submitReview(tripId: TripId, review: Partial<Review>): Observable<Trip>`
Wysyła recenzję dla konkretnej wycieczki i zwraca zaktualizowane dane wycieczki.

### `updateTrip(tripId: TripId, trip: TripForm): Observable<ResponseBase>`
Aktualizuje dane istniejącej wycieczki.

### `delete(tripId: TripId): Observable<boolean>`
Usuwa wycieczkę na podstawie podanego ID.

### `findTrips(filters?: FilterForm): Observable<Trip[]>`
Wyszukuje wycieczki zgodnie z podanymi kryteriami filtrowania.

### `getTripsBufferedStream(filters?: FilterForm): Observable<Trip[]>`
Streamuje dane wycieczek z serwera w czasie rzeczywistym.

### `createTrip(trip: TripForm): Observable<ResponseBase>`
Tworzy nową wycieczkę na podstawie danych formularza.

### `deleteTrip(tripId: TripId): Observable<unknown>`
Usuwa wycieczkę na podstawie jej ID.

### `setFilters(filters: FilterForm): void`
Ustawia filtry do przeszukiwania wycieczek.

### `setLoading(loading: boolean): void`
Ustawia stan ładowania danych.

## Gettery

### `trips$`
Zwraca Observable wycieczek.

### `filters$`
Zwraca Observable aktywnych filtrów.

### `loading$`
Zwraca Observable stanu ładowania danych.

## Obsługa Błędów

Metoda `handleError` obsługuje błędy występujące podczas zapytań HTTP.


# CartApiService

## Opis
`CartApiService` to serwis Angularowy do zarządzania koszykiem zakupowym użytkownika w aplikacji. Zapewnia funkcjonalności takie jak pobieranie, dodawanie i usuwanie przedmiotów z koszyka, opróżnianie koszyka oraz finalizowanie zakupu.

## Funkcje

### `getCart(): Observable<Cart>`
Pobiera aktualny stan koszyka użytkownika.

### `emptyCart(): void`
Opróżnia koszyk użytkownika, resetując jego stan do wartości początkowej.

### `addToCart(trip: Trip, quantity: number): Observable<Cart>`
Dodaje wycieczkę do koszyka w określonej ilości.

### `removeItemFromCart(cartItem: CartItem): Observable<Cart>`
Usuwa konkretny przedmiot z koszyka.

### `buy(cart: Cart): Observable<Cart>`
Finalizuje proces zakupu, przetwarzając zawartość koszyka.

### `updateCartItem(cartItem: CartItem): Observable<Cart>`
Aktualizuje konkretny przedmiot w koszyku (np. zmienia ilość).

## Składowe

### `cart$$`
`BehaviorSubject` przechowujący aktualny stan koszyka.

### `cart$`
`Observable` dostępny publicznie, pozwalający na obserwowanie zmian w stanie koszyka.

## Konstruktor

### `constructor(private readonly http: HttpClient, private readonly authService: AuthService)`
Inicjalizuje serwis zależnościami `HttpClient` do wykonywania zapytań HTTP i `AuthService` do zarządzania danymi użytkownika.

## Metody

### Obsługa błędów
Serwis zawiera obsługę błędów dla operacji HTTP, wypisując informacje o błędach na konsolę.

## Użycie

Serwis `CartApiService` może być wykorzystywany w komponentach Angularowych do zarządzania interakcjami związanych z koszykiem zakupowym, ułatwiając zarządzanie stanem koszyka i interakcje z backendem.


# AuthService

## Opis
`AuthService` to serwis Angularowy odpowiedzialny za zarządzanie autentykacją i autoryzacją użytkownika w aplikacji. Zapewnia funkcje takie jak logowanie, wylogowywanie, rejestracja oraz odświeżanie tokenów dostępu.

## Metody

### `loggedIn: Observable<boolean>`
Zwraca `Observable` informujący, czy użytkownik jest obecnie zalogowany.

### `user: Observable<User | null>`
Zwraca `Observable` z aktualnymi danymi użytkownika.

### `isAdmin(): Observable<boolean>`
Sprawdza, czy zalogowany użytkownik posiada rolę administratora.

### `isAdminOrManager(): Observable<boolean>`
Sprawdza, czy zalogowany użytkownik posiada rolę administratora lub menedżera.

### `signInUser(credentials: User): Observable<AuthResponse>`
Loguje użytkownika i zapisuje jego dane w serwisie `StorageService`.

### `logoutUser(): void`
Wylogowuje użytkownika, czyści zapisane tokeny i dane sesji.

### `signUpUser(credentials: User): Observable<AuthResponse>`
Rejestruje nowego użytkownika.

### `refreshToken(): Observable<AuthResponse>`
Odświeża token dostępu użytkownika.

## Konstruktor

### `constructor(private readonly http: HttpClient, private readonly storageService: StorageService)`
Inicjalizuje serwis zależnościami `HttpClient` do wykonywania zapytań HTTP i `StorageService` do zarządzania danymi lokalnymi.

## Użycie

Serwis `AuthService` może być wykorzystywany w komponentach Angularowych do zarządzania procesem logowania, wylogowywania oraz dostępem do danych zalogowanego użytkownika, ułatwiając zarządzanie autentykacją i autoryzacją w aplikacji.


# StorageService

## Opis
`StorageService` to serwis Angularowy zapewniający funkcjonalności zarządzania danymi przechowywanymi w lokalnym magazynie przeglądarki (`localStorage`). Umożliwia zapis, odczyt, aktualizację i usuwanie różnych rodzajów danych, takich jak tokeny dostępu, dane użytkownika oraz inne informacje sesji.

## Główne Funkcje

### `setAccessToken(token: string): void`
Zapisuje token dostępu do `localStorage` i aktualizuje `BehaviorSubject`.

### `getAccessToken(): string | null`
Pobiera token dostępu z `localStorage`.

### `destroyAccessToken(): void`
Usuwa token dostępu z `localStorage` i aktualizuje `BehaviorSubject`.

### `setRefreshToken(token: string): void`
Zapisuje token odświeżenia do `localStorage` i aktualizuje `BehaviorSubject`.

### `getRefreshToken(): string | null`
Pobiera token odświeżenia z `localStorage`.

### `destroyRefreshToken(): void`
Usuwa token odświeżenia z `localStorage` i aktualizuje `BehaviorSubject`.

### `setSessionId(id: string): void`
Zapisuje identyfikator sesji do `localStorage` i aktualizuje `BehaviorSubject`.

### `getSessionId(): string | null`
Pobiera identyfikator sesji z `localStorage`.

### `destroySessionId(): void`
Usuwa identyfikator sesji z `localStorage` i aktualizuje `BehaviorSubject`.

### `setUser(user: User): void`
Zapisuje dane użytkownika do `localStorage` i aktualizuje `BehaviorSubject`.

### `getUser(): User | null`
Pobiera dane użytkownika z `localStorage`.

### `destroyUser(): void`
Usuwa dane użytkownika z `localStorage` i aktualizuje `BehaviorSubject`.

## BehaviorSubjects

### `accessToken$`
`BehaviorSubject` przechowujący aktualny token dostępu.

### `refreshToken$`
`BehaviorSubject` przechowujący aktualny token odświeżenia.

### `sessionId$`
`BehaviorSubject` przechowujący aktualny identyfikator sesji.

### `user$`
`BehaviorSubject` przechowujący aktualne dane użytkownika.

## Użycie

Serwis `StorageService` jest używany do zarządzania kluczowymi danymi sesji użytkownika, takimi jak tokeny dostępu i odświeżenia, dane użytkownika oraz identyfikator sesji. Zapewnia on łatwy dostęp do tych danych w różnych częściach aplikacji, jednocześnie utrzymując ich aktualność poprzez `BehaviorSubject`.


# Dyrektywa RoleAllowDirective

## Opis
`RoleAllowDirective` to dyrektywa Angular służąca do kontrolowania widoczności elementów w interfejsie użytkownika na podstawie ról przypisanych aktualnie zalogowanemu użytkownikowi. Pozwala na łatwe zarządzanie dostępem do różnych części aplikacji w zależności od roli użytkownika.

## Właściwości

- `@Input() aghRoleAllow`: Tablica ciągów znaków, które określają dozwolone role. Element jest wyświetlany tylko, gdy zalogowany użytkownik posiada przynajmniej jedną z określonych ról.

## Implementacja

Dyrektywa używa serwisu `AuthService` do uzyskania informacji o bieżącym użytkowniku i jego rolach. Następnie porównuje te role z dozwolonymi rolami przekazanymi jako parametr wejściowy. Jeśli użytkownik ma odpowiednią rolę, dyrektywa renderuje zawartość w kontenerze DOM. W przeciwnym przypadku zawartość jest usuwana z widoku.


# AuthInterceptor

## Opis
`AuthInterceptor` to implementacja interfejsu `HttpInterceptor` w Angularze, której zadaniem jest dołączanie tokena dostępu i identyfikatora sesji do wychodzących zapytań HTTP. Jest to kluczowe dla zapewnienia autentykacji i zarządzania sesją w komunikacji z serwerem.

## Implementacja

### Konstruktor
- `constructor(private storage: StorageService)`: Inicjalizuje `AuthInterceptor` z zależnością `StorageService`, który jest używany do pobierania aktualnych wartości tokena dostępu i identyfikatora sesji.

### Metoda `intercept`
- `intercept(req: HttpRequest<any>, next: HttpHandler)`: Metoda przechwytująca każde wychodzące zapytanie HTTP. Jeśli w `StorageService` jest dostępny token dostępu, dyrektywa modyfikuje zapytanie, dodając do nagłówków `Authorization` z tokenem oraz `SessionId`.

## Użycie
`AuthInterceptor` jest automatycznie stosowany do wszystkich wychodzących zapytań HTTP w aplikacji, dzięki czemu zarządzanie autentykacją i sesją jest bardziej spójne i mniej podatne na błędy.

## Przykład
Zmodyfikowane zapytanie będzie zawierało nagłówki:
- `Authorization: Bearer <token>`
- `SessionId: <sessionId>`

Dzięki temu serwer może weryfikować tożsamość użytkownika i status jego sesji na podstawie przesłanych danych w nagłówkach.


# HttpExceptionsInterceptor

## Opis
`HttpExceptionsInterceptor` to implementacja interfejsu `HttpInterceptor` w Angularze, służąca do globalnego przechwytywania i obsługi wyjątków HTTP w aplikacji. Jest odpowiedzialna za reagowanie na konkretne kody błędów HTTP i podejmowanie odpowiednich akcji.

## Funkcje

### `intercept(req: HttpRequest<any>, next: HttpHandler)`
Przechwytuje wszystkie wychodzące zapytania HTTP i stosuje logikę obsługi błędów.

### Obsługa błędów
- **429 (Too Many Requests)**: Wylogowuje użytkownika i przekierowuje na stronę główną, pokazując komunikat ostrzegawczy.
- **403 (Forbidden)**: Wylogowuje użytkownika i przekierowuje na stronę z informacją o braku dostępu.

## Konstruktor

### `constructor(private readonly router: Router, private readonly authService: AuthService, private readonly messageService: NzMessageService)`
Inicjalizuje interceptor z zależnościami `Router`, `AuthService` i `NzMessageService`, które są używane do nawigacji, zarządzania sesją użytkownika oraz wyświetlania komunikatów.

## Użycie
`HttpExceptionsInterceptor` jest automatycznie stosowany do wszystkich wychodzących zapytań HTTP, co zapewnia centralne miejsce do obsługi błędów i ujednolicone reakcje na wyjątki w całej aplikacji.

## Przykłady Reakcji
- W przypadku błędu **429**, użytkownik otrzymuje ostrzeżenie i jest wylogowywany, co może wskazywać na próbę przejęcia sesji.
- W przypadku błędu **403**, użytkownik jest przekierowywany na stronę `forbidden`, co informuje o braku uprawnień do zasobu.

Ten interceptor jest kluczowym elementem zapewniania bezpieczeństwa i stabilności działania aplikacji, szczególnie w kontekście obsługi błędów serwera.


# TokenInterceptor

## Opis
`TokenInterceptor` to implementacja interfejsu `HttpInterceptor` w Angularze, służąca do obsługi wyjątków HTTP związanych z uwierzytelnieniem. Interceptor ten reaguje na błędy HTTP o kodzie 401 (Unauthorized), podejmując próbę odświeżenia tokena dostępu.

## Metody

### `intercept(req: HttpRequest<any>, next: HttpHandler)`
Przechwytuje wszystkie wychodzące zapytania HTTP i w przypadku wystąpienia błędu 401 (Unauthorized) inicjuje proces odświeżenia tokena.

### `handleHttpException(request: HttpRequest<any>, next: HttpHandler): Observable<any>`
Gdy wystąpi błąd 401, ta metoda próbuje odświeżyć token dostępu. Jeśli proces odświeżania się nie powiedzie, użytkownik jest wylogowywany, a aplikacja przekierowuje go do strony logowania.

## Konstruktor

### `constructor(private readonly router: Router, private readonly authService: AuthService)`
Inicjalizuje `TokenInterceptor` z zależnościami `Router` i `AuthService`. `Router` służy do nawigacji, a `AuthService` do zarządzania tokenami dostępu i procesem logowania/wylogowania.

## Użycie
`TokenInterceptor` jest automatycznie stosowany do wszystkich wychodzących zapytań HTTP. Dzięki temu, w przypadku wygaśnięcia tokena dostępu, aplikacja automatycznie podejmuje próbę jego odświeżenia, zwiększając płynność i bezpieczeństwo użytkowania aplikacji.

## Przykładowe Zachowanie
W przypadku wykrycia błędu 401, interceptor próbuje odświeżyć token dostępu. Jeżeli próba ta się nie powiedzie, użytkownik jest przekierowywany na stronę logowania, co zapobiega dostępowi do zabezpieczonych zasobów przez nieautoryzowane osoby.


# Funkcje do Generowania Tokenów

## generateJwtToken

### Opis
`generateJwtToken` to funkcja służąca do generowania tokena JWT (JSON Web Token) dla użytkownika. Token ten jest wykorzystywany w procesie uwierzytelniania i autoryzacji w aplikacji.

### Parametry
- `user`: Obiekt użytkownika, którego dane są włączone do payloadu tokena.

### Zwracana wartość
Funkcja zwraca token JWT zawierający informacje o użytkowniku i ma określony czas wygaśnięcia (`JWT_EXPIRES_IN`), który jest pobierany z zmiennych środowiskowych.

## generateRefreshToken

### Opis
`generateRefreshToken` to funkcja tworząca token odświeżenia. Jest on wykorzystywany do odnawiania tokena dostępu JWT, gdy ten wygaśnie, bez konieczności ponownego logowania się użytkownika.

### Parametry
- `user`: Obiekt użytkownika, którego dane są włączone do payloadu tokena.

### Zwracana wartość
Funkcja zwraca token odświeżenia, który również zawiera informacje o użytkowniku i posiada inny czas wygaśnięcia (`REFRESH_EXPIRES_IN`) niż token JWT.

## Użycie
Obie funkcje są kluczowe w procesie uwierzytelniania w aplikacjach korzystających z tokenów JWT. `generateJwtToken` jest używana przy logowaniu i autoryzacji, a `generateRefreshToken` przy odświeżaniu tokenów.


# Middleware singleSession

## Opis
Middleware `singleSession` jest używane do zapewnienia, że każdy użytkownik ma tylko jedną aktywną sesję w aplikacji. Jest to kluczowe dla bezpieczeństwa, ograniczając możliwość równoczesnego korzystania z jednego konta przez wielu użytkowników.

## Działanie

### Sprawdzanie nagłówków
Middleware najpierw sprawdza, czy w nagłówkach żądania HTTP znajdują się `authorization` oraz `sessionid`. Jeśli któregokolwiek z nich brakuje, middleware pozwala na kontynuowanie procesu bez dodatkowej weryfikacji.

### Weryfikacja Sesji
- Pobiera listę aktywnych sesji z aplikacji (`req.app.get('SESSIONS')`).
- Jeśli nie ma żadnych aktywnych sesji, zwraca błąd 401 (Unauthorized).
- Weryfikuje token JWT zawarty w nagłówku `authorization` przy użyciu sekretnego klucza JWT (`JWT_SECRET`).
- Sprawdza, czy ID sesji zapisane w tokenie JWT zgadza się z ID sesji przekazanym w nagłówku `sessionid`.
- Jeśli sesje się nie zgadzają, zwraca błąd 429 (Too Many Requests) wskazujący na aktywną inną sesję dla tego użytkownika.

## Zastosowanie
Middleware `singleSession` jest szczególnie przydatny w aplikacjach, gdzie wymagane jest, aby użytkownik był zalogowany tylko na jednym urządzeniu lub sesji naraz, co zwiększa bezpieczeństwo konta.

## Przykładowe Użycie
Middleware może być dołączany do ścieżek w aplikacji Express.js, gdzie wymagana jest kontrola jednoczesnych sesji użytkownika, na przykład:

```javascript
app.use('/api/protected-route', singleSession, protectedRouteHandler);
```

# Middleware do Weryfikacji i Autoryzacji

## validateRefreshToken

### Opis
Middleware `validateRefreshToken` służy do weryfikacji tokenów odświeżenia. Jest używany do odnawiania tokenów dostępu JWT.

### Działanie
- Sprawdza, czy w ciele żądania (`req.body`) znajduje się `refreshToken`.
- Jeśli token nie istnieje, zwraca błąd 401 (Unauthorized).
- Weryfikuje token odświeżenia przy użyciu sekretnego klucza (`REFRESH_SECRET`).
- W przypadku błędu weryfikacji zwraca błąd 400 z odpowiednią wiadomością.

## authenticate

### Opis
Middleware `authenticate` jest odpowiedzialny za weryfikację tokena JWT w żądaniach.

### Działanie
- Pobiera token z nagłówka `authorization`.
- Jeśli token nie istnieje, zwraca błąd 401 (Unauthorized).
- Weryfikuje token JWT przy użyciu klucza JWT (`JWT_SECRET`).
- W przypadku błędu weryfikacji zwraca błąd 401 z odpowiednią wiadomością.

## isAdmin

### Opis
Middleware `isAdmin` sprawdza, czy zalogowany użytkownik posiada rolę administratora.

### Działanie
- Middleware używa `authenticate` do weryfikacji użytkownika.
- Sprawdza, czy w obiekcie `user` w żądaniu (`req.user`) znajduje się rola `ADMIN`.
- Jeśli użytkownik nie jest administratorem, zwraca błąd 403 (Forbidden) z komunikatem o braku uprawnień.

## Użycie
Te middleware są używane do zarządzania dostępem do chronionych zasobów w aplikacji, zapewniając odpowiednią weryfikację i autoryzację użytkowników.


# Model Koszyka (Cart) w MongoDB

## Schematy

### CartItemSchema
Definiuje schemat pojedynczego przedmiotu w koszyku, zawierający:
- `trip`: Obiekt wycieczki (`TripSchema`), wymagany.
- `quantity`: Liczba przedmiotów (typ liczbowy), wymagana.
- `value`: Wartość przedmiotu, wymagana, domyślnie 0.

### CartSchema
Definiuje główny schemat koszyka, zawierający:
- `items`: Tablica przedmiotów (`CartItemSchema`), domyślnie pusta.
- `total`: Całkowita wartość koszyka, wymagana, domyślnie 0.
- `userId`: Identyfikator użytkownika, domyślnie null.

## Metody

### findOneOrCreate
Metoda statyczna `findOneOrCreate` w `CartSchema` służy do wyszukiwania koszyka na podstawie określonego warunku lub jego utworzenia, jeśli nie istnieje.

## Funkcje

### cartFindById
Wyszukuje koszyk na podstawie jego ID.

### cartFindByUserId
Wyszukuje koszyk na podstawie ID użytkownika.

### cartFindByUserIdOrCreate
Wyszukuje koszyk na podstawie ID użytkownika lub tworzy nowy, jeśli taki nie istnieje.

### cartCreate
Tworzy nowy koszyk.

### cartUpdate
Aktualizuje koszyk na podstawie jego ID.

### cartDestroy
Usuwa koszyk na podstawie jego ID.

### clearCartItems
Usuwa określone przedmioty z koszyka użytkownika. Wykorzystuje `$pull` w MongoDB do usunięcia przedmiotów na podstawie ich `_id`.

## Użycie
Te schematy i funkcje są używane do zarządzania koszykiem użytkownika w aplikacji, umożliwiając dodawanie, aktualizowanie, usuwanie i czyszczenie przedmiotów oraz zarządzanie całkowitą wartością koszyka.


# Model Wycieczki (Trip) w MongoDB

## Schematy

### TripSchema
Definiuje główny schemat wycieczki, zawierający:
- `name`: Nazwa wycieczki, wymagana.
- `country`: Kraj, wymagany.
- `address`: Adres, opcjonalny.
- `description`: Opis, opcjonalny.
- `capacity`: Pojemność (liczba miejsc), wymagana, minimalna wartość 1.
- `available`: Dostępna liczba miejsc, wymagana, minimalna wartość 0.
- `startAt`: Data rozpoczęcia, wymagana.
- `endAt`: Data zakończenia, wymagana.
- `price`: Cena, wymagana.
- `imageUrl`: Link do obrazu, opcjonalny.
- `gallery`: Galeria zdjęć, tablica stringów, opcjonalna.
- `rating`: Ocena, domyślnie 0.
- `feedback`: Opinie, tablica `FeedbackSchema`.

### FeedbackSchema
Definiuje schemat opinii o wycieczce, zawierający:
- `nick`: Nick użytkownika, opcjonalny.
- `rating`: Ocena, opcjonalna.
- `title`: Tytuł opinii, opcjonalny.
- `comment`: Komentarz, opcjonalny.
- `orderDate`: Data zamówienia, string.
- `userId`: Identyfikator użytkownika.

## Funkcje

### tripFind
Wyszukuje wycieczki na podstawie podanych filtrów (`name`, `country`, `priceRange`, `ratingRange`).

### updateTripFeedback
Aktualizuje opinie o wycieczce, oblicza nową średnią ocenę i zapisuje zmiany w bazie danych.

### tripFindById
Wyszukuje wycieczkę na podstawie jej ID.

### tripCreate
Tworzy nową wycieczkę w bazie danych.

### tripUpdate
Aktualizuje dane wycieczki na podstawie jej ID.

### tripDestroy
Usuwa wycieczkę na podstawie jej ID.

## Użycie
Model `Trip` i powiązane z nim funkcje są używane do zarządzania danymi wycieczek w aplikacji, włączając w to tworzenie, aktualizację, wyszukiwanie i usuwanie wycieczek, a także obsługę opinii i ocen użytkowników.


# Funkcje Obsługi Użytkowników

## registerUser

### Opis
Rejestruje nowego użytkownika w systemie.

### Parametry
- `request`: Żądanie HTTP zawierające dane użytkownika (email, hasło).
- `response`: Odpowiedź HTTP.

### Działanie
- Tworzy nowego użytkownika za pomocą funkcji `createUser`.
- Zwraca status 201 z obiektem zawierającym token JWT, token odświeżenia i inne dane użytkownika.
- W przypadku błędu (np. istniejący użytkownik) zwraca status 400 z odpowiednim komunikatem.

## loginUser

### Opis
Loguje użytkownika do systemu.

### Parametry
- `request`, `response`: Jak w `registerUser`.

### Działanie
- Sprawdza, czy użytkownik istnieje i czy hasło jest poprawne.
- Zwraca status 200 z obiektem zawierającym token JWT, token odświeżenia i inne dane użytkownika.
- W przypadku błędu zwraca status 400 z odpowiednim komunikatem.

## logoutUser

### Opis
Wylogowuje użytkownika z systemu.

### Parametry
- `request`, `response`: Jak w `registerUser`.

### Działanie
- Zwraca status 200 z komunikatem o wylogowaniu użytkownika.

## refreshToken

### Opis
Odświeża token JWT użytkownika.

### Parametry
- `request`, `response`: Jak w `registerUser`.

### Działanie
- Odświeża token JWT i zwraca nowy w odpowiedzi HTTP.

## createAuthResponsePayload

### Opis
Tworzy obiekt odpowiedzi autentykacji.

### Parametry
- `user`: Obiekt użytkownika.
- `sessions`: Sesje aplikacji.
- `token`: Token odświeżenia (opcjonalnie).

### Działanie
- Generuje nowy token JWT i token odświeżenia (jeśli nie podano).
- Zwraca obiekt zawierający tokeny, sesję i podstawowe dane użytkownika.

## Użycie
Funkcje te są kluczowe dla obsługi procesów logowania, rejestracji, wylogowania i odświeżania tokenów w aplikacji, zapewniając zarządzanie sesją i autentykację użytkowników.


# Funkcje Obsługi Koszyka i Zamówień

## getCart
- **Opis**: Zwraca koszyk na podstawie ID.
- **Parametry**: `request` (zawiera ID koszyka), `response`.
- **Działanie**: Wyszukuje i zwraca koszyk na podstawie ID.

## getCartByUserId
- **Opis**: Zwraca koszyk użytkownika na podstawie jego ID.
- **Parametry**: `request`, `response`.
- **Działanie**: Wyszukuje koszyk na podstawie ID użytkownika, tworzy nowy jeśli nie istnieje.

## updateItemInCart
- **Opis**: Aktualizuje przedmioty w koszyku użytkownika.
- **Parametry**: `request`, `response`.
- **Działanie**: Aktualizuje dane przedmiotu w koszyku i zwraca zaktualizowany koszyk.

## deleteCart
- **Opis**: Usuwa koszyk na podstawie ID.
- **Parametry**: `request`, `response`.
- **Działanie**: Usuwa koszyk i zwraca odpowiedź HTTP.

## addToCart
- **Opis**: Dodaje przedmiot do koszyka użytkownika.
- **Parametry**: `request`, `response`.
- **Działanie**: Dodaje nowy przedmiot do koszyka lub aktualizuje istniejący.

## removeFromCart
- **Opis**: Usuwa przedmiot z koszyka użytkownika.
- **Parametry**: `request`, `response`.
- **Działanie**: Usuwa wybrany przedmiot z koszyka i zwraca zaktualizowany koszyk.

## createCart
- **Opis**: Tworzy nowy koszyk.
- **Parametry**: `trip`, `quantity`, `userId`.
- **Działanie**: Tworzy nowy koszyk z określonymi przedmiotami.

## finalizeOrder
- **Opis**: Finalizuje zamówienie na podstawie wybranych przedmiotów w koszyku.
- **Parametry**: `request`, `response`.
- **Działanie**: Tworzy nowe zamówienie na podstawie wybranych przedmiotów, aktualizuje dostępność wycieczek i zwraca zaktualizowany koszyk.

## Pomocnicze Funkcje
- `addOrUpdateItems`, `updateCartItem`, `createNewCart`, `createCartItem`, `calculateValue`, `calculateTotal`: Funkcje pomocnicze do zarządzania przedmiotami w koszyku i obliczania wartości.

## Użycie
Funkcje te są kluczowe do zarządzania koszykiem i procesem zamawiania w aplikacji, umożliwiając dodawanie, aktualizowanie, usuwanie przedmiotów oraz finalizację zamówień.


# Kontrolery Zarządzania Wycieczkami

## findTrips
- **Opis**: Wyszukuje wycieczki na podstawie podanych kryteriów.
- **Parametry**: `request` (zawiera kryteria wyszukiwania), `response`.
- **Działanie**: Wywołuje funkcję `tripFind` i zwraca wyniki.

## findTripById
- **Opis**: Wyszukuje wycieczkę na podstawie jej ID.
- **Parametry**: `request` (zawiera ID wycieczki), `response`.
- **Działanie**: Wywołuje funkcję `tripFindById` i zwraca wynik.

## createTrip
- **Opis**: Tworzy nową wycieczkę.
- **Parametry**: `request` (zawiera dane wycieczki), `response`.
- **Działanie**: Wywołuje funkcję `tripCreate` i zwraca utworzoną wycieczkę.

## updateTrip
- **Opis**: Aktualizuje istniejącą wycieczkę.
- **Parametry**: `request` (zawiera ID i dane do aktualizacji), `response`.
- **Działanie**: Wywołuje funkcję `tripUpdate` i zwraca zaktualizowaną wycieczkę.

## deleteTrip
- **Opis**: Usuwa wycieczkę na podstawie jej ID.
- **Parametry**: `request` (zawiera ID wycieczki), `response`.
- **Działanie**: Wywołuje funkcję `tripDestroy` i zwraca odpowiedź HTTP.

## addFeedbackByTripId
- **Opis**: Dodaje recenzję do wycieczki.
- **Parametry**: `request` (zawiera ID wycieczki, dane użytkownika, recenzję), `response`.
- **Działanie**: Dodaje recenzję do wycieczki i zwraca zaktualizowane dane.

## removeFeedback
- **Opis**: Usuwa recenzję z wycieczki.
- **Parametry**: `request` (zawiera ID wycieczki, ID recenzji), `response`.
- **Działanie**: Usuwa recenzję z wycieczki i zwraca zaktualizowane dane.

## Użycie
Kontrolery te są używane do obsługi różnych operacji związanych z wycieczkami, takich jak ich wyszukiwanie, tworzenie, aktualizacja, usuwanie oraz zarządzanie recenzjami.


# Zarządzanie Połączeniami Socketowymi

## socketConnectionRequest
- **Opis**: Inicjalizuje połączenie socketowe dla strumieniowania danych (Server-Sent Events).
- **Parametry**: `request` (zawiera zapytanie), `response` (używane do ustawienia nagłówków i wysyłania danych).
- **Działanie**:
  - Ustawia odpowiednie nagłówki HTTP dla SSE.
  - Wywołuje funkcję `tripFind` z zapytaniem i wysyła wyniki jako eventy SSE.
  - Nasłuchuje zamknięcia połączenia przez klienta i kończy odpowiedź.

## publishTrips
- **Opis**: Publikuje aktualne dane wycieczek do wszystkich podłączonych klientów.
- **Parametry**: Brak.
- **Działanie**:
  - Wywołuje funkcję `tripFind` z aktualnym zapytaniem.
  - Wysyła wyniki jako eventy SSE do wszystkich podłączonych klientów.

## Użycie
Te funkcje są wykorzystywane do utrzymania dynamicznego połączenia z klientami, umożliwiając bieżące aktualizacje danych wycieczek bez konieczności ręcznego odświeżania przez użytkownika. Są to kluczowe elementy dla funkcjonalności opartych na real-time updates w aplikacji.



