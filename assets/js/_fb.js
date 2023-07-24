    //SEND TO SENDPULSE
    function sendRegForm(sp_data) {
        const accessData = {
            "grant_type": "client_credentials",
            "client_id": sp_id,
            "client_secret": sp_secret
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accessData)
        };

        fetch('https://api.sendpulse.com/oauth/access_token', requestOptions)
            .then(response => response.json())
            .then(data => {
                fetch(sp_apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.access_token}`,
                    },
                    body: JSON.stringify(sp_data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        //console.log(data);
                    })
                    .catch((error) => console.error(error));
            })
            .catch(error => console.error(error));
    }

//JWT ENCODE
function getToken(data) {
    let header = {
        "alg": "HS256",
        "typ": "JWT"
    };

    let secret = secretKey;

    function base64url(source) {
        // Encode in classical base64
        encodedSource = CryptoJS.enc.Base64.stringify(source);

        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');

        return encodedSource;
    }

    let stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    let encodedHeader = base64url(stringifiedHeader);

    let stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    let encodedData = base64url(stringifiedData);

    let signature = encodedHeader + "." + encodedData;
    signature = CryptoJS.HmacSHA256(signature, secret);
    signature = base64url(signature);
    //alert(signature);

    return signature;
}

//FIREBASE
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const appCheck = firebase.appCheck();
    
try {
      appCheck.activate({
        provider: new firebase.appCheck.ReCaptchaV3Provider(captcha),
        isTokenAutoRefreshEnabled: true,
      });
    } catch (error) {
      console.error("Error initializing Firebase App Check:", error);
}


const auth = firebase.auth();
const firestore = firebase.firestore();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);


//FIREBASE LOGIN
const signIn = async (email, password, check_login_from) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        //const token = await user.getIdToken();

        const get_aud = user.aud;
        const get_uid = user.user_id;
        const get_email = email;

        let dataFB = {
            "aud": get_aud,
            "uid": get_uid,
            "email": get_email
        };

        const newToken = getToken(dataFB);
        check_login_from(true, 'login', newToken);

    }
    catch (error) {
        // Handle sign-in errors
        //alert("ERROR")
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign-in error:", errorCode, errorMessage);
        check_login_from(false);
    };
};

//FIREBASE SIGN UP
const signUp = async (email, password, name, check_login_from) => {
    try {
        // Create user with email and password
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);

        // Update user display name
        await userCredential.user.updateProfile({
            displayName: name
        });

        const userData = {
            new_user_email: email,
            new_user_name: name,
            referrer: 'Epicurus_LP'
        };
        addUserToFirestore(userData);

        // Sign-up successful
        const user = userCredential.user;
        //const token = await user.getIdToken();
        const get_aud = user.aud;
        const get_uid = user.user_id;
        const get_email = email;

        let dataFB = {
            "aud": get_aud,
            "uid": get_uid,
            "email": get_email
        };
        const newToken = getToken(dataFB);
        check_login_from(true, 'reg', newToken);

        const emailData = {
            emails: [{
                email: get_email,

                variables: {
                    name: name,
                    token: newToken,
                    referrer: 'Epicurus_LP'
                },
            }],
        };
        sendRegForm(emailData);
        

    } catch (error) {
        // Handle sign-up errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign-up error:", errorCode, errorMessage);
        check_login_from(false, 'reg');
    }
}

const addUserToFirestore = async (userData) => {
    try {
        // Add user data to Firestore
        await firestore.collection('NewUser').add(userData);
        console.log('User added to Firestore');
    } catch (error) {
        console.error('Error adding user to Firestore:', error);
    }
};

