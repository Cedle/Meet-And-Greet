// Einloggen

/* firebase.initializeApp({
    apiKey: 'AIzaSyD61VYZKulRZK6VaGs9cvHLwAOdiYpdpfc',
    authDomain: 'meet-and-greet-cb3de.firebaseapp.com'
}); */

// Pfad SessionLogin: 
// Pfad Login: /#
// Pfad Profil  /Hauptprogramm.html#

// Wenn HTTP-only Cookies Persistence --> NONE
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

//Passwort??
firebase.auth().signInWithEmailAndPassword(profile.email, 'Passwort').then(user => {
    // ID-Token des USers holen
    return user.getIdToken().then(idToken => {
        const csrfToken = getCookie('csrfToken')
//Pfad 
        return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
    });
}).then(() => {
    // Bei Persistence NONE --> reicht Seitenumleitung
    return firebase.auth().signOut();
}).then(() => {
//Pfad?? 
    window.location.assign('/profile');
});


// Create Session Cookies

app.post('/sessionLogin', (req, res) => {
    const idToken = req.body.idToken.toString();
    const csrfToken = req.body.csrfToken.toString();
    // Schutz vor CSRF-Angriffen
    if (csrfToken !== req.cookies.csrfToken) {
        res.status(401).send('UNAUTHORIZED REQUEST!');
        return;
    }
    // Setzen der Ablaufzeit der Session --> aktuell 5 Tage
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    //Session cookie erstellen
    admin.auth().createSessionCookie(idToken, { expiresIn })
        .then((sessionCookie) => {
            // Cookie-Richtlinien festlegen
            const options = { maxAge: expiresIn, httpOnly: true, secure: true };
            res.cookie('session', sessionCookie, options);
            res.end(JSON.stringify({ status: 'success' }));
        }, error => {
            res.status(401).send('UNAUTHORIZED REQUEST!');
        });
});

//bei Vertraulichen Anmeldungen sollte auth_time überprüft werden:
admin.auth().verifyIdToken(idToken)
.then((decodedIdToken) => {
    // Bearweiten, wenn anmeldung innerhalb der letzten 5 Minuten
     if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
        return admin.auth().createSessionCookie(idToken, { expiresIn });
    }
    //Anmeldung länger als 5 minuten her
    res.status(401).send('Recent sign in required!');
});



//Check Session Cookies 

app.post('/profile', (req, res) => {
    const sessionCookie = req.cookies.session || '';
    //Prüfung ob Benutzer bespielsweise gelöscht wurde
    admin.auth().verifySessionCookie(
        sessionCookie, true /** Wiederruf prüfen*/)
        .then((decodedClaims) => {
//Pfad?? --> Hauptprogramm.html#
            serveContentForUser('/profile', req, res, decodedClaims);
        })
        .catch(error => {
            //Nutzer muss sich neu anmelden
//Pfad??
            res.redirect('/login');
        });
});


//für die Überprüfung wird das Admin-SDK mit ProjektID initiallisiert werden
admin.auth().verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
        // Prüft ob Benutzer admin ist
//Pfad?? , Festlegen von ADMINS??
        if (decodedClaims.admin === true) {
            return serveContentForAdmin('/admin', req, res, decodedClaims);
        }
        res.status(401).send('UNAUTHORIZED REQUEST!');
    })
    .catch(error => {
        //Nutzer muss sich neu anmelden
//Pfad??
        res.redirect('/login');
    });


//Ausloggen

app.post('/sessionLogout', (req, res) => {
    res.clearCookie('session');
//Pfad??
    res.redirect('/login');
});

//Pfad??
//bei Wiederruf der Session:
app.post('/sessionLogout', (req, res) => {
    const sessionCookie = req.cookies.session || '';
    res.clearCookie('session');
    admin.auth().verifySessionCookie(sessionCookie)
        .then((decodedClaims) => {
            return admin.auth().revokeRefreshTokens(decodedClaims.sub);
        })
        .then(() => {
            res.redirect('/login');
        })
        .catch((error) => {
            res.redirect('/login');
        });
});
