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
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);


//FIREBASE LOGIN
const signIn = async (email, password, check_login_from) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        //getToken(idToken);

        //const decodedToken = jwt_decode(idToken);

        //console.log('decodedToken', decodedToken);
        //alert("TRUE")
        check_login_from(true);
        // console.log(idToken)

        //window.location.href = redirect_url + '?token=' + user.uid;

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
const signUp = async (email, password, name) => {
    try {
        // Create user with email and password
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);

        // Update user display name
        await userCredential.user.updateProfile({
            displayName: name
        });

        await addUserToFirestore({
            new_user_email: email,
            new_user_name: name
        });

        // Sign-up successful
        const user = userCredential.user;
        alert("User signed up:", user);
        // You can perform any necessary actions after successful sign-up here
    } catch (error) {
        // Handle sign-up errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign-up error:", errorCode, errorMessage);
    }
}

