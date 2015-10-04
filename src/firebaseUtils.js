import Firebase from 'firebase';

var forge = 'https://chulip.firebaseio.com';
var firebaseRef = new Firebase(forge);
var cachedUser = null;

firebaseRef.onAuth(function(authData) {
  // check if new user?
  if (authData) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    firebaseRef.child("users").child(authData.uid).set({
      id:       authData.uid,
      name:     authData.github.displayName,
      username: authData.github.username,
      email:    authData.github.email,
      pic:      authData.github.profileImageURL
    });
  }
});

var firebaseUtils = {
  ref: firebaseRef,
  cachedUser: {},
  loginWithGitHub: function (callback) {
    this.ref.authWithOAuthPopup('github', function(error, authData) {
      if (error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          return this.ref.authWithOAuthRedirect('github', function (error, authData) {
            if (error) {
              console.log("Login Failed!", error);
              return {error: error};
            } else {
              var userData = {
                id:       authData.uid,
                username: authData.github.username,
                name:     authData.github.displayName,
                email:    authData.github.email,
                pic:      authData.github.profileImageURL
              }
              return callback(userData);
            }
          })
        }
        return {error: error};
      } else {
        console.log("inside")
        console.log("Authenticated successfully with payload: ", authData);
        var userData = {
          id:       authData.uid,
          username: authData.github.username,
          name:     authData.github.displayName,
          email:    authData.github.email,
          pic:      authData.github.profileImageURL
        }
        return callback(userData)
      }
    })
  },
  isLoggedIn: function () {
    return cachedUser && true || firebaseRef.getAuth() || false;
  },
  logout: function () {
    firebaseRef.unauth();
    cachedUser = null;
  }
};

export default firebaseUtils;
