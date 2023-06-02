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

